import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";
import { ProductPage, type Product } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { MenuOverlay } from "./components/MenuOverlay";
import { ProductTransition } from "./components/ProductTransition";
import { ScatterReveal } from "./components/ScatterReveal";
import { OutfitReplica } from "./components/OutfitReplica";
import { CustomCursor } from "./components/CustomCursor";
import { WebGLBackground } from "./components/WebGLBackground";
import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "../store/useUIStore";
import { useCartStore } from "../store/useCartStore";

export default function App() {
  const { isMenuOpen, setIsMenuOpen, hoveredProduct } = useUIStore();
  const { isCartOpen, setIsCartOpen } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [transitioningProduct, setTransitioningProduct] = useState<Product | null>(null);

  // Animation States
  const [isScatterTriggered, setIsScatterTriggered] = useState(false);
  const [isScatterFinished, setIsScatterFinished] = useState(false);

  useEffect(() => {
    // Disable browser's automatic scroll restoration on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Always start at the very top for the cinematic experience
    window.scrollTo(0, 0);

    // Trigger scatter animation immediately after mount
    const timer = setTimeout(() => {
      setIsScatterTriggered(true);
    }, 100); 
    
    return () => clearTimeout(timer);
  }, []);

  const handleScatterComplete = React.useCallback(() => {
    setIsScatterFinished(true);
  }, []);
  
  const handleProductSelect = (product: Product) => {
    setTransitioningProduct(product);
  };

  const isHovered = hoveredProduct !== null;

  return (
    <div className={`text-black selection:bg-red selection:text-white font-sans relative min-h-screen transition-colors duration-700 ease-out ${
      isHovered ? "bg-[#ff0001] text-white" : "bg-cream text-black"
    }`}>
      <WebGLBackground />
      <CustomCursor />
      
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
        <Navbar
          onSelectProduct={handleProductSelect}
          onCartClick={() => setIsCartOpen(true)}
          onMenuClick={() => setIsMenuOpen(true)}
          showLogo={isScatterFinished}
        />
      </div>

      {/* OVERLAY SCATTER REVEAL */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <AnimatePresence>
          {!isScatterFinished && (
            <ScatterReveal 
              isTriggered={isScatterTriggered} 
              onAnimationComplete={handleScatterComplete} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* LAYER 3: OUTFIT REPLICA */}
      <div className="relative z-30 min-h-screen flex flex-col">
        <AnimatePresence>
          {isScatterFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="w-full"
            >
              <OutfitReplica onProductClick={handleProductSelect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductPage
            key={selectedProduct.id}
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartPage onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {transitioningProduct && (
        <ProductTransition 
          onReveal={() => {
            setSelectedProduct(transitioningProduct);
            setTransitioningProduct(null);
          }}
        />
      )}
    </div>
  );
}
