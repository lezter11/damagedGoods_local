import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Product } from "../ProductPage";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  // Generate multi-images for the active product
  const getGalleryImages = (prod: Product) => {
    // Streetwear & editorial aesthetic images matching the drop
    const imagesMap: Record<number, string[]> = {
      1: [
        prod.image,
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
      ],
      2: [
        prod.image,
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
      ],
      3: [
        prod.image,
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop"
      ],
      4: [
        prod.image,
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
      ],
      5: [
        prod.image,
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"
      ],
      6: [
        prod.image,
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop"
      ]
    };
    return imagesMap[prod.id] || [
      prod.image,
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=600&auto=format&fit=crop"
    ];
  };

  const images = getGalleryImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Reset index when product changes
  useEffect(() => {
    setActiveIndex(0);
    setIsZoomed(false);
  }, [product]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Desktop Vertical Thumbnail Rail (hidden on mobile, visible md+) */}
      <div className="hidden md:flex flex-col gap-3 shrink-0 w-16">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-16 h-20 bg-neutral-950 border transition-all duration-300 relative group overflow-hidden ${
              activeIndex === idx
                ? "border-white scale-[1.04]"
                : "border-neutral-900 opacity-40 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`ANGLE_${idx + 1}`}
              className="w-full h-full object-cover filter contrast-[1.02] brightness-90 transition-all duration-300"
            />
            {activeIndex === idx && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Primary Display Stage */}
      <div className="flex-1 relative aspect-[4/5] bg-neutral-950 border border-neutral-900 overflow-hidden group/stage">
        {/* Mobile Swipe / Drag Motion Area */}
        <div className="w-full h-full relative select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full cursor-zoom-in relative overflow-hidden"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={images[activeIndex]}
                alt={`${product.name} - View ${activeIndex + 1}`}
                style={
                  isZoomed
                    ? {
                        transform: "scale(1.7)",
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        transition: "transform 0.08s ease-out",
                      }
                    : {
                        transform: "scale(1.0)",
                        transition: "transform 0.3s ease-out",
                      }
                }
                className="w-full h-full object-contain filter contrast-[1.02] brightness-95"
              />
            </motion.div>
          </AnimatePresence>

          {/* Lens-free hover scale visual indicator */}
          {!isZoomed && (
            <div className="absolute top-4 right-4 bg-black/60 border border-neutral-900/80 px-2 py-1 flex items-center gap-1.5 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300 text-[8px] font-mono text-neutral-400 tracking-wider">
              <ZoomIn className="w-3 h-3" />
              <span>HOVER TO DETAIL ZOOM</span>
            </div>
          )}

          {/* Category Overlay Tag */}
          <div className="absolute bottom-4 left-4 font-mono text-[8px] bg-black/85 px-3 py-1.5 tracking-[0.25em] border border-neutral-900/60 uppercase text-neutral-400 pointer-events-none">
            {product.category} // ANGLE 0{activeIndex + 1}
          </div>
        </div>

        {/* Navigation Arrows for Mobile & quick click */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/80 border border-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center opacity-0 group-hover/stage:opacity-100 focus:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/80 border border-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center opacity-0 group-hover/stage:opacity-100 focus:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Mobile-only horizontal dots indicators (hidden on md+) */}
        <div className="absolute bottom-4 right-4 flex gap-1.5 md:hidden bg-black/60 px-2 py-1 border border-neutral-900/40 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? "bg-white w-3" : "bg-neutral-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
