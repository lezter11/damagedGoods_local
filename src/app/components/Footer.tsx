import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// ─── 3D TILT CTA PANEL ───────────────────────────────────────────────────────
// (Commented out in JSX, but keeping function definition as requested earlier)
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
      className="w-full bg-[#0a0a0a] py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
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

      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full border border-neutral-800/60 p-8 md:p-16 group cursor-none overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#c00000 1px, transparent 1px), linear-gradient(90deg, #c00000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#c00000]/60" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#c00000]/60" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#c00000]/60" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#c00000]/60" />
        <div className="absolute inset-0 bg-[#c00000] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2
              className="font-black uppercase leading-none text-white group-hover:text-[#0c0c0c] transition-colors duration-500"
              style={{ fontSize: "clamp(2.5rem, 8vw, 10rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}
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

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLHeadingElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Stronger 3D tilt
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 25 });

  // Dynamic Glow tracking mouse position
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glowStyle = useMotionTemplate`radial-gradient(circle 800px at ${glowX}% ${glowY}%, rgba(255, 241, 236, 0.08) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade upward into view
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );

      // Subtle parallax on massive typography
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* <CTAPanel /> */}
      <div 
        className="w-full bg-[#0a0a0a] px-2 sm:px-4 md:px-6 pb-2 sm:pb-4 md:pb-6 pt-12 relative z-20"
        style={{ perspective: "2000px" }}
      >
      <div ref={footerRef as any}>
        <motion.footer 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full bg-[#4A0D12] text-[#F4F1EC] font-sans selection:bg-[#F4F1EC] selection:text-[#4A0D12] overflow-hidden rounded-[30px] md:rounded-[40px] min-h-[85vh] flex flex-col justify-between pt-16 px-6 sm:px-10 md:pt-20 md:px-16 lg:px-24 border border-white/5"
        >
          {/* Dynamic 3D Glare/Glow Overlay */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
            style={{ background: glowStyle, transform: "translateZ(1px)" }}
          />

          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 relative z-10 w-full" style={{ transform: "translateZ(60px)" }}>
            
            {/* Brand Left */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Logo Graphic Placeholder (Inspired by screenshot's 2x2 grid) */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-transparent grid grid-cols-2 grid-rows-2 gap-[2px] flex-shrink-0">
                <div className="bg-[#F4F1EC]"></div>
                <div className="bg-[#F4F1EC] rounded-full"></div>
                <div className="bg-transparent border-[3px] border-[#F4F1EC] rounded-bl-full"></div>
                <div className="bg-[#F4F1EC] rounded-br-[10px] bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#4A0D12_3px,#4A0D12_6px)]"></div>
              </div>
              
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1 text-white">
                  Damaged Goods
                </h2>
                <p className="text-sm md:text-[15px] text-[#F4F1EC] font-medium leading-snug max-w-[280px]">
                  A premium curated vintage marketplace built for people who value history over hype.
                </p>
              </div>
            </div>

            {/* Links Right */}
            <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-4 text-[13px] font-medium text-[#F4F1EC]">
              {/* Column 1 */}
              <ul className="flex flex-col gap-3.5">
                {['Shop', 'New Arrivals', 'Collections', 'Archive', 'Brands', 'Journal', 'Gift Cards'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
              {/* Column 2 */}
              <ul className="flex flex-col gap-3.5">
                {['Track Order', 'Shipping & Returns', 'Size Guide', 'Contact', 'Support', 'Collaborating with us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Section (Contact Strip & Massive Text) */}
          <div className="flex flex-col w-full relative z-10 mt-auto pt-24 md:pt-32" style={{ transform: "translateZ(40px)" }}>
            
            {/* Contact Strip */}
            <div className="flex flex-col md:flex-row justify-between items-baseline w-full text-[11px] md:text-xs font-mono mb-4 text-[#F4F1EC] opacity-80 gap-4 md:gap-0">
              <a href="#" className="hover:text-white hover:opacity-100 transition-all">@damagedgoods.in</a>
              <a href="mailto:support@damagedgoods.in" className="hover:text-white hover:opacity-100 transition-all">support@damagedgoods.in</a>
              <span className="hidden md:inline">India</span>
            </div>

            {/* Massive Typography */}
            <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none border-b border-[#F4F1EC]/10 px-2 md:px-4 pb-2 pt-4">
              <h1 
                ref={parallaxRef}
                className="text-[55px] sm:text-[90px] md:text-[11vw] font-black uppercase leading-[0.85] tracking-tighter m-0 p-0 text-transparent w-full text-center whitespace-nowrap"
                style={{ WebkitTextStroke: '1.2px #F4F1EC', transform: "translateZ(80px)" }}
              >
                DAMAGED GOODS
              </h1>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full pb-8 pt-5 text-[9px] md:text-[10px] font-mono uppercase text-[#F4F1EC] opacity-80" style={{ transform: "translateZ(50px)" }}>
              <p className="mb-4 md:mb-0">© 2026 DAMAGED GOODS. ALL RIGHTS RESERVED.</p>
              <div className="flex flex-wrap justify-center gap-6">
                {['Privacy Policy', 'Terms of Use', 'Consent Preferences'].map((item) => (
                  <a key={item} href="#" className="hover:text-white hover:opacity-100 transition-all underline decoration-[0.5px] underline-offset-[5px]">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
      </div>
    </>
  );
}