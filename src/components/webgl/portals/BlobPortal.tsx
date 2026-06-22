import React, { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { PortalShaderMaterial } from '../../../shaders/materials/PortalMaterial';

extend({ PortalShaderMaterial });

interface BlobPortalProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export function BlobPortal({ scrollProgressRef }: BlobPortalProps) {
  const materialRef = useRef<any>(null);
  const { size, pointer } = useThree();

  // Smoothing vector for mouse interpolation
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // 1. Time Update
    materialRef.current.uTime = state.clock.elapsedTime;

    // 2. Resolution Update
    if (materialRef.current.uResolution.x !== size.width || materialRef.current.uResolution.y !== size.height) {
        materialRef.current.uResolution.set(size.width, size.height);
    }

    // 3. Smooth Mouse Interactivity
    // pointer is normalized between -1 and 1
    targetMouse.current.set(pointer.x, pointer.y);
    currentMouse.current.lerp(targetMouse.current, 5.0 * delta); // Smooth dampening
    materialRef.current.uMouse.copy(currentMouse.current);

    // 4. Zoom & Opacity driven by Scroll Progress
    const progress = scrollProgressRef.current;
    let zoom = 1.0;
    let opacity = 1.0;

    // Phase 3: Portal Entry (5% to 30%)
    if (progress > 0.05) {
      // Exponential scaling as we progress through the scroll
      // We start zooming almost immediately at 5%, and it becomes massive by 30%
      const p = Math.min((progress - 0.05) / 0.25, 1.0); // 0 to 1 over 5%-30%
      zoom = Math.pow(1.0 - p, 4.0); // 1.0 -> 0.0001
    }

    // Phase 4: Media Universe (30% to 50%)
    if (progress > 0.3) {
      // Fade out the portal mask entirely after entry
      opacity = 1.0 - Math.min((progress - 0.3) / 0.2, 1.0); // 1.0 -> 0.0
    }

    // Protect against absolute 0 scaling which ruins UV math
    materialRef.current.uZoom = Math.max(zoom, 0.0001);
    materialRef.current.uOpacity = Math.max(opacity, 0.0);
  });

  return (
    <mesh position={[0, 0, 0]} renderOrder={999} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore - R3F doesn't inherently know about our custom material types */}
      <portalShaderMaterial 
        ref={materialRef} 
        transparent={true} 
        depthWrite={false} 
        depthTest={false} 
      />
    </mesh>
  );
}
