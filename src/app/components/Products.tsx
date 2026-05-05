import React from "react";
import { motion, useTransform, MotionValue } from "motion/react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

const products = [
  {
    id: 1,
    name: "Aetherial Shell",
    price: "$450",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1764787016268-31d48b3978f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-7",
  },
  {
    id: 2,
    name: "Phase Shift Cargo",
    price: "$280",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1768489038056-85fa62638335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-5",
  },
  {
    id: 3,
    name: "Void Walkers",
    price: "$320",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-5",
  },
  {
    id: 4,
    name: "Synapse Base Layer",
    price: "$150",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1765445665914-918f669a6205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-7",
  },
];

interface ProductsProps {
  scrollProgress: MotionValue<number>;
}

export function Products({ scrollProgress }: ProductsProps) {
  // Products fade in and scale up slightly as the jacket opens
  const opacity = useTransform(scrollProgress, [0.15, 0.4], [0, 1]);
  const scale = useTransform(scrollProgress, [0.15, 0.4], [0.95, 1]);
  const y = useTransform(scrollProgress, [0.15, 0.4], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, scale, y }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 min-h-screen flex flex-col justify-center"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
        <div>
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/50 mb-2">FW26 Drop</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">THE ARCHIVE</h3>
        </div>
        <button className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors pb-2 border-b border-white/20 hover:border-white">
          <span className="text-sm font-medium">View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`${product.colSpan} group relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer`}
          >
            {/* Image */}
            <div className="absolute inset-0 bg-[#1a1a1a]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <GlassPanel intensity="light" className="px-4 py-1.5 rounded-full">
                  <span className="text-xs font-medium text-white">{product.category}</span>
                </GlassPanel>
                
                <GlassPanel intensity="light" className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </GlassPanel>
              </div>
              
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-bold text-white mb-1">{product.name}</h4>
                <p className="text-white/70 font-medium">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
