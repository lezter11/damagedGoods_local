import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ProductPage, type Product } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { MenuOverlay } from "./components/MenuOverlay";
import { WishlistPage } from "./components/WishlistPage";
import { ProductTransition } from "./components/ProductTransition";
import { ScatterReveal } from "./components/ScatterReveal";
import { OutfitReplica } from "./components/OutfitReplica";
import { PodiumHero } from "../components/dom/PodiumHero";
import { IntroReveal } from "./components/IntroReveal/IntroReveal";
import { CustomCursor } from "./components/CustomCursor";
import { WebGLBackground } from "./components/WebGLBackground";
import { CheckoutModal } from "./components/CheckoutModal";
import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "../store/useUIStore";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";

// GSAP + Lenis Integration Requirements
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', zIndex: 9999, position: 'relative' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const { isMenuOpen, setIsMenuOpen, hoveredProduct } = useUIStore();
  const { isCartOpen, setIsCartOpen, addItem } = useCartStore();
  const { isWishlistOpen, setIsWishlistOpen } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [transitioningProduct, setTransitioningProduct] = useState<Product | null>(null);
  const [transitionOriginRect, setTransitionOriginRect] = useState<DOMRect | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Intro Animation States
  const [isCinematicIntroFinished, setIsCinematicIntroFinished] = useState(false);
  const USE_SCATTER_REVEAL = false; // Flag to toggle animation (disabled for now)
  const USE_PODIUM_HERO = true;
  const [isScatterTriggered, setIsScatterTriggered] = useState(false);
  const [isScatterFinished, setIsScatterFinished] = useState(!USE_SCATTER_REVEAL);
  const [isPodiumFinished, setIsPodiumFinished] = useState(!USE_PODIUM_HERO);

  // Scroll Container Reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Disable browser's native scroll restoration behavior
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // 2. Initialize GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // 4. Synchronize Lenis frames with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 5. Cinematic Scatter Trigger delay
    const timer = setTimeout(() => {
      setIsScatterTriggered(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Sync scroll-lock layout changes when modal menus overlay or intro is playing
  useEffect(() => {
    if (!isCinematicIntroFinished || isMenuOpen || isCartOpen || selectedProduct || isCheckoutOpen || isWishlistOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isCinematicIntroFinished, isMenuOpen, isCartOpen, selectedProduct, isCheckoutOpen, isWishlistOpen]);

  const handleScatterComplete = React.useCallback(() => {
    setIsScatterFinished(true);
  }, []);

  const handleProductSelect = (product: Product, rect?: DOMRect) => {
    if (rect) setTransitionOriginRect(rect);
    setTransitioningProduct(product);
  };

  const isHovered = hoveredProduct !== null;

  return (
    <div
      ref={scrollContainerRef}
      className="selection:bg-white selection:text-black font-sans relative min-h-screen bg-[#050505] text-white transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <WebGLBackground />
      <CustomCursor />

      {!isCinematicIntroFinished && (
        <IntroReveal onComplete={() => setIsCinematicIntroFinished(true)} />
      )}

      {/* FIXED NAVIGATION INTERFACE CONTAINER */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
        <AnimatePresence>
          {isPodiumFinished && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.5 }}
            >
              <Navbar
                onSelectProduct={handleProductSelect}
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
                showLogo={isScatterFinished}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* EXPERIMENTAL LOADING LAYER */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <AnimatePresence>
          {USE_SCATTER_REVEAL && !isScatterFinished && (
            <ScatterReveal
              isTriggered={isScatterTriggered}
              onAnimationComplete={handleScatterComplete}
            />
          )}
        </AnimatePresence>
      </div>

      {/* PODIUM HERO PORTAL */}
      {USE_PODIUM_HERO && !isPodiumFinished && (
        <PodiumHero onComplete={() => {
          setIsPodiumFinished(true);
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        }} />
      )}

      {/* CORE EDITORIAL CONTENT WRAPPER */}
      <div className="relative z-30 w-full flex flex-col">
        {isScatterFinished && isPodiumFinished && (
          <div className="w-full">
            <OutfitReplica 
          onProductClick={handleProductSelect} 
          activeProductId={selectedProduct?.id || transitioningProduct?.id || null}
        />
          </div>
        )}
      </div>

      {/* GLOBAL ROUTING OVERLAYS */}
      <AnimatePresence>
        {selectedProduct && !isCheckoutOpen && (
          <ProductPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onBuyNow={(prod, size, qty) => {
              const symbol = prod.price.startsWith("₹") ? "₹" : "$";
              const numericPrice = parseFloat(prod.price.replace(/[^0-9.]/g, "")) || 0;
              const compositeId = `${prod.id}-${size}`;
              addItem({
                id: compositeId,
                productId: String(prod.id),
                name: prod.name.toUpperCase(),
                price: numericPrice,
                quantity: qty,
                size: size,
                image: prod.image,
                currencySymbol: symbol
              });
              setSelectedProduct(null);
              setIsCheckoutOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartPage 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWishlistOpen && (
          <WishlistPage 
            onClose={() => setIsWishlistOpen(false)} 
            onSelectProduct={(p) => handleProductSelect(p as any)}
          />
        )}
      </AnimatePresence>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {transitioningProduct && (
        <ProductTransition
          product={transitioningProduct}
          originRect={transitionOriginRect}
          onReveal={() => {
            setSelectedProduct(transitioningProduct);
            setTransitioningProduct(null);
            setTransitionOriginRect(null);
          }}
        />
      )}
    </div>
  );
}