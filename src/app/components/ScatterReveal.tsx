// "use client";

// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "motion/react";

// // 1. IMPORTING YOUR ACTUAL PRODUCT IMAGES
// import img1 from "../../imports/pimp_priest_product_image.png";
// import img2 from "../../imports/Lips_holy_product_image.png";
// import img3 from "../../imports/Adored_discareded_product_image.png";
// import img4 from "../../imports/actively_product_image.png";
// import img5 from "../../imports/Sin_looks_better_product_image.png";
// // Using the new image you just uploaded!
// //import img6 from "../../imports/DE46398E-767B-4F85-80B8-1479071BBA7B_1_206_a.jpeg"; 

// export function ScatterReveal() {
//   const containerRef = useRef(null);
  
//   // This tracks the scroll position specifically inside this 300vh container
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // DAMAGED GOODS Text Split Animation
//   // Stays still for 20% of the scroll, then slides off screen
//   const leftTextX = useTransform(scrollYProgress, [0.2, 0.6], ["0vw", "-100vw"]);
//   const rightTextX = useTransform(scrollYProgress, [0.2, 0.6], ["0vw", "100vw"]);
//   const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  
//   // The background slides up right before you hit the Product Grid
//   const bgHeight = useTransform(scrollYProgress, [0.7, 1], ["0%", "100%"]);

//   // 2. THE DECK CONFIGURATION
//   // targetX and targetY dictate where each card flies to. 
//   // rotate dictates its final tilt angle.
//   const products = [
//     { id: 1, image: img1, targetX: "-38vw", targetY: "-20vh", rotate: -18 },
//     { id: 2, image: img2, targetX: "38vw", targetY: "-22vh", rotate: 14 },
//     { id: 3, image: img3, targetX: "-28vw", targetY: "32vh", rotate: -12 },
//     { id: 4, image: img4, targetX: "28vw", targetY: "30vh", rotate: 20 },
//     { id: 5, image: img5, targetX: "-8vw", targetY: "-38vh", rotate: -6 },
//     { id: 6, image: img6, targetX: "8vw", targetY: "38vh", rotate: 8 },
//   ];

//   return (
//     // We use a 300vh height so the user scrolls "through" the animation slowly
//     <section ref={containerRef} className="relative h-[300vh] w-full bg-[#0A0908]">
      
//       {/* The sticky container locks the view in place while the scroll triggers the math */}
//       <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">

//         {/* --- TEXT LAYER --- */}
//         <motion.div 
//           style={{ opacity: textOpacity }}
//           className="absolute z-30 flex w-full justify-center gap-6 md:gap-12 text-center font-serif text-[12vw] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference pointer-events-none"
//         >
//           <motion.span style={{ x: leftTextX }}>DAMAGED</motion.span>
//           <motion.span style={{ x: rightTextX }}>GOODS</motion.span>
//         </motion.div>

//         {/* --- SCATTER DECK LAYER --- */}
//         <div className="absolute z-20 flex h-full w-full items-center justify-center pointer-events-none">
          
//           {/* We render an initial "Stack Cover" so it looks like a single card before moving */}
//           <motion.div 
//             className="absolute z-[25] w-[220px] h-[300px] md:w-[300px] md:h-[400px] bg-black/80 border border-white/20 shadow-2xl flex items-center justify-center"
//             style={{
//               opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]), // Fades out instantly as you scroll
//               scale: useTransform(scrollYProgress, [0, 0.05], [0.8, 0.9])
//             }}
//           >
//              <span className="text-white/50 tracking-widest text-xs uppercase">SS26 Drop</span>
//           </motion.div>

//           {products.map((product, index) => {
//             // THE PHYSICS:
//             // 0 to 10%: Do nothing, stay stacked.
//             // 10% to 50%: Fly out to target coordinates and rotate.
//             const imgX = useTransform(scrollYProgress, [0.1, 0.5], ["0vw", product.targetX]);
//             const imgY = useTransform(scrollYProgress, [0.1, 0.5], ["0vh", product.targetY]);
//             const imgRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, product.rotate]);
            
//             // Starts slightly scaled down (0.8) and grows to full size (1) as it flies
//             const imgScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);

//             return (
//               <motion.div
//                 key={product.id}
//                 // We use z-index math so the cards layer properly on top of each other
//                 className="absolute w-[220px] h-[300px] md:w-[300px] md:h-[400px] bg-[#12100E] border border-white/10 p-2 overflow-hidden shadow-2xl"
//                 style={{
//                   x: imgX,
//                   y: imgY,
//                   rotate: imgRotate,
//                   scale: imgScale,
//                   zIndex: 20 - index, 
//                 }}
//               >
//                 {/* The Actual Product Image */}
//                 <div className="relative w-full h-full bg-[#1A1816] overflow-hidden">
//                   <img 
//                     src={product.image} 
//                     alt={`Damaged Goods Product ${product.id}`}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110 pointer-events-auto" 
//                   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* --- TRANSITION WIPE LAYER --- */}
//         {/* This slides up from the bottom at the very end of the scroll to transition into the product grid */}
//         <motion.div 
//           className="absolute bottom-0 left-0 w-full bg-[#12100E] z-40 pointer-events-none border-t border-white/5"
//           style={{ height: bgHeight }}
//         />
        
