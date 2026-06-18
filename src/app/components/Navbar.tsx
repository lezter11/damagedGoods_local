"use client";

import React, { useState, useRef, useEffect } from "react";
import { GlassPanel } from "./GlassPanel";
import { ShoppingBag, Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";

interface NavbarProps {
  onSearchClick?: () => void;
  onSelectProduct?: (product: Product) => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  showLogo?: boolean;
}

export function Navbar({ onSearchClick, onSelectProduct, onCartClick, onMenuClick, showLogo = true }: NavbarProps) {
  const navLinks = ["Collection", "Drops", "About", "Orders"];
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-focus when search opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSearchOpen]);

  // Close when clicking outside
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

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  const handleCategoryClick = (cat: string) => {
    setQuery(cat);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60"
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
              
              {/* LEFT SECTION */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
                <button 
                  onClick={onMenuClick}
                  className="flex items-center justify-center focus:outline-none cursor-pointer"
                >
                  <Menu className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 hover:text-red transition-colors" strokeWidth={1.5} />
                </button>
                <AnimatePresence mode="wait">
                  {!isSearchOpen && showLogo && (
                    <motion.div
                      layoutId="brand-text"
                      layout
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-black font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase text-[10px] sm:text-[11px] md:text-[13px] whitespace-nowrap cursor-pointer z-50 relative"
                    >
                      DAMAGED GOODS
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CENTER: Search input (when open) OR nav links (when closed) */}
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, width: "30%" }}
                    animate={{ opacity: 1, width: "60%" }}
                    exit={{ opacity: 0, width: "30%" }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-1/2 -translate-x-1/2 flex items-center"
                  >
                    <div className="relative w-full flex items-center bg-white/[0.06] rounded-full px-4 py-1.5 border border-white/[0.08]">
                      <Sparkles className="w-3.5 h-3.5 text-black/30 mr-2.5 shrink-0" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Damaged Goods..."
                        className="w-full bg-transparent border-none outline-none text-black text-[13px] font-medium placeholder:text-black/30 caret-white/60"
                      />
                      {query && (
                        <button
                          onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                          className="text-black/30 hover:text-red/60 transition-colors cursor-pointer ml-2 shrink-0"
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
                            className="absolute inset-0 bg-white/10 rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 transition-all duration-300 ${
                          hoveredLink === link 
                            ? "text-black drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
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

              {/* RIGHT SECTION */}
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
                      className="flex items-center justify-center focus:outline-none cursor-pointer w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
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
                      className="flex items-center justify-center focus:outline-none cursor-pointer"
                    >
                      <Search className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 hover:text-red transition-colors" strokeWidth={1.5} />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={onCartClick}
                  className="relative flex items-center justify-center group focus:outline-none cursor-pointer"
                >
                  <ShoppingBag className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-black/80 group-hover:text-red transition-colors" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-2 flex h-[14px] sm:h-[15px] min-w-[14px] sm:min-w-[15px] items-center justify-center rounded-full bg-white text-black text-[9px] sm:text-[10px] font-bold px-0.5 sm:px-1">
                    2
                  </span>
                </button>
              </div>

            </div>
          </GlassPanel>

          {/* ========== DROPDOWN PANEL (Cosmos-style) ========== */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="overflow-hidden"
              >
                <div className="bg-[#161616]/95 border border-white/[0.06] border-t-0 rounded-b-2xl sm:rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-h-[65vh] overflow-y-auto">
                  <div className="px-5 sm:px-6 md:px-8 py-5 sm:py-6">
                    
                    {query.trim() === "" ? (
                      /* ===== DEFAULT STATE: Trending + Categories ===== */
                      <>
                        {/* Trending */}
                        <div className="mb-6">
                          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/35 mb-3">Trending</p>
                          <div className="flex flex-wrap gap-2">
                            {trendingTags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-black/60 text-xs font-medium hover:bg-white/[0.08] hover:text-red/90 hover:border-white/[0.15] transition-all cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3 -rotate-45" />
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Categories */}
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/35 mb-3">Categories</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {categories.map((cat) => (
                              <button
                                key={cat.name}
                                onClick={() => handleCategoryClick(cat.name)}
                                className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all cursor-pointer"
                              >
                                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-[#1a1a1a]">
                                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-xs font-medium text-black/60 group-hover:text-red/90 transition-colors">{cat.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* ===== SEARCH RESULTS ===== */
                      <>
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/35 mb-3">
                          {filtered.length} {filtered.length === 1 ? "result" : "results"}
                        </p>

                        {filtered.length === 0 ? (
                          <div className="text-center py-10">
                            <p className="text-black/30 text-sm">No products found for "{query}"</p>
                            <p className="text-black/15 text-xs mt-1">Try a different search term</p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {filtered.map((product, index) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04, duration: 0.25 }}
                                onClick={() => handleSelect(product)}
                                className="group flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
                              >
                                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#1a1a1a]">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-400"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-black/30">{product.category}</p>
                                  <h4 className="text-sm font-semibold text-black/85 truncate">{product.name}</h4>
                                </div>
                                <span className="text-xs font-medium text-black/40 shrink-0">{product.price}</span>
                                <div className="shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ArrowRight className="w-3 h-3 text-black/60" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </>
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