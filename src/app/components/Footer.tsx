import React, { useRef } from 'react';
import { Instagram, Twitter, ArrowRight, ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

// ─── 3D TILT CTA PANEL ───────────────────────────────────────────────────────
function CTAPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="w-full bg-[#0c0c0c] py-28 md:py-40 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Meta ticker row */}
      <div className="flex justify-between items-center mb-10">
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-600">
          WORK WITH US // COLLABORATIONS OPEN
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c00000] animate-pulse" />
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-600">
            ACCEPTING BRIEFS
          </p>
        </div>
      </div>

      {/* 3D Tilt CTA container */}
      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full border border-neutral-800/60 p-8 md:p-16 group cursor-none overflow-hidden"
      >
        {/* Red accent grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#c00000 1px, transparent 1px), linear-gradient(90deg, #c00000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Corner markers */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#c00000]/60" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#c00000]/60" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#c00000]/60" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#c00000]/60" />

        {/* Hover fill animation */}
        <div className="absolute inset-0 bg-[#c00000] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

        {/* CTA text */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2
              className="font-black uppercase leading-none text-white group-hover:text-[#0c0c0c] transition-colors duration-500"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 10rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              LET'S BUILD
              <br />
              <span className="text-[#c00000] group-hover:text-[#0c0c0c] transition-colors duration-500">
                YOUR VISION
              </span>
            </h2>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500 group-hover:text-[#0c0c0c]/60 transition-colors duration-500 mt-6">
              // WORK WITH US // PARTNERSHIPS // EDITORIAL COLLABS //
            </p>
          </div>
          <div className="shrink-0">
            <button className="flex items-center gap-3 bg-white text-black group-hover:bg-[#0c0c0c] group-hover:text-white transition-colors duration-500 px-6 py-4 font-black uppercase tracking-[0.15em] text-xs">
              CONTACT
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="w-full bg-black text-white pointer-events-auto relative z-10 font-sans border-t border-neutral-900 selection:bg-neutral-800">

      {/* ── 3D CTA HERO PANEL ── */}
      <CTAPanel />

      {/* ── LINKS & INFO GRID ── */}
      <div className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-[1400px] mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10 items-start mb-10">

          {/* BRAND LEDGER & NEWSLETTER */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-start">
            <h3 className="text-[11px] font-black tracking-[0.25em] uppercase mb-2 text-white">
              DAMAGED GOODS
            </h3>
            <p className="text-[10px] text-neutral-500 font-normal leading-relaxed mb-4">
              Modern aesthetics through premium design.
            </p>

            <div className="flex gap-4 mb-4 items-center">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter bar */}
            <div className="w-full max-w-[160px]">
              <div className="flex w-full items-center border border-neutral-900 bg-[#0a0a0a] overflow-hidden p-0.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent text-neutral-400 text-[10px] px-2 py-1 focus:outline-none min-w-0 placeholder:text-neutral-700"
                />
                <button className="bg-white text-black text-[9px] font-black tracking-wider uppercase px-2 py-1 hover:bg-neutral-200 transition-colors shrink-0">
                  SUB
                </button>
              </div>
            </div>
          </div>

          {/* COLLECTIONS */}
          <div className="col-span-1">
            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3">COLLECTIONS</p>
            <ul className="space-y-2 text-[10px] text-neutral-500 font-medium">
              {["Outerwear", "Tops", "Bottoms", "Footwear", "Accessories", "Archive"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="col-span-1">
            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3">SUPPORT</p>
            <ul className="space-y-2 text-[10px] text-neutral-500 font-medium">
              {["FAQ", "Shipping & Returns", "Size Guide", "Track Order", "Contact Us"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="col-span-1">
            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3">COMPANY</p>
            <ul className="space-y-2 text-[10px] text-neutral-500 font-medium">
              {["Our Story", "Manifesto", "Philosophy", "Sustainability"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-span-1">
            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3">LEGAL</p>
            <ul className="space-y-2 text-[10px] text-neutral-500 font-medium">
              {["Privacy Policy", "Terms", "Refund"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* LATEST DROP PREVIEW */}
          <div className="col-span-2 md:col-span-1 flex flex-col md:items-end">
            <div className="w-full max-w-[80px] md:ml-auto">
              <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-450 mb-2 md:text-right">LATEST DROP</p>
              <div className="w-full aspect-[4/5] bg-neutral-900 overflow-hidden border border-neutral-950 mb-1.5">
                <img
                  src={products[products.length - 1]?.image || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop"}
                  alt="Drop Snapshot"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
                />
              </div>
              <a href="#" className="text-[9px] font-black tracking-wider text-neutral-300 hover:text-white transition-colors flex items-center gap-0.5 md:justify-end w-full group">
                <span>SHOP</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* UTILITY FOOTER LINE */}
        <div className="border-t border-neutral-950 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] tracking-widest text-neutral-500 uppercase font-medium">
          <div>
            <span className="font-bold text-neutral-400">© 2026 DAMAGED GOODS.</span> ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-neutral-400">ONLINE</span>
            </div>
            <span>WORLDWIDE SHIPPING</span>
            <span className="text-neutral-400 font-bold">IN / INR ▼</span>
          </div>
          <div className="flex items-center gap-3 font-sans text-neutral-600 text-[9px] tracking-normal">
            <span className="text-neutral-500 font-bold">VISA</span>
            <span className="font-bold text-neutral-500">UPI</span>
            <span className="text-neutral-500 font-bold">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}