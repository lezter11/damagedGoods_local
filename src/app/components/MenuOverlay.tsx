import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Importing your preview assets
import hoodieMenuImg from "../../imports/hoodie_menu.png";
import jacketImg from "../../imports/Jacket_homepage_high_pixel.png";
import homepageJacketImg from "../../imports/HomepageJacket (1).png";
import scatterImg from "../../imports/d15637d315c5399b0c2fc1eba40ae34a_l.webp";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [activeImage, setActiveImage] = useState<string>(hoodieMenuImg);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems = [
    { 
      id: "01", 
      title: "Collection", 
      subtitle: "EXPLORE ARCHIVAL CONCEPTS", 
      img: homepageJacketImg 
    },
    { 
      id: "02", 
      title: "Drops", 
      subtitle: "LIMITED EDITION CHRONICLES", 
      img: jacketImg 
    },
    { 
      id: "03", 
      title: "About", 
      subtitle: "THE INTEGRITY ARCHIVE", 
      img: hoodieMenuImg 
    },
    { 
      id: "04", 
      title: "Orders", 
      subtitle: "TRACK REPLICA DELIVERIES", 
      img: scatterImg 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex bg-[#0a0a0a] text-[#faf9f5] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* ================= LEFT SIDE: MINIMAL NAV NAVIGATION ================= */}
          <div className="w-full lg:w-[52%] h-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 bg-[#0a0a0a]">
            
            {/* Upper Info Row */}
            <div className="w-full flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-neutral-500">
                [ DG SYSTEM // INDEX PANEL ]
              </span>
              <button
                onClick={onClose}
                className="group flex items-center gap-3 cursor-pointer focus:outline-none text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-50 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  CLOSE //
                </span>
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className="absolute w-full h-[1px] bg-current rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="absolute w-full h-[1px] bg-current -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Menu Items Links Container */}
            <nav className="flex flex-col w-full my-auto py-12">
              {menuItems.map((item, index) => {
                const isHovered = activeIndex === index;
                const isAnyHovered = activeIndex !== null;

                return (
                  <a
                    key={item.id}
                    href={`#${item.title.toLowerCase()}`}
                    onClick={() => onClose()}
                    className="relative border-b border-neutral-900 py-6 sm:py-8 cursor-pointer overflow-hidden group block"
                    onMouseEnter={() => {
                      setActiveImage(item.img);
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => {
                      setActiveIndex(null);
                    }}
                  >
                    <div className="flex items-start justify-between w-full relative z-10">
                      <div className="flex items-start gap-6 md:gap-10">
                        {/* Index Indicator */}
                        <span className={`font-mono text-[10px] md:text-xs mt-2 md:mt-3 transition-all duration-400 ${
                          isHovered ? "text-[#c00000] translate-x-1" : "text-neutral-600"
                        }`}>
                          {item.id}
                        </span>

                        {/* Text Stack */}
                        <div className="flex flex-col">
                          <h2 
                            className={`text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight leading-none transition-all duration-500 ease-[0.16,1,0.3,1] ${
                              isHovered 
                                ? "text-white translate-x-3 scale-[1.01]" 
                                : isAnyHovered 
                                  ? "text-neutral-700 opacity-40" 
                                  : "text-[#eeece7]"
                            }`}
                          >
                            {item.title}
                          </h2>
                          <p className={`font-mono text-[9px] tracking-[0.25em] transition-all duration-400 mt-2.5 uppercase ${
                            isHovered ? "text-neutral-400 translate-x-3" : "text-neutral-600"
                          }`}>
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator: Minimal Horizontal Reveal Dash */}
                      <div className="h-[1px] bg-neutral-800 self-center flex-grow mx-8 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative">
                        <motion.div 
                          className="absolute inset-0 bg-[#c00000]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Bottom System Labels */}
            <div className="w-full flex items-end justify-between font-mono text-[9px] text-neutral-600 tracking-widest pt-4 border-t border-neutral-900/60">
              <span>DESIGN PROTOCOL v2.06</span>
              <span>[ BRAND ARCHIVE ALL RIGHTS RESERVED ]</span>
            </div>
          </div>

          {/* ================= RIGHT SIDE: HIGH-PIXEL MEDIA LOOKBOOK PANEL ================= */}
          <div className="hidden lg:block lg:w-[48%] h-full bg-[#0d0d0d] relative border-l border-neutral-900 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, filter: "grayscale(100%) brightness(0.2)" }}
                animate={{ opacity: 1, filter: "grayscale(100%) brightness(0.48) contrast(1.1)" }}
                exit={{ opacity: 0, filter: "grayscale(100%) brightness(0.2)" }}
                transition={{ duration: 0.35, ease: "linear" }}
              >
                <img
                  src={activeImage}
                  alt="System Focus Visual Lookbook"
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-100 group-hover:scale-[1.03]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Tech Geometry Grid Overlays */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03]">
              <div className="border-r border-neutral-100 h-full" />
              <div className="border-r border-neutral-100 h-full" />
              <div className="border-r border-neutral-100 h-full" />
            </div>

            {/* Running Corporate Signature Label Block */}
            <div className="absolute bottom-12 right-12 z-20 text-right font-mono text-[9px] tracking-[0.25em] text-neutral-500">
              <p className="text-neutral-400 font-bold tracking-[0.3em] uppercase mb-1">© 2026 DAMAGED GOODS SYSTEM</p>
              <p className="opacity-40">AUTO_CONF_SECURE // SYSTEM_STABLE</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}