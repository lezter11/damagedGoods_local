import React, { useEffect, useRef } from "react";
import { useUIStore } from "../../store/useUIStore";
import { products } from "../data/products";
import { Footer } from "./Footer";
import { LiquidBlobHero } from "./LiquidBlobHero";
import { EditorialGrid } from "./EditorialGrid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function OutfitReplica({
  onProductClick,
}: {
  onProductClick?: (p: any) => void;
}) {
  const { setHoveredProduct } = useUIStore();
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTriggerRef = useRef<HTMLDivElement>(null);
  const panelsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal Sequence for Collections Feature Showcase
    let horizontalCtx: gsap.Context | undefined;
    if (horizontalTriggerRef.current && horizontalSectionRef.current) {
      horizontalCtx = gsap.context(() => {
        const scrollWidth = horizontalSectionRef.current!.scrollWidth;
        const viewWidth = window.innerWidth;
        const totalTranslation = scrollWidth - viewWidth;

        if (totalTranslation > 0) {
          gsap.to(horizontalSectionRef.current, {
            x: -totalTranslation,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalTriggerRef.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${totalTranslation}`,
              invalidateOnRefresh: true,
            },
          });
        }
      }, horizontalTriggerRef);
    }

    // Panels section header entrance
    let panelsCtx: gsap.Context | undefined;
    if (panelsSectionRef.current) {
      panelsCtx = gsap.context(() => {
        gsap.fromTo(
          ".panels-header",
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".panels-header",
              start: "top 90%",
            },
          }
        );
      }, panelsSectionRef);
    }

    // Fix GSAP calculating wrong positions due to dynamic mount and image loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      horizontalCtx?.revert();
      panelsCtx?.revert();
    };
  }, []);

  const handleScrollDown = () => {
    if (panelsSectionRef.current) {
      panelsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main id="page" className="w-full relative overflow-x-hidden">
        {/* ── RESTORED: LIQUID BLOB HERO ── */}
        <LiquidBlobHero onScrollDown={handleScrollDown} />

        {/* ── STICKY HORIZONTAL FEATURE PANELS ── */}
        <div
          ref={panelsSectionRef}
          className="relative w-full"
        >
          <div
            ref={horizontalTriggerRef}
            className="relative w-full overflow-hidden bg-[#0c0c0c] text-white h-screen flex items-center"
          >
            <div
              ref={horizontalSectionRef}
              className="flex flex-row h-full w-max items-center px-12 gap-16 will-change-transform"
            >
              {/* Intro Card */}
              <div className="w-[45vw] md:w-[28vw] flex-shrink-0 flex flex-col justify-center gap-4">
                <p className="panels-header font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500">
                  THE PANELS // AW-25
                </p>
                <h4 className="text-[6vw] font-black tracking-tighter leading-none uppercase select-none">
                  THE PANELS <br />
                  <span className="text-neutral-600">COLLECTION</span>
                </h4>
                <div className="w-8 h-[1px] bg-[#c00000]" />
                <p className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
                  {products.length} ARCHIVE UNITS
                </p>
              </div>

              {/* Product Cards */}
              {products.map((p, i) => (
                <div
                  key={`hz-${p.id}`}
                  className="w-[60vw] md:w-[33vw] aspect-[3/4] flex-shrink-0 relative bg-neutral-900 group overflow-hidden border border-neutral-800/60 cursor-none"
                  onMouseEnter={() => setHoveredProduct(p.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => {
                    setHoveredProduct(null);
                    onProductClick?.(p);
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-1000 ease-out filter contrast-[1.02] grayscale group-hover:grayscale-0"
                  />

                  {/* Number overlay */}
                  <div className="absolute top-5 left-5 font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </div>

                  {/* View Details tag */}
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase bg-[#c00000] text-white px-2 py-1">
                      VIEW //
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-neutral-500 mb-1">
                      {p.category}
                    </p>
                    <div className="flex justify-between items-end">
                      <h5 className="font-black text-base tracking-tight text-white uppercase leading-tight max-w-[70%]">
                        {p.name}
                      </h5>
                      <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5 shrink-0">
                        {p.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EDITORIAL PRODUCT GRID ── */}
        <EditorialGrid onProductClick={onProductClick} />
      </main>

      <Footer />
    </>
  );
}