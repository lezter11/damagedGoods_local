import React, { useEffect, useRef, useState } from "react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutList, LayoutGrid } from "lucide-react";
import { motion } from "motion/react";

interface EditorialArchiveProps {
  onProductClick?: (p: Product, rect: DOMRect) => void;
  activeProductId?: number | null;
}

// Map card types to aspect ratios and physics, stripping absolute horizontal offsets
const getCardConfig = (type: Product["cardType"]) => {
  switch (type) {
    case "hero":
      return {
        aspectClass: "aspect-[16/9]",
        parallaxSpeed: -30,
        floatingIntensity: 3,
      };
    case "landscape":
      return {
        aspectClass: "aspect-[3/2]",
        parallaxSpeed: -60,
        floatingIntensity: 5,
      };
    case "portrait":
      return {
        aspectClass: "aspect-[4/5]",
        parallaxSpeed: -90,
        floatingIntensity: 8,
      };
    case "feature":
      return {
        aspectClass: "aspect-square",
        parallaxSpeed: -40,
        floatingIntensity: 5,
      };
    case "micro":
      return {
        aspectClass: "aspect-[3/4]",
        parallaxSpeed: -120,
        floatingIntensity: 12,
      };
    default:
      return {
        aspectClass: "aspect-[4/5]",
        parallaxSpeed: -50,
        floatingIntensity: 5,
      };
  }
};

export function EditorialArchive({ onProductClick, activeProductId }: EditorialArchiveProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (viewMode !== "grid") return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const product = products[i];
        const config = getCardConfig(product.cardType);
        
        const innerWrapper = el.querySelector(".floating-target");
        
        // 2. Scroll Parallax (Organic Stagger)
        gsap.to(el, {
          y: config.parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // 3. Idle Floating System
        if (innerWrapper) {
          const intensity = config.floatingIntensity;
          const randomDurationX = gsap.utils.random(15, 25);
          const randomDurationY = gsap.utils.random(15, 25);
          
          gsap.to(innerWrapper, {
            x: () => gsap.utils.random(-intensity, intensity),
            rotation: () => gsap.utils.random(-0.5, 0.5),
            duration: randomDurationX,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          gsap.to(innerWrapper, {
            y: () => gsap.utils.random(-intensity, intensity),
            duration: randomDurationY,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [viewMode]);

  const handleProductClick = (e: React.MouseEvent, product: Product, index: number) => {
    const imgEl = imageRefs.current[index];
    if (imgEl && onProductClick) {
      const rect = imgEl.getBoundingClientRect();
      onProductClick(product, rect);
    }
  };

  const handleListClick = (e: React.MouseEvent, product: Product) => {
    const rect = new DOMRect(window.innerWidth / 2, window.innerHeight / 2, 0, 0);
    onProductClick?.(product, rect);
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen pb-64 text-white bg-[#050505] pt-12 overflow-hidden">
      
      <div className="px-6 md:px-12 lg:px-16 mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5">
        <div>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500 mb-2">
            ARCHIVE INDEX // AW-25
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
            PROJECT ARCHIVE
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-500">
            {products.length} EXHIBITS
          </span>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="px-6 md:px-12 lg:px-16 relative z-10 w-full max-w-[2000px] mx-auto">
          {/* 3-COLUMN MASONRY-STYLE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 md:gap-y-32 items-start">
            {products.map((product, i) => {
              const config = getCardConfig(product.cardType);
              const isDimmed = activeProductId != null && activeProductId !== product.id;
              const isClicked = activeProductId === product.id;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                  className={`z-10`}
                >
                  <div
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className={`
                      w-full group cursor-pointer will-change-transform flex flex-col
                      transition-all duration-700 ease-in-out
                      ${isDimmed ? "opacity-20 blur-sm pointer-events-none" : "opacity-100"}
                      ${isClicked ? "z-[100]" : "z-10"}
                    `}
                    onClick={(e) => handleProductClick(e, product, i)}
                  >
                    <div className="floating-target w-full will-change-transform">
                    {/* IMAGE BLOCK */}
                    <div className={`
                      relative w-full overflow-hidden bg-[#0a0a0a]
                      transition-opacity duration-100 mb-4
                      ${config.aspectClass}
                      ${isClicked ? "opacity-0" : "opacity-100"} 
                    `}>
                      <img
                        ref={(el) => { imageRefs.current[i] = el; }}
                        src={product.image}
                        alt={product.name}
                        loading="eager"
                        decoding="sync"
                        className={`w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-80 grayscale contrast-[1.1] group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-100`}
                      />
                    </div>

                    {/* METADATA BLOCK (Matching Podium.global layout) */}
                    <div className={`flex justify-between items-start transition-opacity duration-300 ${isClicked ? "opacity-0" : "opacity-100"}`}>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white group-hover:text-white transition-colors duration-500 leading-none">
                        {product.name}
                      </h3>
                      <div className="text-right">
                        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors duration-500 mb-0.5">
                          {product.year}
                        </p>
                        <p className="font-bold text-[10px] tracking-[0.1em] uppercase text-white/50 group-hover:text-white transition-colors duration-500">
                          {product.collection || "DAMAGED"}
                        </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-12 lg:px-16 w-full max-w-5xl mx-auto relative z-10 pt-12 pb-32">
          <div className="flex flex-col gap-2">
            <div className="flex border-b border-white/20 pb-4 mb-4 font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase px-4">
              <div className="w-16">ID</div>
              <div className="flex-1">PROJECT</div>
              <div className="flex-1 hidden md:block">CLASSIFICATION</div>
              <div className="w-24 hidden md:block text-right">YEAR</div>
              <div className="w-24 text-right">ACCESS</div>
            </div>
            {products.map((product, i) => (
              <div 
                key={product.id}
                className="group flex items-center border-b border-white/5 py-6 px-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={(e) => handleListClick(e, product)}
              >
                <div className="w-16 font-mono text-xs text-neutral-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 font-black text-lg md:text-2xl uppercase tracking-tighter text-white group-hover:pl-4 transition-all duration-500">
                  {product.name}
                </div>
                <div className="flex-1 hidden md:block font-mono text-[10px] tracking-[0.15em] text-neutral-400">
                  {product.category}
                </div>
                <div className="w-24 hidden md:block font-mono text-[10px] tracking-[0.15em] text-neutral-500 text-right">
                  {product.year}
                </div>
                <div className="w-24 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase border border-white/20 bg-white/10 text-white px-3 py-1.5 rounded-full">
                    VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating View Toggle Widget */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase transition-colors ${
              viewMode === "grid" ? "bg-white text-black" : "text-white/50 hover:text-white"
            }`}
          >
            <LayoutGrid size={12} strokeWidth={2.5} />
            WALL
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase transition-colors ${
              viewMode === "list" ? "bg-white text-black" : "text-white/50 hover:text-white"
            }`}
          >
            <LayoutList size={12} strokeWidth={2.5} />
            INDEX
          </button>
        </div>
      </div>
    </section>
  );
}
