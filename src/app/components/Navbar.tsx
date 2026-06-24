import React, { useState, useEffect, useRef } from "react";
import { GlassPanel } from "./GlassPanel";
import { ShoppingBag, Search, Menu, X, ArrowRight, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

interface NavbarProps {
  onSearchClick?: () => void;
  onSelectProduct?: (product: Product) => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  showLogo?: boolean;
}

export function Navbar({ onSelectProduct, onCartClick, onMenuClick, showLogo = true }: NavbarProps) {
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { items: wishlistItems, setIsWishlistOpen } = useWishlistStore();

  const navLinks = ["Collection", "Drops", "About", "Orders"];
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-focus search input field when view states switch active
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Escape sequence validation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSearchOpen]);

  // Blur focus and clear bounds on layout target escape action click away
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  const filtered = query.trim() === ""
    ? products
    : products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

  const trendingTags = ["streetwear", "outerwear", "cargo pants", "new drops"];
  const categories = [
    { name: "Outerwear", image: products[0]?.image },
    { name: "Bottoms", image: products[1]?.image },
    { name: "Footwear", image: products[2]?.image },
    { name: "Tops", image: products[3]?.image },
  ];

  const handleSelect = (product: Product) => {
    onSelectProduct?.(product);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Backdrop Dim Layer */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 sm:top-6 md:top-8 left-0 w-full z-50 flex justify-center px-2 sm:px-4 pointer-events-auto"
        ref={dropdownRef}
      >
        <div className="w-full max-w-6xl">
          <GlassPanel className={`w-full h-[50px] sm:h-[56px] md:h-[60px] ${isSearchOpen ? 'rounded-t-2xl sm:rounded-t-3xl' : 'rounded-full'} transition-all duration-300`}>
            <div className="relative flex flex-row items-center justify-between w-full h-full px-3 sm:px-4 md:px-6">

              {/* LEFT ACTIONS AREA */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
                <button
                  onClick={onMenuClick}
                  className="flex items-center justify-center focus:outline-none cursor-pointer p-1 rounded-full hover:bg-black/5 transition-colors"
                >
                  <Menu className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 hover:text-black transition-colors" strokeWidth={1.5} />
                </button>
                <AnimatePresence mode="wait">
                  {!isSearchOpen && showLogo && (
                    <motion.div
                      layoutId="brand-text"
                      layout
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-black font-black tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase text-[10px] sm:text-[11px] md:text-[13px] whitespace-nowrap cursor-pointer z-50 relative"
                    >
                      Damaged Goods
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CENTER DISPLAY LOGIC LAYER */}
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, width: "30%" }}
                    animate={{ opacity: 1, width: "60%" }}
                    exit={{ opacity: 0, width: "30%" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 flex items-center"
                  >
                    <div className="relative w-full flex items-center bg-black/5 rounded-full px-4 py-1.5 border border-black/5">
                      <Sparkles className="w-3.5 h-3.5 text-black/40 mr-2.5 shrink-0" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Damaged Goods..."
                        className="w-full bg-transparent border-none outline-none text-black text-[13px] font-medium placeholder:text-black/30 caret-black"
                      />
                      {query && (
                        <button
                          onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                          className="text-black/30 hover:text-black transition-colors cursor-pointer ml-2 shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="nav-links"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-row items-center gap-1"
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {navLinks.map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onMouseEnter={() => setHoveredLink(link)}
                        className="relative px-4 py-2 text-[13px] tracking-wide font-medium whitespace-nowrap transition-colors duration-300"
                      >
                        {hoveredLink === link && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-black/5 rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 transition-all duration-300 ${hoveredLink === link
                          ? "text-black"
                          : hoveredLink !== null
                            ? "text-black/30"
                            : "text-black/80"
                          }`}>
                          {link}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RIGHT ACTIONS BLOCK */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                    <motion.button
                      key="close-btn"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-center focus:outline-none cursor-pointer w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-black/80" />
                    </motion.button>
                  ) : (
                    <motion.button
                      key="search-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setIsSearchOpen(true)}
                      className="flex items-center justify-center focus:outline-none cursor-pointer p-1 rounded-full hover:bg-black/5 transition-colors"
                    >
                      <Search className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 hover:text-black transition-colors" strokeWidth={1.5} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <button
                  onClick={onCartClick}
                  className="relative flex items-center justify-center group focus:outline-none cursor-pointer p-1 rounded-full hover:bg-black/5 transition-colors"
                >
                  <ShoppingBag className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 group-hover:text-black transition-colors" strokeWidth={1.5} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black text-white text-[8px] font-black px-1 animate-scaleIn">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative flex items-center justify-center group focus:outline-none cursor-pointer p-1 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Open wishlist"
                >
                  <Heart className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 group-hover:text-black transition-colors" strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black text-white text-[8px] font-black px-1 animate-scaleIn">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              </div>

            </div>
          </GlassPanel>

          {/* DYNAMIC SEARCH MATRIX RESULTS OVERLAY */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="overflow-hidden"
              >
                <div className="bg-[#121212] border border-neutral-900 border-t-0 rounded-b-2xl sm:rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[65vh] overflow-y-auto">
                  <div className="px-5 sm:px-6 md:px-8 py-6">

                    {query.trim() === "" ? (
                      <div className="space-y-6">
                        {/* Trending Section */}
                        <div>
                          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-neutral-500 mb-3">TRENDING SEARCHES</p>
                          <div className="flex flex-wrap gap-2">
                            {trendingTags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-950 border border-neutral-900 text-neutral-400 text-[11px] font-bold hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3 -rotate-45 text-neutral-600" />
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Top Categories Grid */}
                        <div>
                          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-neutral-500 mb-3">ARCHIVE CATEGORIES</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {categories.map((cat) => (
                              <button
                                key={cat.name}
                                onClick={() => setQuery(cat.name)}
                                className="group flex items-center gap-3 p-2 rounded bg-neutral-950 border border-neutral-900 hover:bg-neutral-900 hover:border-neutral-700 transition-all cursor-pointer text-left"
                              >
                                <div className="w-9 h-9 rounded bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800">
                                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity filter contrast-[1.05]" />
                                </div>
                                <span className="text-[11px] font-bold text-neutral-400 group-hover:text-white transition-colors">{cat.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[9px] font-black tracking-[0.2em] uppercase text-neutral-500 mb-3">
                          {filtered.length} {filtered.length === 1 ? "RESULT" : "RESULTS"} FOUND FOR &ldquo;{query.toUpperCase()}&rdquo;
                        </p>

                        {filtered.length === 0 ? (
                          <div className="text-center py-12 border border-dashed border-neutral-900 rounded">
                            <p className="text-neutral-500 text-[12px] font-medium">No results cataloged for choice parameters.</p>
                            <p className="text-neutral-600 text-[10px] font-mono mt-1">Check query syntax parameters or reference alternate specs.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5">
                            {filtered.map((product, index) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.2 }}
                                onClick={() => handleSelect(product)}
                                className="group flex items-center gap-4 p-2.5 rounded bg-neutral-950 border border-neutral-900 hover:bg-neutral-900 hover:border-neutral-700 transition-all cursor-pointer"
                              >
                                <div className="w-11 h-11 rounded bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[8px] font-mono font-bold tracking-[0.1em] text-neutral-600 uppercase">{product.category}</p>
                                  <h4 className="text-[12px] font-bold text-neutral-300 truncate group-hover:text-white transition-colors">{product.name}</h4>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-neutral-400 mr-2">{product.price}</span>
                                <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-800">
                                  <ArrowRight className="w-3 h-3 text-white" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}