import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import type { Product } from "./ProductPage";

// (Re-export Product for other files)
export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  colSpan?: string;
  year?: string;
  collection?: string;
  cardType?: "hero" | "portrait" | "feature" | "landscape" | "micro";
}

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
}

export function ProductPage({ product, onBack, onBuyNow }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const { addItem, setIsCartOpen } = useCartStore();

  const handleAcquire = () => {
    const symbol = product.price.startsWith("₹") ? "₹" : "$";
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;

    addItem({
      id: String(product.id),
      name: product.name,
      price: numericPrice,
      quantity: quantity,
      size: selectedSize,
      image: product.image,
      currencySymbol: symbol
    });

    setIsCartOpen(true);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] selection:bg-neutral-800 font-sans antialiased overflow-hidden"
    >
      {/* 1. FLIP Background Image */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover filter contrast-[1.1] brightness-90"
        />
        {/* Dark Vignette / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
      </div>

      {/* 2. Top Header (Return Button) */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-10 flex items-center justify-between pointer-events-none">
        <div className="text-[10px] font-mono text-white/50 tracking-[0.3em] uppercase">
          PROJECT ID // {String(product.id).padStart(3, "0")}
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer group pointer-events-auto mix-blend-difference"
        >
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">RETURN</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 transition-all">
            <X className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 3. Bottom Left Data Cascade */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 w-full md:w-[600px] p-6 md:p-12 z-40 flex flex-col justify-end"
      >
        <motion.div variants={itemVariants} className="mb-6 border-l-2 border-white/20 pl-4">
          <p className="text-[9px] font-mono tracking-[0.3em] text-white/60 uppercase mb-2">
            {product.category} // {product.year || "AW-25"}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-4">
            {product.name}
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md font-medium">
            High-density structural configuration. Engineered with structural hardware components, this artifact maintains fit continuity across extensive lifecycles.
          </p>
        </motion.div>

        {/* Controls Block */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase mb-1">ALLOCATION VALUE</p>
              <div className="text-2xl font-mono font-bold text-white tracking-tight">{product.price !== "$0" ? product.price : "$N/A"}</div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Size Select */}
              <div className="flex bg-black/50 border border-white/10 rounded overflow-hidden">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-[10px] font-mono font-bold transition-all ${
                      selectedSize === size
                        ? "bg-white text-black"
                        : "text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-1 bg-black/50 border border-white/10 rounded p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-[10px] font-mono text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleAcquire}
              disabled={product.price === "$0" || product.price === "$N/A"}
              className="flex-1 flex items-center justify-center gap-3 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase py-4 rounded hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{product.price === "$0" || product.price === "$N/A" ? "ARCHIVED" : "ACQUIRE ALLOCATION"}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
}