import React, { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { motion, useScroll, useTransform } from "motion/react";
import bgImage from "../imports/Transparent_Jacket.png";

export default function App() {
  // Track overall page scroll - deployed to GitHub Pages
  const { scrollYProgress } = useScroll();

  // Split effect logic:
  // From 0 to 0.1: Nothing happens (allow user to see initial state).
  // From 0.1 to 0.5: Jacket slides apart.
  const leftX = useTransform(scrollYProgress, [0.05, 0.4], ["0%", "-50vw"]);
  const rightX = useTransform(scrollYProgress, [0.05, 0.4], ["0%", "50vw"]);
  
  // Fade and slide out the Hero text
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], ["0px", "-50px"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-white/30 selection:text-white font-sans">
      <Navbar />
      
      {/* 
        The Scroll Container 
        Setting a large height allows us to use the scrollbar to drive the animation.
      */}
      <div className="h-[200vh] sm:h-[220vh] md:h-[250vh] relative">
        
        {/* Sticky section that holds the visuals in place while scrolling the 250vh */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Layer 1 (Bottom): The Revealed Content (Products) */}
          <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-y-auto custom-scrollbar">
            <Products scrollProgress={scrollYProgress} />
          </div>

          {/* Layer 2 (Middle): The Splitting Jacket halves */}
          {/* Left Half */}
          <motion.div 
            style={{ x: leftX }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div 
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{ 
                backgroundImage: `url("${bgImage}")`,
                clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
              }}
            />
            {/* Inner shadow to give the split edge some thickness/depth */}
            <div className="absolute inset-y-0 left-[50%] w-8 -ml-8 bg-gradient-to-l from-black/80 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          </motion.div>

          {/* Right Half */}
          <motion.div 
            style={{ x: rightX }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div 
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{ 
                backgroundImage: `url("${bgImage}")`,
                clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
              }}
            />
            <div className="absolute inset-y-0 right-[50%] w-8 -mr-8 bg-gradient-to-r from-black/80 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          </motion.div>

          {/* Layer 3 (Top): Hero UI & Navbar */}
          {/* Hero fades out as we start scrolling */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <Hero />
          </motion.div>

          {/* Optional: Particle Effects that overlay everything */}
          <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden mix-blend-overlay">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
          </div>

        </div>
      </div>
      
    </div>
  );
}
