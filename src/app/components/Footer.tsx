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
      <div className="px-4 sm:px-6 md:px-8 py-10 max-w-[1400px] mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-8 items-start mb-8">

          {/* BRAND LEDGER & NEWSLETTER */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-start">
            <h3 className="text-[10px] font-black tracking-[0.25em] uppercase mb-1.5 text-white">
              DAMAGED GOODS
            </h3>
            <p className="text-[9px] text-neutral-500 font-normal leading-[1.4] mb-3">
              Modern aesthetics through premium design.
            </p>

            <div className="flex gap-3 mb-3 items-center">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Instagram className="w-3 h-3" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <Twitter className="w-3 h-3" />
              </a>
            </div>

            {/* Newsletter bar */}
            <div className="w-full max-w-[160px]">
              <div className="flex w-full items-center border border-neutral-900 bg-[#0a0a0a] overflow-hidden p-0.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent text-neutral-400 text-[9px] px-1.5 py-0.5 focus:outline-none min-w-0 placeholder:text-neutral-700"
                />
                <button className="bg-white text-black text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 hover:bg-neutral-200 transition-colors shrink-0">
                  SUB
                </button>
              </div>
            </div>
          </div>

          {/* COLLECTIONS */}
          <div className="col-span-1">
            <p className="text-[8px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-2">COLLECTIONS</p>
            <ul className="space-y-1 text-[9px] text-neutral-500 font-medium">
              {["Outerwear", "Tops", "Bottoms", "Footwear", "Accessories", "Archive"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="col-span-1">
            <p className="text-[8px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-2">SUPPORT</p>
            <ul className="space-y-1 text-[9px] text-neutral-500 font-medium">
              {["FAQ", "Shipping & Returns", "Size Guide", "Track Order", "Contact Us"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="col-span-1">
            <p className="text-[8px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-2">COMPANY</p>
            <ul className="space-y-1 text-[9px] text-neutral-500 font-medium">
              {["Our Story", "Manifesto", "Philosophy", "Sustainability"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-span-1">
            <p className="text-[8px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-2">LEGAL</p>
            <ul className="space-y-1 text-[9px] text-neutral-500 font-medium">
              {["Privacy Policy", "Terms", "Refund"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* LATEST DROP PREVIEW */}
          <div className="col-span-1 flex flex-col md:items-end">
            <div className="w-full max-w-[70px] md:ml-auto">
              <p className="text-[8px] font-black tracking-[0.15em] uppercase text-neutral-500 mb-1.5 md:text-right">LATEST DROP</p>
              <div className="w-full aspect-[4/5] bg-neutral-900 overflow-hidden border border-neutral-950 mb-1">
                <img
                  src={products[products.length - 1]?.image || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop"}
                  alt="Drop Snapshot"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
                />
              </div>
              <a href="#" className="text-[8px] font-black tracking-wider text-neutral-300 hover:text-white transition-colors flex items-center gap-0.5 md:justify-end w-full group">
                <span>SHOP</span>
                <ArrowRight className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* UTILITY FOOTER LINE */}
        <div className="border-t border-neutral-950 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[8px] tracking-widest text-neutral-500 uppercase font-medium">
          <div>
            <span className="font-bold text-neutral-400">© 2026 DAMAGED GOODS.</span> ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="text-neutral-400">ONLINE</span>
            </div>
            <span>WORLDWIDE SHIPPING</span>
            <span className="text-neutral-400 font-bold">IN / INR ▼</span>
          </div>
          <div className="flex items-center gap-2.5 font-sans text-neutral-600 text-[8px] tracking-normal">
            <span className="text-neutral-500 font-bold">VISA</span>
            <span className="font-bold text-neutral-500">UPI</span>
            <span className="text-neutral-500 font-bold">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}