// import React, { useRef } from "react";
// import { Navbar } from "./components/Navbar";
// import { Hero } from "./components/Hero";
// import { Products } from "./components/Products";
// import { motion, useScroll, useTransform } from "motion/react";
// import bgImage from "../imports/Jacket_homepage_high_pixel.png";

// export default function App() {
//   // Track overall page scroll - deployed to GitHub Pages
//   const { scrollYProgress } = useScroll();

//   // Split effect logic:
//   // From 0 to 0.1: Nothing happens (allow user to see initial state).
//   // From 0.1 to 0.5: Jacket slides apart.
//   const leftX = useTransform(scrollYProgress, [0.05, 0.4], ["0%", "-50vw"]);
//   const rightX = useTransform(scrollYProgress, [0.05, 0.4], ["0%", "50vw"]);
  
//   // Fade and slide out the Hero text
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
//   const heroY = useTransform(scrollYProgress, [0, 0.1], ["0px", "-50px"]);
//   const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

//   return (
//     <div className="bg-[#0a0a0a] text-white selection:bg-white/30 selection:text-white font-sans">
//       <Navbar />
      
//       {/* 
//         The Scroll Container 
//         Setting a large height allows us to use the scrollbar to drive the animation.
//       */}
//       <div className="h-[200vh] sm:h-[220vh] md:h-[250vh] relative">
        
//         {/* Sticky section that holds the visuals in place while scrolling the 250vh */}
//         <div className="sticky top-0 h-screen w-full overflow-hidden">
          
//           {/* Layer 1 (Bottom): The Revealed Content (Products) */}
//           <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
//             <Products scrollProgress={scrollYProgress} />
//           </div>

//           {/* Layer 2 (Middle): The Splitting Jacket halves */}
//           {/* Left Half */}
//           <motion.div 
//             style={{ x: leftX }}
//             className="absolute inset-0 z-10 pointer-events-none"
//           >
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 20%",
//                 clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
//               }}
//             />
//             {/* Inner shadow to give the split edge some thickness/depth */}
//             <div className="absolute inset-y-0 left-[50%] w-8 -ml-8 bg-gradient-to-l from-black/80 to-transparent opacity-80" />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
//           </motion.div>

//           {/* Right Half */}
//           <motion.div 
//             style={{ x: rightX }}
//             className="absolute inset-0 z-10 pointer-events-none"
//           >
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 20%",
//                 clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
//               }}
//             />
//             <div className="absolute inset-y-0 right-[50%] w-8 -mr-8 bg-gradient-to-r from-black/80 to-transparent opacity-80" />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
//           </motion.div>

//           {/* Layer 3 (Top): Hero UI & Navbar */}
//           {/* Hero fades out as we start scrolling */}
//           <motion.div 
//             style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
//             className="absolute inset-0 z-20 pointer-events-none"
//           >
//             <Hero />
//           </motion.div>

//           {/* Optional: Particle Effects that overlay everything */}
//           <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden mix-blend-overlay">
//             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
//             <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
//           </div>

//         </div>
//       </div>
      
//     </div>
//   );
// }






// import React, { useRef } from "react";
// import { Navbar } from "./components/Navbar";
// import { Hero } from "./components/Hero";
// import { Products } from "./components/Products";
// import { ScatterReveal } from "./components/ScatterReveal"; // <--- ADDED IMPORT
// import { motion, useScroll, useTransform } from "motion/react";
// import bgImage from "../imports/Jacket_homepage_high_pixel.png";

// export default function App() {
//   // 1. Create a reference specifically for the jacket section
//   const jacketContainerRef = useRef(null);

//   // 2. Track scroll ONLY while the user is inside the jacket container
//   const { scrollYProgress: jacketScroll } = useScroll({
//     target: jacketContainerRef,
//     offset: ["start start", "end end"]
//   });

//   // 3. Use 'jacketScroll' instead of global scroll for the split logic
//   const leftX = useTransform(jacketScroll, [0.05, 0.4], ["0%", "-50vw"]);
//   const rightX = useTransform(jacketScroll, [0.05, 0.4], ["0%", "50vw"]);
//   const heroOpacity = useTransform(jacketScroll, [0, 0.1], [1, 0]);
//   const heroY = useTransform(jacketScroll, [0, 0.1], ["0px", "-50px"]);
//   const heroScale = useTransform(jacketScroll, [0, 0.1], [1, 0.95]);

