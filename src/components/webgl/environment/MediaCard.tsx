import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface MediaCardProps {
  url: string;
  position: [number, number, number];
  scale: number;
  parallaxFactor: number;
}

export function MediaCard({ url, position, scale, parallaxFactor }: MediaCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(url);
  const { pointer } = useThree();
  
  // Calculate aspect ratio
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Smooth mouse parallax
    const targetX = position[0] + pointer.x * parallaxFactor;
    const targetY = position[1] + pointer.y * parallaxFactor;
    
    // Lerp towards the target
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    
    // Very subtle idle rotation
    meshRef.current.rotation.y = (pointer.x * parallaxFactor * 0.1);
    meshRef.current.rotation.x = (-pointer.y * parallaxFactor * 0.1);
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale * aspect, scale, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
