import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, Heart, Minus, Plus, ShieldCheck, RefreshCw, Truck, Home } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { Footer } from "./Footer";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

// Import modular PDP components
import { ProductGallery } from "./pdp/ProductGallery";
import { ProductInfo } from "./pdp/ProductInfo";
import { ProductVariants } from "./pdp/ProductVariants";
import { ProductAccordion } from "./pdp/ProductAccordion";
import { SimilarProducts } from "./pdp/SimilarProducts";
import { LifestyleGallery } from "./pdp/LifestyleGallery";
import { RecommendedProducts } from "./pdp/RecommendedProducts";

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track active product state to allow switching inside PDP
  const [activeProduct, setActiveProduct] = useState<Product>(product);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem, setIsCartOpen } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: isProductWishlisted } = useWishlistStore();
  const isWishlisted = isProductWishlisted(activeProduct.id);

  // Reset page options and scroll when switching products
  useEffect(() => {
    setActiveProduct(product);
    setSelectedSize("");
    setQuantity(1);
    setIsAdding(false);
    setIsAdded(false);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const handleProductSwitch = (newProduct: Product) => {
    setActiveProduct(newProduct);
    setSelectedSize("");
    setQuantity(1);
    setIsAdding(false);
    setIsAdded(false);
    
    // Smooth scroll page viewport back to top
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    setIsAdding(true);

    // Artificial brief delay for premium loader micro-animation
    await new Promise((resolve) => setTimeout(resolve, 850));

    const symbol = activeProduct.price.startsWith("₹") ? "₹" : "$";
    const numericPrice = parseFloat(activeProduct.price.replace(/[^0-9.]/g, "")) || 0;
    const compositeId = `${activeProduct.id}-${selectedSize}`;

    addItem({
      id: compositeId,
      productId: String(activeProduct.id),
      name: activeProduct.name.toUpperCase(),
      price: numericPrice,
      quantity: quantity,
      size: selectedSize,
      image: activeProduct.image,
      currencySymbol: symbol
    });

    setIsAdding(false);
    setIsAdded(true);

    // Reset added visual flag shortly after
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    setIsCartOpen(true);
  };

  const sizeNotSelected = selectedSize === "";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto selection:bg-neutral-800 font-sans antialiased pdp-scroll-container"
      data-lenis-prevent
    >
      {/* ==================== GLOBAL CONTROLS HEADER ==================== */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 h-16 flex items-center justify-between border-b border-neutral-900/60 bg-black/60 backdrop-blur-md">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">RETURN TO ARCHIVE</span>
        </button>

        <span className="text-white font-black tracking-[0.3em] text-[10px] absolute left-1/2 -translate-x-1/2">
          DAMAGED GOODS
        </span>

        <div className="flex items-center gap-3 sm:gap-4 z-10 pr-4 sm:pr-8 md:pr-10">
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group text-[10px] font-black tracking-[0.2em] uppercase"
            aria-label="Go to home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HOME</span>
          </button>
          
          <span className="text-neutral-800">|</span>

          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group text-[10px] font-black tracking-[0.2em] uppercase"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CART</span>
          </button>
        </div>
      </div>

      {/* ==================== MAIN PAGE CONTAINER ==================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-16">
        
        {/* TOP SPLIT: Images Left, Buy Options Right (50-50 Split on Desktop/Tablets) */}
        <div className="pdp-main-grid">
          
          {/* LEFT HALF: Interactive Gallery (Images) */}
          <div className="w-full">
            <ProductGallery product={activeProduct} />
          </div>

          {/* RIGHT HALF: Buying options (Sticky on Desktop/Tablets) */}
          <div className="pdp-sticky-sidebar space-y-6">
            
            {/* Title, Category, Rating & Shipping Form */}
            <ProductInfo product={activeProduct} />

            {/* Size & Color Choice selectors */}
            <ProductVariants
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            {/* Quantity selection tracker */}
            <div className="space-y-2.5">
              <span className="font-mono text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
                QUANTITY CONFIG //
              </span>
              <div className="flex items-center justify-between bg-[#090909] border border-neutral-900 p-2 rounded-xs">
                <span className="font-mono text-[8.5px] tracking-[0.2em] text-neutral-500 uppercase pl-2 font-bold">
                  LOAD BATCH QUANTITY
                </span>
                <div className="flex items-center gap-2 bg-black border border-neutral-900 p-0.5 rounded-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    type="button"
                    className="w-6.5 h-6.5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold text-white w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    type="button"
                    className="w-6.5 h-6.5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons section */}
            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex gap-2.5">
                <button
                  onClick={sizeNotSelected ? undefined : handleAddToCart}
                  disabled={sizeNotSelected || isAdding}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 font-black text-[9px] tracking-[0.25em] uppercase py-4 transition-all duration-300 font-mono rounded-xs border ${
                    sizeNotSelected
                      ? "bg-neutral-900 text-neutral-500 cursor-not-allowed border-neutral-950"
                      : isAdding
                      ? "bg-[#111] text-[#faf9f5] border-neutral-900 cursor-wait"
                      : "bg-[#faf9f5] text-black hover:bg-[#e6e5df] border-[#faf9f5] cursor-pointer"
                  }`}
                >
                  {isAdding ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>COUPLING ARTIFACT...</span>
                    </span>
                  ) : isAdded ? (
                    <span>✓ ADDED TO ARCHIVE</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{sizeNotSelected ? "CHOOSE MEASUREMENT" : "ADD TO CART"}</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    if (isWishlisted) {
                      removeFromWishlist(activeProduct.id);
                    } else {
                      addToWishlist({
                        id: activeProduct.id,
                        name: activeProduct.name,
                        price: activeProduct.price,
                        category: activeProduct.category,
                        image: activeProduct.image,
                        colSpan: activeProduct.colSpan || "",
                      });
                    }
                  }}
                  type="button"
                  className={`w-13 h-13 flex items-center justify-center bg-black border transition-all cursor-pointer shrink-0 rounded-xs ${
                    isWishlisted
                      ? "text-red-500 border-red-950/40 bg-red-950/5"
                      : "border-neutral-900 text-neutral-500 hover:text-[#c00000] hover:border-neutral-800"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>
              </div>

              <button
                onClick={sizeNotSelected ? undefined : () => onBuyNow(activeProduct, selectedSize, quantity)}
                disabled={sizeNotSelected}
                type="button"
                className={`w-full flex items-center justify-center gap-2 font-black text-[9px] tracking-[0.25em] uppercase py-4 transition-all duration-300 font-mono rounded-xs border ${
                  sizeNotSelected
                    ? "bg-neutral-950 text-neutral-700 cursor-not-allowed border-neutral-950"
                    : "bg-[#c00000] text-white hover:bg-[#ea3423] border-[#c00000] cursor-pointer"
                }`}
              >
                <span>BUY ARTIFACT NOW</span>
              </button>
            </div>

            {/* Trust shipping & vault log details */}
            <div className="space-y-3.5 border-t border-neutral-900/60 pt-6 text-[9.5px] tracking-wide text-neutral-500 font-medium">
              <div className="flex items-center gap-3">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span className="uppercase">COMPLIMENTARY SECURE EXPRESS DELIVERY WORLDWIDE</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                <span className="uppercase">ZERO-FRICTION 14-DAY ARCHIVE EXCHANGES & RETURNS</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span className="uppercase">ENCRYPTED SIGNATURE VAULT SECURE CHECKOUT</span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM FULL-WIDTH: Product description accordions, Campaign galleries, Similar items carousels */}
        <div className="w-full space-y-14 border-t border-neutral-900/60 pt-12">
          
          {/* Detailed features specifications accordion */}
          <div className="max-w-4xl mx-auto">
            <ProductAccordion productName={activeProduct.name} />
          </div>

          {/* Lifestyle campaign photography Lookbook */}
          <LifestyleGallery />

          {/* Horizontal carousel track of similar items */}
          <SimilarProducts
            currentProduct={activeProduct}
            onSelectProduct={handleProductSwitch}
          />

          {/* Customers also loved grid recommendations */}
          <RecommendedProducts
            currentProduct={activeProduct}
            onSelectProduct={handleProductSwitch}
          />
        </div>

      </div>

      {/* ==================== BASE LINEAR FOOTER ==================== */}
      <div className="relative z-10 w-full border-t border-neutral-900">
        <Footer />
      </div>
    </motion.div>
  );
}