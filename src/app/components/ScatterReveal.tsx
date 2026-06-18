"use client";

import React, { useEffect } from "react";
import { motion, MotionValue, useTransform, useAnimation } from "motion/react";

// YOUR PRODUCT IMAGES
import img1 from "../../imports/scatter/pimp_priest_product_image.png";
import img2 from "../../imports/scatter/Lips_holy_product_image.png";
import img3 from "../../imports/scatter/Adored_discareded_product_image.png";
import img4 from "../../imports/scatter/actively_product_image.png";
import img5 from "../../imports/scatter/Sin_looks_better_product_image.png";

interface ScatterRevealProps {
  isTriggered: boolean;
  onAnimationComplete?: () => void;
}

export function ScatterReveal({ isTriggered, onAnimationComplete }: ScatterRevealProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isTriggered) {
      const runSequence = async () => {
        // Wait just a tiny bit for the jacket split to feel complete
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // Start the pop-up sequence
        await controls.start("stacked");

        // Hold for a moment to let the user see the full stack
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Push everything back into the void
        await controls.start("pushedBack");
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      };
      runSequence();
    }
  }, [isTriggered, controls, onAnimationComplete]);

  const products = [
    { id: 1, image: img1, rotate: -15, delay: 0,    startX: "-5vw", startY: "-5vh", finalX: "-2vw", finalY: "1vh" },
    { id: 2, image: img2, rotate: 12,  delay: 0.08, startX: "5vw",  startY: "5vh",  finalX: "3vw",  finalY: "-3vh" },
    { id: 3, image: img3, rotate: -8,  delay: 0.16, startX: "-8vw", startY: "3vh",  finalX: "-4vw", finalY: "-1vh" },
    { id: 4, image: img4, rotate: 18,  delay: 0.24, startX: "6vw",  startY: "-6vh", finalX: "1vw",  finalY: "2vh" },
    { id: 5, image: img5, rotate: -5,  delay: 0.32, startX: "2vw",  startY: "4vh",  finalX: "-1vw", finalY: "0vh" },
  ];

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">

      {/* --- SCATTER DECK LAYER (CENTER STACK) --- */}
      <div className="absolute z-20 flex h-full w-full items-center justify-center pointer-events-none perspective-[1000px]">
        
        {products.map((product, index) => {
          return (
            <motion.div
              key={product.id}
              className="absolute w-[220px] h-[300px] md:w-[320px] md:h-[420px] bg-[#12100E] border border-white/10 p-2 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.5, x: product.startX, y: product.startY, rotate: product.rotate - 20 }}
              animate={controls}
              variants={{
                stacked: {
                  opacity: 1,
                  scale: 1,
                  rotate: product.rotate,
                  x: product.finalX,
                  y: product.finalY,
                  transition: { duration: 0.6, delay: product.delay, ease: [0.16, 1, 0.3, 1] }
                },
                pushedBack: {
                  opacity: 0,
                  scale: 0.6,
                  rotate: product.rotate + 10,
                  y: "25vh",
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
                }
              }}
              style={{ zIndex: 20 + index }}
            >
              <div className="relative w-full h-full bg-[#1A1816] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`Damaged Goods Product ${product.id}`}
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- TEXT LAYER --- */}
      <motion.div 
        layoutId="brand-text"
        className="absolute z-30 flex w-full justify-center text-center font-sans text-[10vw] font-black uppercase leading-none tracking-[0.15em] text-white mix-blend-difference pointer-events-none drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.85, y: "5vh" }}
        animate={controls}
        variants={{
          stacked: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
          },
          pushedBack: {
            // We DO NOT fade out. We hold position so it can morph to the homepage!
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }
        }}
      >
        <span>DAMAGED GOODS</span>
      </motion.div>
    </div>
  );
}