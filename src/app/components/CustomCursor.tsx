import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useUIStore } from "../../store/useUIStore";

export function CustomCursor() {
  const { hoveredProduct } = useUIStore();
  
  // Track mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add physics/spring to the cursor movement for that premium feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // Determine cursor state based on hoveredProduct
  const isHovered = hoveredProduct !== null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full bg-red text-white mix-blend-normal hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ width: 16, height: 16, opacity: 0 }}
      animate={{
        width: isHovered ? 80 : 16,
        height: isHovered ? 80 : 16,
        opacity: 1,
        backgroundColor: isHovered ? "#ff0001" : "#ff0001"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.span
        className="text-[10px] font-bold uppercase tracking-widest"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
