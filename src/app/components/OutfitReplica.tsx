import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useUIStore } from "../../store/useUIStore";
import { products } from "../data/products";
import { Footer } from "./Footer";
import { LiquidBlobHero } from "./LiquidBlobHero";
import { EditorialGrid } from "./EditorialGrid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hoodie from "../../imports/hoodie_menu.png";
import jacket from "../../imports/Jacket_homepage_high_pixel.png";
import type { Product } from "./ProductPage";

interface OutfitReplicaProps {
  onProductClick?: (product: Product, rect: DOMRect) => void;
  activeProductId?: number | null;
}

export function OutfitReplica({ onProductClick, activeProductId }: OutfitReplicaProps) {
  const { setHoveredProduct } = useUIStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalPinRef = useRef<HTMLDivElement>(null);
  const archiveImageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dg-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 54, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".story-line span").forEach((line) => {
        gsap.to(line, {
          yPercent: 0,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".dg-parallax").forEach((el) => {
        gsap.fromTo(el, { yPercent: -10 }, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      if (horizontalTrackRef.current && horizontalPinRef.current) {
        const getDistance = () => Math.max(0, horizontalTrackRef.current!.scrollWidth - window.innerWidth);
        gsap.to(horizontalTrackRef.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalPinRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.fromTo(".dg-bottom-fade", { opacity: 0 }, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#page",
          start: "top top",
          end: "400px top",
          scrub: true,
        },
      });

      gsap.fromTo(".dg-hero-indicators", { opacity: 1 }, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#page",
          start: "top top",
          end: "150px top",
          scrub: true,
        },
      });

      gsap.fromTo(".dg-hero-brand", { opacity: 1 }, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#page",
          start: "top top",
          end: "280px top",
          scrub: true,
        },
      });

      gsap.fromTo(".dg-hero-metadata", { opacity: 1 }, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#page",
          start: "top top",
          end: "200px top",
          scrub: true,
        },
      });
    }, rootRef);

    // Refresh ScrollTrigger to ensure all layout offsets and dimensions are correctly calculated
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleArchiveClick = (e: React.MouseEvent, product: Product, index: number) => {
    e.preventDefault();
    setHoveredProduct(null);
    if (onProductClick && archiveImageRefs.current[index]) {
      const rect = archiveImageRefs.current[index]!.getBoundingClientRect();
      onProductClick(product, rect);
    }
  };

  return (
    <>
      <main ref={rootRef} id="page" className="relative w-full overflow-x-hidden bg-[var(--dg-paper)]">
        <LiquidBlobHero onScrollDown={handleScrollDown} />

        <EditorialGrid onProductClick={onProductClick as any} activeProductId={activeProductId} />

        <section id="collection" ref={horizontalPinRef} className="relative h-screen overflow-hidden bg-[var(--dg-paper)] text-[var(--dg-black)]">
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(90deg,currentColor 1px,transparent 1px)", backgroundSize: "12.5vw 100%" }} />
          <div ref={horizontalTrackRef} className="flex h-full w-max items-center gap-[6vw] px-4 md:px-8">
            <div className="w-[84vw] shrink-0 md:w-[48vw]">
              <p className="dg-kicker mb-6 text-black/45">02 / Moving catalogue</p>
              <h2 className="dg-display text-[18vw] md:text-[9vw]">
                Product as moving frame.
              </h2>
              <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-black/58 md:text-lg">
                A continuous curation of garments engineered for the shift. Moving between raw textures and structured forms, each frame documents the evolution of modern utility and raw-edge tailoring.
              </p>
            </div>

            {products.map((product, index) => {
              const isClicked = activeProductId === product.id;
              const isDimmed = activeProductId != null && !isClicked;
              
              return (
              <button
                key={product.id}
                className={`dg-product-card group relative h-[72vh] w-[74vw] shrink-0 overflow-hidden border border-white/10 bg-[#111111] text-left text-white shadow-[0_36px_100px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-[var(--dg-ease)] hover:-translate-y-4 md:w-[34vw] ${isDimmed ? "opacity-20 blur-sm pointer-events-none" : "opacity-100"}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={(e) => handleArchiveClick(e, product, index)}
              >
                <img 
                  ref={(el) => { archiveImageRefs.current[index] = el; }}
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className={`h-full w-full object-cover opacity-78 grayscale transition-all duration-[1200ms] ease-[var(--dg-ease)] group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 ${isClicked ? "opacity-0" : ""}`} 
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent ${isClicked ? "opacity-0" : ""}`} />
                <div className={`absolute left-5 top-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/58 ${isClicked ? "opacity-0" : ""}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-white/25" />
                  <span>{product.category}</span>
                </div>
                <div className={`absolute bottom-5 left-5 right-5 ${isClicked ? "opacity-0 transition-opacity duration-300" : ""}`}>
                  <div className="mb-4 h-px bg-white/12"><div className="h-full w-full origin-left scale-x-0 bg-white transition-transform duration-700 group-hover:scale-x-100" /></div>
                  <div className="flex items-end justify-between gap-6">
                    <h3 className="max-w-[70%] text-3xl font-black uppercase leading-[0.9] md:text-5xl">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm font-black">
                      {product.price}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </button>
            )})}
            </div>
        </section>
      </main>

      <Footer />
    </>
  );
}