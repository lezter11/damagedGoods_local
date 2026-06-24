import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface EditorialGridProps {
  onProductClick?: (p: Product, rect: DOMRect) => void;
  activeProductId?: number | null;
}

const layouts = [
  { className: "md:col-span-6", aspect: "aspect-[4/5]", offset: "md:mt-0" },
];

export function EditorialGrid({ onProductClick, activeProductId }: EditorialGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".catalog-card").forEach((card, index) => {
        const image = card.querySelector("img");
        gsap.fromTo(card, { y: 90, opacity: 0, clipPath: "inset(12% 0 12% 0)" }, {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          delay: (index % 2) * 0.08,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
        if (image) {
          gsap.fromTo(image, { yPercent: -8 }, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent, product: Product, index: number) => {
    e.preventDefault();
    if (onProductClick && imageRefs.current[index]) {
      const rect = imageRefs.current[index]!.getBoundingClientRect();
      onProductClick(product, rect);
    }
  };

  return (
    <section id="catalog" ref={sectionRef} className="relative bg-[var(--dg-paper)] px-4 pt-16 pb-12 text-[var(--dg-black)] md:px-8 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-[1800px]">

        <div className="grid grid-cols-12 gap-x-4 gap-y-16 md:gap-x-8 md:gap-y-10">
          {products.map((product, index) => {
            const layout = layouts[index % layouts.length];
            const isClicked = activeProductId === product.id;
            const isDimmed = activeProductId != null && !isClicked;

            return (
              <button
                key={product.id}
                onClick={(e) => handleClick(e, product, index)}
                className={`catalog-card group col-span-12 ${layout.className} ${layout.offset} cursor-pointer text-left transition-all duration-700 ${isDimmed ? "opacity-20 blur-sm pointer-events-none" : "opacity-100"}`}
              >
                <div className={`dg-media relative ${layout.aspect} border border-white/10 bg-[#111111] text-white overflow-hidden`}>
                  <img 
                    ref={(el) => { imageRefs.current[index] = el; }}
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    className={`h-[116%] w-full object-cover grayscale brightness-90 contrast-110 transition-all duration-[1200ms] ease-[var(--dg-ease)] group-hover:scale-105 group-hover:grayscale-0 ${isClicked ? "opacity-0" : "opacity-100"}`} 
                  />
                  <div className={`absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/18 ${isClicked ? "opacity-0" : ""}`} />
                  <div className={`absolute left-4 top-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/0 transition-colors duration-500 group-hover:text-white/72 ${isClicked ? "opacity-0" : ""}`}>
                    <span>View piece</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                  <span className={`absolute bottom-4 right-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/45 ${isClicked ? "opacity-0" : ""}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className={`mt-5 flex items-start justify-between gap-5 border-t border-black/12 pt-4 transition-opacity duration-300 ${isClicked ? "opacity-0" : "opacity-100"}`}>
                  <div>
                    <p className="dg-kicker mb-2 text-black/35">{product.category} / REF-{String(product.id).padStart(3, "0")}</p>
                    <h3 className="text-2xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[var(--dg-red)] md:text-4xl">
                      {product.name}
                    </h3>
                  </div>
                  <span className="mt-1 shrink-0 text-sm font-black">{product.price}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-black/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="dg-kicker text-black/40">End of catalog / {products.length} pieces shown</p>
          <a href="#page" className="group flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-black/60 transition-colors hover:text-black">
            Replay experience
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