//   return (
//     <div className="bg-[#0a0a0a] text-white selection:bg-white/30 selection:text-white font-sans">
//       <Navbar />
      
//       {/* =========================================
//           SCENE 1: THE JACKET SPLIT
//           ========================================= */}
//       <div ref={jacketContainerRef} className="h-[200vh] sm:h-[220vh] md:h-[250vh] relative z-20">
        
//         <div className="sticky top-0 h-screen w-full overflow-hidden">
          
//           {/* We replace the Products layer here with a blank black canvas, 
//               so when the jacket opens, it reveals the dark void right before 
//               the Scatter animation slides up */}
//           <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />

//           {/* Left Half */}
//           <motion.div 
//             style={{ x: leftX }}
//             className="absolute inset-0 z-10 pointer-events-none"
//           >
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 20%",
//                 clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
//               }}
//             />
//             <div className="absolute inset-y-0 left-[50%] w-8 -ml-8 bg-gradient-to-l from-black/80 to-transparent opacity-80" />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
//           </motion.div>

//           {/* Right Half */}
//           <motion.div 
//             style={{ x: rightX }}
//             className="absolute inset-0 z-10 pointer-events-none"
//           >
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 20%",
//                 clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
//               }}
//             />
//             <div className="absolute inset-y-0 right-[50%] w-8 -mr-8 bg-gradient-to-r from-black/80 to-transparent opacity-80" />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
//           </motion.div>

//           {/* Hero UI */}
//           <motion.div 
//             style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
//             className="absolute inset-0 z-20 pointer-events-none"
//           >
//             <Hero />
//           </motion.div>

//         </div>
//       </div>

//       {/* =========================================
//           SCENE 2: THE SCATTER REVEAL
//           ========================================= */}
//       {/* As the user scrolls past the jacket, this sequence naturally triggers */}
//       <div className="relative z-30">
//         <ScatterReveal />
//       </div>

//       {/* =========================================
//           SCENE 3: THE CATALOGUE
//           ========================================= */}
//       {/* After the cinematic intro, they arrive at the actual product grid */}
//       <div className="relative z-40 bg-[#12100E]">
//         <Products scrollProgress={jacketScroll} />
//       </div>
      
//     </div>
//   );
// }





// import React, { useRef } from "react";
// import { Navbar } from "./components/Navbar";
// import { Hero } from "./components/Hero";
// import { Products } from "./components/Products";
// import { ScatterReveal } from "./components/ScatterReveal"; 
// import { motion, useScroll, useTransform } from "motion/react";
// import bgImage from "../imports/Jacket_homepage_high_pixel.png";

// export default function App() {
//   // 1. One Master Tracker for the entire intro sequence
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   // 2. TIMELINE: The jacket opens between 0% and 25% of the scroll
//   const leftX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-50vw"]);
//   const rightX = useTransform(scrollYProgress, [0, 0.25], ["0%", "50vw"]);
  
//   // Hero fades out super early
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
//   const heroY = useTransform(scrollYProgress, [0, 0.1], ["0px", "-50px"]);
//   const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
//   const heroDisplay = useTransform(scrollYProgress, (v) => v > 0.1 ? "none" : "block");

//   return (
//     <div className="bg-[#0a0a0a] text-white selection:bg-white/30 selection:text-white font-sans">
//       <Navbar />
      
//       {/* 400vh gives the user enough scroll distance to trigger both animations comfortably */}
//       <div ref={containerRef} className="h-[400vh] relative z-20">
        
//         {/* THIS is the single screen that pins to the window */}
//         <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">

//           {/* LAYER 1: SCATTER REVEAL (Sits in the background) */}
//           <div className="absolute inset-0 z-10">
//             {/* We pass the master scroll progress so the Scatter knows when to start! */}
//             <ScatterReveal progress={scrollYProgress} />
//           </div>

//           {/* LAYER 2: JACKET HALVES (Sits on top of the scatter, hides it until it opens) */}
//           <motion.div style={{ x: leftX }} className="absolute inset-0 z-20 pointer-events-none">
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 60%", 
//                 clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
//               }}
//             />
//             <div className="absolute inset-y-0 left-[50%] w-8 -ml-8 bg-gradient-to-l from-black/80 to-transparent opacity-80" />
//           </motion.div>

