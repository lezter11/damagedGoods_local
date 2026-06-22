import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProductTransitionProps {
  onReveal: () => void;
}

export function ProductTransition({ onReveal }: ProductTransitionProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    // 1.0s: Text fully forms, fire onReveal to mount the ProductPage underneath
    const holdTimer = setTimeout(() => {
      onReveal(); 
      // 1.1s: Start slide out of the black panels and text
      setTimeout(() => {
        setPhase("exit");
      }, 100);
    }, 1000);

    return () => {
      clearTimeout(holdTimer);
    };
  }, [onReveal]);

  // Buttery smooth, slightly aggressive cinematic easing
  const ease: any = [0.22, 1, 0.36, 1];

  const text = "DAMAGED GOODS";
  
  // Custom scatter logic for each letter based on index
  const letterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: (i % 2 === 0 ? 1 : -1) * (100 + (i * 20)),
      y: (i % 3 === 0 ? 1 : -1) * (80 + (i * 15)),
      rotate: (i % 2 === 0 ? 1 : -1) * (20 + (i * 5)),
      scale: 1.5,
      filter: "blur(12px)"
    }),
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease,
        delay: 0.15 + (i * 0.03)
      }
    }),
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease }
    }
  };

  return (
    <div className="fixed inset-0 z-[500] pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {phase === "enter" && (
          <>
            {/* TOP PANEL */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute top-0 left-0 right-0 h-[51vh] bg-[#000000]"
            />
            {/* BOTTOM PANEL */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute bottom-0 left-0 right-0 h-[51vh] bg-[#000000]"
            />
            {/* LEFT PANEL */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute top-0 bottom-0 left-0 w-[51vw] bg-[#000000]"
            />
            {/* RIGHT PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute top-0 bottom-0 right-0 w-[51vw] bg-[#000000]"
            />
            
            {/* TYPOGRAPHY (SCATTER MERGE) */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center z-10 p-4 gap-2 md:gap-8 mix-blend-difference">
              {/* Word 1: DAMAGED */}
              <div className="flex">
                {text.split(" ")[0].split("").map((letter, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-[#fcfaf5] text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase font-sans leading-none inline-block drop-shadow-2xl"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              {/* Word 2: GOODS */}
              <div className="flex">
                {text.split(" ")[1].split("").map((letter, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    custom={i + 7} // offset index for staggered delay
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-[#fcfaf5] text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase font-sans leading-none inline-block drop-shadow-2xl"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
