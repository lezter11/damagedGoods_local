import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles
  const sphere = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = Math.cbrt(Math.random()) * 15;
    
    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff0001"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

export function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-difference">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
