import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BlobPortal } from '../portals/BlobPortal';
import { MediaUniverse } from '../environment/MediaUniverse';
import { AtmosphereParticles } from '../environment/AtmosphereParticles';
import { CameraRig } from '../cameras/CameraRig';
import * as THREE from 'three';

interface PortalSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export function PortalScene({ scrollProgressRef }: PortalSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 150 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#050505']} />
      <fogExp2 attach="fog" args={['#050505', 0.015]} />
      <ambientLight intensity={1} />
      
      <CameraRig />
      
      <Suspense fallback={null}>
        <MediaUniverse scrollProgressRef={scrollProgressRef} />
        <AtmosphereParticles scrollProgressRef={scrollProgressRef} />
      </Suspense>
      
      <BlobPortal scrollProgressRef={scrollProgressRef} />

    </Canvas>
  );
}