//           <motion.div style={{ x: rightX }} className="absolute inset-0 z-20 pointer-events-none">
//             <div 
//               className="absolute inset-0 bg-no-repeat bg-cover"
//               style={{ 
//                 backgroundImage: `url("${bgImage}")`,
//                 backgroundPosition: "center 60%", 
//                 clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
//               }}
//             />
//             <div className="absolute inset-y-0 right-[50%] w-8 -mr-8 bg-gradient-to-r from-black/80 to-transparent opacity-80" />
//           </motion.div>

//           {/* LAYER 3: HERO TEXT & BUTTONS */}
//           <motion.div 
//             style={{ opacity: heroOpacity, y: heroY, scale: heroScale, display: heroDisplay }} 
//             className="absolute inset-0 z-30 pointer-events-none"
//           >
//             <Hero />
//           </motion.div>
          
//         </div>
//       </div>

//       {/* LAYER 4: THE CATALOGUE (Scrolls up naturally AFTER everything finishes) */}
//       <div className="relative z-40 bg-[#12100E]">
//         <Products scrollProgress={scrollYProgress} />
//       </div>
      
//     </div>
//   );
// }




import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Preloader } from "./components/Preloader"; 
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import bgImage from "../imports/Jacket_homepage_high_pixel.png";

export default function App() {
  const [phase, setPhase] = useState<"jacket" | "transition" | "products">("jacket");

  // 1. THE FIX: We track the global window scroll. This never fails.
  const { scrollYProgress } = useScroll();

  // 2. THE TRIGGER: When they scroll past 95% (lowered to 0.95 to account for Safari/Mobile address bars)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.95 && phase === "jacket") {
      // Snap scroll back to 0 instantly so the product page starts perfectly at the top
      window.scrollTo(0, 0);
      // Fire the automated animation!
      setPhase("transition");
    }
  });

  // Jacket animations (Takes place between 0% and 80% of the scroll)
  const leftX = useTransform(scrollYProgress, [0, 0.8], ["0%", "-50vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.8], ["0%", "50vw"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0px", "-50px"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroDisplay = useTransform(scrollYProgress, (v) => v > 0.16 ? "none" : "block");

  return (
    // We lock the screen (overflow-hidden) during the automated transition so the user can't break it
    <div className={`bg-[#0a0a0a] text-white selection:bg-white/30 selection:text-white font-sans ${phase === "transition" ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* SCENE 1: THE JACKET SPLIT */}
      {phase === "jacket" && (
        <div className="h-[200vh] relative z-20">
          <Navbar />
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
            
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />

            <motion.div style={{ x: leftX }} className="absolute inset-0 z-10 pointer-events-none">
              <div 
                className="absolute inset-0 bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: `url("${bgImage}")`,
                  backgroundPosition: "center 60%", 
                  clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
                }}
              />
              <div className="absolute inset-y-0 left-[50%] w-8 -ml-8 bg-gradient-to-l from-black/80 to-transparent opacity-80" />
            </motion.div>

            <motion.div style={{ x: rightX }} className="absolute inset-0 z-10 pointer-events-none">
              <div 
                className="absolute inset-0 bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: `url("${bgImage}")`,
                  backgroundPosition: "center 60%", 
                  clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
                }}
              />
              <div className="absolute inset-y-0 right-[50%] w-8 -mr-8 bg-gradient-to-r from-black/80 to-transparent opacity-80" />
            </motion.div>

            <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale, display: heroDisplay }} className="absolute inset-0 z-20 pointer-events-none">
              <Hero />
            </motion.div>
          </div>
        </div>
      )}

      {/* SCENE 2: THE AUTOMATED VIDEO TRANSITION OVERLAY */}
      {phase === "transition" && (
        <Preloader onComplete={() => setPhase("products")} />
      )}

      {/* SCENE 3: THE CATALOGUE */}
      {(phase === "transition" || phase === "products") && (
        <div className="relative z-10 pt-24 px-6 md:px-12 bg-[#12100E] min-h-screen">
          <Navbar />
          <header className="mb-20 mt-12">
            <h1 className="text-[12vw] leading-none font-black font-serif tracking-tighter text-white/90 uppercase text-center">
                Damaged<br/>Goods
            </h1>
          </header>
          <main>
            {/* The single, reliable global scroll is handed off directly to your products layer */}
            <Products scrollProgress={scrollYProgress} /> 
          </main>
        </div>
      )}
      
    </div>
  );
}