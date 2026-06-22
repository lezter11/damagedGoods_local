import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MediaCard } from './MediaCard';
import { useTexture } from '@react-three/drei';

// Import local images from the imports directory
import img1 from "../../../imports/img1.jpg";
import img2 from "../../../imports/img2.jpg";
import img3 from "../../../imports/img3.jpg";
import img4 from "../../../imports/img4.jpg";

// Preload the textures immediately so they don't block the main thread and cause the blob to stutter when it mounts
useTexture.preload(img1);
useTexture.preload(img2);
useTexture.preload(img3);
useTexture.preload(img4);

interface MediaUniverseProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export function MediaUniverse({ scrollProgressRef }: MediaUniverseProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Arrange exactly 4 images in a tight, overlapping collage mimicking Podium
  const layers = useMemo(() => {
    return [
      // Far Left image (Dark/texture, lower)
      { url: img1, position: [-2.25, -0.25, -3] as [number, number, number], scale: 1.1, parallax: 0.4 },
      // Mid Left image (Vertical, slightly higher)
      { url: img2, position: [-0.75, 0.25, -2] as [number, number, number], scale: 1.0, parallax: 0.8 },
      // Mid Right image (Centerpiece, lower)
      { url: img3, position: [0.75, -0.1, -1.5] as [number, number, number], scale: 1.25, parallax: 1.0 },
      // Far Right image (Widescreen, lower)
      { url: img4, position: [2.25, -0.3, -2.5] as [number, number, number], scale: 1.05, parallax: 0.6 },
    ];
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // The travel begins shortly after Portal Entry (10%) and spans almost the entire scroll (95%)
    const progress = scrollProgressRef.current;
    let travelProgress = 0;
    if (progress > 0.1) {
      travelProgress = Math.min((progress - 0.1) / 0.85, 1.0); // 0.0 to 1.0 over 10%-95%
    }
    
    // We want to traverse just enough to fly through the collage (Z=5 is camera, furthest card is Z=-3)
    // A distance of 8.5 means the furthest card (Z=-3 + 8.5 = Z=5.5) just barely passes behind the camera at the very end of the scroll.
    const travelDistance = travelProgress * 8.5;
    
    // Very subtle corkscrew rotation so it feels organic but doesn't spin wildly
    const roll = travelProgress * Math.PI * 0.03;
    
    // Apply travel
    groupRef.current.position.z = travelDistance;
    groupRef.current.rotation.z = roll;
  });

  return (
    <group ref={groupRef}>
      {layers.map((card, idx) => (
        <MediaCard 
          key={idx}
          url={card.url}
          position={card.position}
          scale={card.scale}
          parallaxFactor={card.parallax}
        />
      ))}
    </group>
  );
}
