import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereParticlesProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export function AtmosphereParticles({ scrollProgressRef }: AtmosphereParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles
  const particleCount = 3000;
  
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const scl = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread across a wide volume matching the MediaUniverse bounds
      pos[i * 3 + 0] = (Math.random() - 0.5) * 50; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50; // Y
      pos[i * 3 + 2] = -Math.random() * 100;       // Z (push all the way to Deep Space -100)
      
      // Randomize scales to simulate depth/size differences
      scl[i] = Math.random() * 2;
    }
    
    return [pos, scl];
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow drifting rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.z = state.clock.elapsedTime * 0.01;

    // Map scroll progress to travel exactly like MediaUniverse
    const progress = scrollProgressRef.current;
    let travelProgress = 0;
    if (progress > 0.3) {
      travelProgress = Math.min((progress - 0.3) / 0.6, 1.0);
    }
    const travelDistance = travelProgress * 100;

    pointsRef.current.position.z = travelDistance;
    
    // We add a subtle rotation around Z to match the universe corkscrew
    pointsRef.current.rotation.z = travelProgress * Math.PI * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent={true}
        opacity={0.3}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
