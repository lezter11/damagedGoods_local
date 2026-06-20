import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { Product } from "./ProductPage";
import { useCartStore } from "../../store/useCartStore";

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
}

export function ProductDrawer({ product, isOpen, onClose, onBuyNow }: ProductDrawerProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [displayProduct, setDisplayProduct] = useState<Product | null>(null);
  const { addItem, setIsCartOpen } = useCartStore();

  useEffect(() => {
    if (product) {
      setDisplayProduct(product);
      setActiveImage(product.image);
      setQuantity(1);
      setSelectedSize("M");
    }
  }, [product]);

  const currentProduct = product || displayProduct;

  if (!currentProduct) return null;

  const detailThumbnails = [
    currentProduct.image,
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=600&auto=format&fit=crop"
  ];

  const handleAddToCart = () => {
    const symbol = currentProduct.price.startsWith("₹") ? "₹" : "$";
    const numericPrice = parseFloat(currentProduct.price.replace(/[^0-9.]/g, "")) || 0;
    
    // BUILD COMPOSITE MAPPING KEY (productId-size)
    const compositeId = `${currentProduct.id}-${selectedSize}`;

    addItem({
      id: compositeId,
      productId: String(currentProduct.id),
      name: currentProduct.name.toUpperCase(),
      price: numericPrice,
      quantity: quantity,
      size: selectedSize,
      image: currentProduct.image,
      currencySymbol: symbol
    });

    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[350] flex justify-end font-mono overflow-hidden selection:bg-[#c00000]/30 selection:text-white">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xs"
          />

          {/* Drawer Panel Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="relative w-full sm:w-[580px] md:w-[650px] h-[100dvh] bg-[#0c0c0c] text-[#faf9f5] border-l border-neutral-900 shadow-2xl flex flex-col justify-between overflow-hidden z-10"
          >
            {/* BRAND TECHNICAL PANEL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-900 bg-[#0c0c0c] shrink-0 font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
              <span>[ ANTIGRAVITY SPEC // REGISTRATION_ID_{currentProduct.id} ]</span>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 bg-[#111111] border border-neutral-900 rounded-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* SCROLLABLE DATA LEDGER BODY */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 hide-scrollbar">
              
              {/* DYNAMIC ASYMMETRICAL IMAGE RAIL */}
              <div className="flex gap-4">
                {/* Viewports Miniature Rail */}
                <div className="flex flex-col gap-2 shrink-0">
                  {detailThumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(thumb)}
                      className={`w-14 h-18 bg-black border rounded-none overflow-hidden transition-all duration-300 shrink-0 ${
                        activeImage === thumb
                          ? "border-[#c00000]"
                          : "border-neutral-900 opacity-40 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`ANGLE_${idx + 1}`}
                        className="w-full h-full object-cover filter contrast-[1.02] brightness-90"
                      />
                    </button>
                  ))}
                </div>

                {/* Primary Hero Stage */}
                <div className="flex-1 aspect-[4/5] bg-black border border-neutral-900 rounded-none overflow-hidden relative">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <img
                      src={activeImage}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover filter contrast-[1.02] brightness-95"
                    />
                  </motion.div>
                  <div className="absolute bottom-4 left-4 font-mono text-[8px] bg-[#0c0c0c] px-3 py-1.5 tracking-[0.2em] border border-neutral-900 uppercase">
                    CATEGORY // {currentProduct.category}
                  </div>
                </div>
              </div>

              {/* SPECIFICATION INDEX */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-neutral-900 pb-4">
                  <h1 className="text-lg font-black uppercase tracking-[0.1em] text-[#faf9f5] leading-tight">
                    {currentProduct.name}
                  </h1>
                  <span className="font-mono text-base font-bold text-[#c00000] tracking-widest shrink-0 ml-4">
                    {currentProduct.price}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
                    ARCHIVE PARAMETERS //
                  </span>
                  <p className="text-[10px] leading-relaxed text-neutral-400 tracking-wider">
                    REINFORCED COTTON BLEND SHELL COATED WITH INDUSTRIAL RESISTANCE MEMBRANE. MONOCHROMATIC UTILITY STITCHES THROUGHOUT.
                  </p>
                </div>
              </div>

              {/* GARMENT DIMENSION GRID */}
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[8px] text-neutral-500 tracking-[0.25em] uppercase">
                  <span>GARMENT SIZING SPEC</span>
                  <span className="underline hover:text-[#faf9f5] cursor-pointer transition-colors">SIZE MATRIX</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-[10px] font-mono font-bold rounded-none tracking-widest border transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#faf9f5] text-black border-[#faf9f5]"
                          : "bg-transparent text-neutral-400 border-neutral-900 hover:border-neutral-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY STEPPER MULTIPLIER */}
              <div className="space-y-3">
                <span className="font-mono text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
                  QUANTITY MULTIPLIER //
                </span>
                <div className="flex items-center justify-between bg-[#0c0c0c] border border-neutral-900 p-2 rounded-none">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-neutral-400 uppercase pl-2">
                    LOAD BATCH COUNT
                  </span>
                  <div className="flex items-center gap-2.5 bg-black border border-neutral-900 rounded-none p-0.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6.5 h-6.5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-white w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6.5 h-6.5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TWO-TIER TRANSACTION ENGINE */}
            <div className="p-6 bg-[#0c0c0c] border-t border-neutral-900 space-y-3 shrink-0 font-mono">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#faf9f5] text-black font-black text-[9px] tracking-[0.25em] uppercase py-4 rounded-none hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  <span>ADD TO SHOPPING BAG</span>
                </button>
                <button className="w-13 h-13 flex items-center justify-center bg-black border border-neutral-900 text-neutral-500 hover:text-[#c00000] hover:border-neutral-800 transition-all cursor-pointer shrink-0 rounded-none">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onBuyNow(currentProduct, selectedSize, quantity)}
                className="w-full flex items-center justify-center gap-2 bg-[#c00000] text-white font-black text-[9px] tracking-[0.25em] uppercase py-4 rounded-none hover:bg-[#ea3423] transition-all cursor-pointer"
              >
                <span>BUY IT NOW // EXPRESS GATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}