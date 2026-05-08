// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";

// // Import your product images
// import img1 from "../../imports/pimp_priest_product_image.png";
// import img2 from "../../imports/Lips_holy_product_image.png";
// import img3 from "../../imports/Adored_discareded_product_image.png";
// import img4 from "../../imports/actively_product_image.png";
// import img5 from "../../imports/Sin_looks_better_product_image.png";

// interface PreloaderProps {
//   onComplete: () => void;
// }

// export function Preloader({ onComplete }: PreloaderProps) {
//   const [count, setCount] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     let currentCount = 0;
//     const duration = 1500; // 1.5 seconds of counting
//     const interval = 20; 
//     const step = 100 / (duration / interval);

//     const timer = setInterval(() => {
//       currentCount += step;
//       if (currentCount >= 100) {
//         setCount(100);
//         clearInterval(timer);
//         setIsExiting(true);
//         setTimeout(onComplete, 1200); 
//       } else {
//         setCount(Math.floor(currentCount));
//       }
//     }, interval);

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   // Standardize the card size
//   const cardClasses = "absolute w-24 h-32 md:w-32 md:h-44 bg-[#12100E] border border-white/10 p-1 shadow-2xl";

//   // We define our stack of images here.
//   // 'appearAt' is the counter number (0-100) when this image should pop onto the screen.
//   // 'rotate' gives each card that messy, tilted look.
//   // 'z' controls if it's behind (z-10) or in front (z-30) of the text.
//   const stack = [
//     { id: 1, src: img1, appearAt: 5, rotate: -12, z: "z-10" },
//     { id: 2, src: img2, appearAt: 20, rotate: 8, z: "z-10" },
//     { id: 3, src: img3, appearAt: 40, rotate: -5, z: "z-10" },
//     { id: 4, src: img4, appearAt: 60, rotate: 15, z: "z-10" }, // Pops in FRONT of the text
//     { id: 5, src: img5, appearAt: 80, rotate: -18, z: "z-10" },
//   ];

//   return (
//     <AnimatePresence>
//       {!isExiting && (
//         <motion.div
//           key="preloader"
//           exit={{ y: "-100%" }}
//           transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
//         >
          
//           {/* THE IMAGE STACK */}
//           {stack.map((item) => {
//             // Only render the image if the counter has reached its 'appearAt' threshold
//             if (count < item.appearAt) return null;

//             return (
//               <motion.div
//                 key={item.id}
//                 // When it appears, it pops slightly (scale 0.8 to 1)
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 // When the preloader exits, the cards shrink away
//                 exit={{ scale: 0, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                 className={`${cardClasses} ${item.z}`}
//                 style={{ rotate: `${item.rotate}deg` }}
//               >
//                 <img src={item.src} alt={`Loading ${item.id}`} className="w-full h-full object-cover" />
//               </motion.div>
//             );
//           })}

//           {/* THE TEXT LAYER (z-20) */}
//           <div className="absolute z-20 flex w-full justify-center gap-4 text-center font-serif text-[3vw] font-black uppercase leading-none tracking-tighter text-white pointer-events-none drop-shadow-2xl">
//             <motion.span
//               exit={{ x: "-50vw", opacity: 0 }}
//               transition={{ duration: 0.8, ease: "backIn" }}
//             >
//               DAMAGED
//             </motion.span>
//             <motion.span
//               exit={{ x: "50vw", opacity: 0 }}
//               transition={{ duration: 0.8, ease: "backIn" }}
//             >
//               GOODS
//             </motion.span>
//           </div>

//           {/* THE COUNTER (z-40) */}
//           <motion.div 
//             exit={{ opacity: 0 }}
//             className="absolute right-8 md:right-24 font-mono text-xl md:text-2xl text-white tracking-widest z-40"
//           >
//             {count.toString().padStart(3, "0")}
//           </motion.div>

//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Import your product images
import img1 from "../../imports/pimp_priest_product_image.png";
import img2 from "../../imports/Lips_holy_product_image.png";
import img3 from "../../imports/Adored_discareded_product_image.png";
import img4 from "../../imports/actively_product_image.png";
import img5 from "../../imports/Sin_looks_better_product_image.png";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentCount = 0;
    const duration = 1500; 
    const interval = 20; 
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      currentCount += step;
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(onComplete, 1200); 
      } else {
        setCount(Math.floor(currentCount));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // ==========================================
  // 1. INCREASED IMAGE SIZE
  // We bumped it up to w-40/h-56 on mobile, and a massive w-64/h-80 on desktop
  // ==========================================
  const cardClasses = "absolute w-40 h-56 md:w-64 md:h-80 bg-[#12100E] border border-white/10 p-1.5 shadow-2xl";

  const stack = [
    { id: 1, src: img1, appearAt: 5, rotate: -12, z: "z-10" },
    { id: 2, src: img2, appearAt: 20, rotate: 8, z: "z-10" },
    { id: 3, src: img3, appearAt: 40, rotate: -5, z: "z-10" },
    { id: 4, src: img4, appearAt: 60, rotate: 15, z: "z-10" }, 
    { id: 5, src: img5, appearAt: 80, rotate: -18, z: "z-10" },
  ];

  // Since the text is smaller (4vw), I slightly reduced the stroke thickness 
  // so the letters don't look too bulky and maintain that sharp glass look.
  const glassTextStyles = "text-white/20 [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] mix-blend-color-dodge drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]";

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          
          {/* THE IMAGE STACK */}
          {stack.map((item) => {
            if (count < item.appearAt) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`${cardClasses} ${item.z}`}
                style={{ rotate: `${item.rotate}deg` }}
              >
                <img src={item.src} alt={`Loading ${item.id}`} className="w-full h-full object-cover" />
              </motion.div>
            );
          })}

          {/* ==========================================
              2. REDUCED TEXT SIZE TO 4vw
              ========================================== */}
          <div className="absolute z-20 flex w-full justify-center gap-4 text-center font-serif text-[4vw] font-black uppercase leading-none tracking-tighter pointer-events-none">
            <motion.span
              exit={{ x: "-50vw", opacity: 0 }}
              transition={{ duration: 0.8, ease: "backIn" }}
              className={glassTextStyles}
            >
              DAMAGED
            </motion.span>
            <motion.span
              exit={{ x: "50vw", opacity: 0 }}
              transition={{ duration: 0.8, ease: "backIn" }}
              className={glassTextStyles}
            >
              GOODS
            </motion.span>
          </div>

          {/* THE COUNTER */}
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute right-8 md:right-24 font-mono text-xl md:text-2xl text-white tracking-widest z-40"
          >
            {count.toString().padStart(3, "0")}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}