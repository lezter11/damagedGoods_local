import React, { useRef, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortalScene } from '../webgl/scenes/PortalScene';

// Register ScrollTrigger if not already done globally
gsap.registerPlugin(ScrollTrigger);

interface PodiumHeroProps {
  onComplete: () => void;
}

export function PodiumHero({ onComplete }: PodiumHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  
  // Use a mutable ref for scroll progress to avoid triggering React re-renders on every scroll tick.
  const scrollProgressRef = useRef<number>(0);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the master timeline for the portal experience
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000", // 6000px of scrolling for the vast journey
        pin: true,
        scrub: 0.1, // very slight scrub smoothing
        onUpdate: (self) => {
          const progress = self.progress;
          scrollProgressRef.current = progress;
          
          // Phase 2: Attraction (10% to 30%) - Fade out the intro text
          if (textRef.current) {
            if (progress >= 0.1 && progress <= 0.3) {
              const textOpacity = 1.0 - ((progress - 0.1) / 0.2);
              textRef.current.style.opacity = Math.max(0, textOpacity).toString();
            } else if (progress > 0.3) {
              textRef.current.style.opacity = '0';
            } else {
              textRef.current.style.opacity = '1';
            }
          }

          // Phase 6: Arrival (85% to 90%)
          if (progress > 0.85) {
            // Fade out the WebGL canvas seamlessly right as the last images fly past
            if (canvasRef.current) {
              const canvasOpacity = 1.0 - ((progress - 0.85) / 0.05);
              canvasRef.current.style.opacity = Math.max(0, canvasOpacity).toString();
            }
          } else {
            if (canvasRef.current) {
              canvasRef.current.style.opacity = '1';
            }
          }

          // Trigger handoff the exact moment the last image hits the camera
          if (progress >= 0.90) {
            onComplete();
          }
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [onComplete]);

  return (
    <div>
      <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
        <div ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none transition-opacity will-change-opacity">
          <PortalScene scrollProgressRef={scrollProgressRef} />
        </div>

      {/* Floating Header specifically for the Landing State (Phase 1) */}
      <div ref={textRef} className="absolute top-0 left-0 w-full p-8 z-20 pointer-events-none flex justify-between items-start transition-opacity will-change-opacity">
        <div className="text-black font-bold tracking-tighter text-2xl mix-blend-difference" style={{ color: 'white' }}>
          DAMAGED GOODS
        </div>
        </div>
      </div>
    </div>
  );
}