//       </div>
//     </section>
//   );
// }



"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

// YOUR PRODUCT IMAGES
import img1 from "../../imports/pimp_priest_product_image.png";
import img2 from "../../imports/Lips_holy_product_image.png";
import img3 from "../../imports/Adored_discareded_product_image.png";
import img4 from "../../imports/actively_product_image.png";
import img5 from "../../imports/Sin_looks_better_product_image.png";
//import img6 from "../../imports/DE46398E-767B-4F85-80B8-1479071BBA7B_1_206_a.jpeg"; 

// 1. We now accept 'progress' from the parent App.tsx
interface ScatterRevealProps {
  progress: MotionValue<number>;
}

export function ScatterReveal({ progress }: ScatterRevealProps) {

  // 2. TIMELINE: The Jacket takes from 0 to 0.25 to open. 
  // Therefore, ALL scatter animations wait until 0.25 to start moving!

  // Text Split Animation (Waits until 0.25, finishes at 0.5)
  const leftTextX = useTransform(progress, [0.25, 0.5], ["0vw", "-100vw"]);
  const rightTextX = useTransform(progress, [0.25, 0.5], ["0vw", "100vw"]);
  const textOpacity = useTransform(progress, [0.4, 0.55], [1, 0]);
  
  // The background slides up right before we hit the Product Grid (0.8 to 1)
  const bgHeight = useTransform(progress, [0.8, 1], ["0%", "100%"]);

  const products = [
    { id: 1, image: img1, targetX: "-38vw", targetY: "-20vh", rotate: -18 },
    { id: 2, image: img2, targetX: "38vw", targetY: "-22vh", rotate: 14 },
    { id: 3, image: img3, targetX: "-28vw", targetY: "32vh", rotate: -12 },
    { id: 4, image: img4, targetX: "28vw", targetY: "30vh", rotate: 20 },
    { id: 5, image: img5, targetX: "-8vw", targetY: "-38vh", rotate: -6 },
    //{ id: 6, image: img6, targetX: "8vw", targetY: "38vh", rotate: 8 },
  ];

  return (
    // 3. Removed the 300vh wrapper. This component now just perfectly fills the screen it's placed in.
    <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">

      {/* --- TEXT LAYER --- */}
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute z-30 flex w-full justify-center gap-6 md:gap-12 text-center font-serif text-[4vw] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference pointer-events-none"
      >
        <motion.span style={{ x: leftTextX }}>DAMAGED</motion.span>
        <motion.span style={{ x: rightTextX }}>GOODS</motion.span>
      </motion.div>

      {/* --- SCATTER DECK LAYER --- */}
      <div className="absolute z-20 flex h-full w-full items-center justify-center pointer-events-none">
        
        {/* Stack Cover */}
        <motion.div 
          className="absolute z-[25] w-[220px] h-[300px] md:w-[300px] md:h-[400px] bg-black/80 border border-white/20 shadow-2xl flex items-center justify-center"
          style={{
            opacity: useTransform(progress, [0.25, 0.3], [1, 0]), 
            scale: useTransform(progress, [0.25, 0.3], [0.8, 0.9])
          }}
        >
           <span className="text-white/50 tracking-widest text-xs uppercase">SS26 Drop</span>
        </motion.div>

        {products.map((product, index) => {
          // Cards wait until 0.25, then fly out
          const imgX = useTransform(progress, [0.25, 0.6], ["0vw", product.targetX]);
          const imgY = useTransform(progress, [0.25, 0.6], ["0vh", product.targetY]);
          const imgRotate = useTransform(progress, [0.25, 0.6], [0, product.rotate]);
          const imgScale = useTransform(progress, [0.25, 0.6], [0.8, 1]);

          return (
            <motion.div
              key={product.id}
              className="absolute w-[220px] h-[300px] md:w-[300px] md:h-[400px] bg-[#12100E] border border-white/10 p-2 overflow-hidden shadow-2xl"
              style={{
                x: imgX, y: imgY, rotate: imgRotate, scale: imgScale, zIndex: 20 - index, 
              }}
            >
              <div className="relative w-full h-full bg-[#1A1816] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`Damaged Goods Product ${product.id}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110 pointer-events-auto" 
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- TRANSITION WIPE LAYER --- */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full bg-[#12100E] z-40 pointer-events-none border-t border-white/5"
        style={{ height: bgHeight }}
      />
      
    </div>
  );
}