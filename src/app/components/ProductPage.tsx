import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, Heart, Minus, Plus, ShieldCheck, RefreshCw, Truck } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { Footer } from "./Footer";
import { useCartStore } from "../../store/useCartStore";

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
  onBuyNow: (product: Product, size: string, quantity: number) => void;
}

export function ProductPage({ product, onBack, onBuyNow }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const { addItem, setIsCartOpen } = useCartStore();

  const handleAddToCart = () => {
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

  // Alternate perspective placeholders for luxury layout depth
  const detailThumbnails = [
    product.image,
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=600&auto=format&fit=crop"
  ];

  const [activeImage, setActiveImage] = useState(product.image);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto selection:bg-neutral-800 font-sans antialiased"
    >
      {/* ==================== GLOBAL CONTROLS HEADER ==================== */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 h-16 flex items-center justify-between border-b border-neutral-900/60 bg-black/60 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">RETURN TO ARCHIVE</span>
        </button>

        <span className="text-white font-black tracking-[0.3em] text-[10px] absolute left-1/2 -translate-x-1/2">
          DAMAGED GOODS
        </span>

        <div className="text-[9px] font-mono text-neutral-500 tracking-wider">
          SERIES // DROP_07
        </div>
      </div>

      {/* ==================== MAIN PRODUCT DISPLAY STAGE ==================== */}
      <div className="min-h-screen flex flex-col lg:flex-row pt-16">
        
        {/* LEFT COLUMN: Dual-Axis Asset Explorer Panel */}
        <div className="w-full lg:w-[58%] xl:w-[62%] flex flex-col-reverse md:flex-row gap-4 p-4 sm:p-6 lg:p-8 bg-black border-b lg:border-b-0 lg:border-r border-neutral-900">
          
          {/* Vertical Grid Selection Track */}
          <div className="flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {detailThumbnails.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(thumb)}
                className={`w-14 h-18 sm:w-16 sm:h-20 bg-neutral-950 border rounded overflow-hidden transition-all duration-300 shrink-0 ${
                  activeImage === thumb ? "border-white" : "border-neutral-900 opacity-40 hover:opacity-100"
                }`}
              >
                <img src={thumb} alt="Perspective index" className="w-full h-full object-cover filter contrast-[1.02]" />
              </button>
            ))}
          </div>

          {/* Master Display Port */}
          <div className="w-full aspect-[4/5] lg:h-[82vh] lg:aspect-auto bg-neutral-950 border border-neutral-900 rounded overflow-hidden relative">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="w-full h-full"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover filter contrast-[1.03] brightness-95 transition-all duration-500"
              />
            </motion.div>

            <div className="absolute bottom-4 left-4">
              <GlassPanel intensity="light" className="px-2.5 py-1 rounded-xs border border-white/5">
                <span className="text-[8px] font-black text-white tracking-[0.2em] uppercase">{product.category}</span>
              </GlassPanel>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Premium Commercial Workspace Ledger */}
        <div className="w-full lg:w-[42%] xl:w-[38%] px-4 sm:px-8 lg:px-12 py-8 lg:py-12 flex flex-col justify-between bg-black">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            
            {/* Context Titles */}
            <div className="mb-4">
              <div className="text-[9px] font-black tracking-[0.25em] text-neutral-500 uppercase flex items-center gap-2 mb-1">
                <span>AUTHENTIC PIECE</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                <span>{product.category}</span>
              </div>
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-black text-white tracking-tight uppercase leading-tight">
                {product.name}
              </h1>
              <div className="text-lg font-mono font-bold text-neutral-300 mt-1">{product.price}</div>
            </div>

            <div className="h-[1px] bg-neutral-900 my-5" />

            {/* Description Specification */}
            <div className="mb-6">
              <h4 className="text-[8px] font-black tracking-[0.2em] text-neutral-500 uppercase mb-1.5">SPECIFICATIONS</h4>
              <p className="text-[11px] leading-relaxed text-neutral-400 font-medium">
                High-density structural configuration. Tailored silhouette built with reinforced micro-stitching. Engineered with structural hardware components, this artifact maintains fit continuity across extensive lifecycles.
              </p>
            </div>

            {/* SIZING METRIC SYSTEM CONTROLS */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <h4 className="text-[8px] font-black tracking-[0.2em] text-neutral-500 uppercase">SELECT SIZE</h4>
                <button className="text-[8px] font-bold text-neutral-400 underline tracking-wider uppercase hover:text-white">SIZE MATRIX</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-[10px] font-mono font-bold rounded tracking-widest border transition-all ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-neutral-400 border-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY MANAGER SELECTION BLOCK */}
            <div className="flex items-center justify-between mb-6 bg-[#090909] border border-neutral-900 p-2 rounded">
              <span className="text-[8px] font-black tracking-[0.2em] text-neutral-400 uppercase pl-1">ORDER QUANTITY</span>
              <div className="flex items-center gap-2 bg-black border border-neutral-900 rounded p-0.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 h-5 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="text-[10px] font-mono font-bold text-white w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-5 h-5 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* ADD TO CART & BUY NOW ACTION PLATFORM */}
            <div className="flex flex-col gap-2.5 mb-8">
              <div className="flex gap-2">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-black text-[10px] tracking-widest uppercase py-3 rounded hover:bg-neutral-200 transition-colors group cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>SECURE ARCHIVE PIECE</span>
                </button>
                
                <button className="w-11 h-11 flex items-center justify-center rounded bg-[#090909] border border-neutral-900 text-neutral-500 hover:text-red-500 hover:border-red-950/40 hover:bg-red-950/20 transition-all cursor-pointer shrink-0">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <button 
                onClick={() => onBuyNow(product, selectedSize, quantity)}
                className="w-full flex items-center justify-center gap-2 bg-[#c00000] text-white font-black text-[10px] tracking-widest uppercase py-3 rounded hover:bg-[#ea3423] transition-colors cursor-pointer"
              >
                <span>BUY IT NOW</span>
              </button>
            </div>

            {/* TRUST TRUSTED LEDGER UTILITIES */}
            <div className="space-y-2.5 border-t border-neutral-900/60 pt-5 text-[9px] tracking-wide text-neutral-500 font-medium">
              <div className="flex items-center gap-2.5">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Complimentary Express Tracked Shipping Worldwide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                <span>Zero-Friction 14-Day Returns & Exchanges Assured</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Encrypted Signature Vault Secure Checkout Protections</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* ==================== LINEAR FOOTER BASE BOUNDARY ==================== */}
      <div className="relative z-10 w-full mt-12 lg:mt-0">
        <Footer />
      </div>
    </motion.div>
  );
}