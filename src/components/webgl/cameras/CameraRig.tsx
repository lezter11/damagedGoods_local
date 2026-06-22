import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig() {
  const { pointer } = useThree();

  useFrame((state, delta) => {
    // 1. Mouse Drift (Parallax)
    const targetRotX = (pointer.y * Math.PI) * 0.05;
    const targetRotY = (pointer.x * Math.PI) * -0.05;

    // 2. Idle Breathing
    const time = state.clock.elapsedTime;
    const idleRotX = Math.sin(time * 0.3) * 0.01;
    const idleRotY = Math.cos(time * 0.2) * 0.01;

    // Apply smooth damping towards the target rotation (Mouse + Idle)
    state.camera.rotation.x = THREE.MathUtils.damp(
      state.camera.rotation.x, 
      targetRotX + idleRotX, 
      2, 
      delta
    );
    
    state.camera.rotation.y = THREE.MathUtils.damp(
      state.camera.rotation.y, 
      targetRotY + idleRotY, 
      2, 
      delta
    );

    // Subtle position shift to act like a head moving side to side
    const targetPosX = pointer.x * -0.5;
    const targetPosY = pointer.y * -0.5;
    // Base camera Z is 5
    const targetPosZ = 5.0;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetPosX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetPosY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetPosZ, 2, delta);
  });

  return null; // Logic-only component
}
