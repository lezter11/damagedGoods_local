import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { Footer } from "./Footer";

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  colSpan: string;
}

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

export function ProductPage({ product, onBack }: ProductPageProps) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto"
    >
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium hidden sm:inline">Back</span>
        </motion.button>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/40 font-bold tracking-[0.2em] uppercase text-[11px]"
        >
          DAMAGED GOODS
        </motion.span>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        {/* LEFT: Product image */}
        <div className="relative w-full lg:w-[55%] xl:w-[60%] h-[50vh] sm:h-[60vh] lg:h-screen lg:sticky lg:top-0">
          <motion.div
            layoutId={`product-image-${product.id}`}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 left-6 lg:bottom-auto lg:top-24 lg:left-8"
          >
            <GlassPanel intensity="light" className="px-4 py-1.5 rounded-full">
              <span className="text-xs font-medium text-white tracking-wider uppercase">{product.category}</span>
            </GlassPanel>
          </motion.div>
        </div>

        {/* RIGHT: Product details */}
        <div className="w-full lg:w-[45%] xl:w-[40%] px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12 lg:py-0 flex flex-col justify-center lg:min-h-screen">
          
          <div className="lg:py-28">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">{product.category} / FW26</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-3">
                {product.name}
              </h1>
              <p className="text-3xl sm:text-4xl font-light text-white/70">{product.price}</p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="h-px bg-gradient-to-r from-white/15 to-transparent my-8 origin-left"
            />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">About this piece</h3>
              <p className="text-sm leading-relaxed text-white/50 max-w-md">
                Crafted from premium materials with meticulous attention to detail. 
                Each piece in the Damaged Goods collection is designed to challenge conventions 
                and redefine modern aesthetics. Limited availability — once it's gone, it's gone.
              </p>
            </motion.div>

            {/* Detail chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-3 gap-3 mb-10"
            >
              {[
                { label: "Fit", value: "Relaxed" },
                { label: "Material", value: "Premium" },
                { label: "Season", value: "FW26" },
              ].map((detail) => (
                <div
                  key={detail.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-center"
                >
                  <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/25 mb-1">{detail.label}</p>
                  <p className="text-sm font-medium text-white/75">{detail.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Quantity</span>
              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold text-white w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-3"
            >
              <button className="flex-1 flex items-center justify-center gap-2.5 bg-white text-black font-bold text-sm py-4 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200 group cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </button>
              
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all duration-200 cursor-pointer shrink-0">
                <Heart className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer at the bottom of the product page */}
      <div className="relative z-10 w-full mt-10 lg:mt-0">
        <Footer />
      </div>
    </motion.div>
  );
}
