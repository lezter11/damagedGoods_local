import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { products } from "../data/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EditorialGridProps {
  onProductClick?: (p: any) => void;
}

// Each product gets a layout descriptor for the asymmetric editorial feel
const LAYOUT_CONFIGS = [
  { gridClass: "col-span-12 md:col-span-7", aspect: "aspect-[4/5]", offsetClass: "md:mt-0" },
  { gridClass: "col-span-12 md:col-span-5", aspect: "aspect-[3/4]", offsetClass: "md:mt-24" },
  { gridClass: "col-span-12 md:col-span-5", aspect: "aspect-[3/4]", offsetClass: "md:mt-0" },
  { gridClass: "col-span-12 md:col-span-7", aspect: "aspect-[4/5]", offsetClass: "md:mt-16" },
];

export function EditorialGrid({ onProductClick }: EditorialGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          {
            y: 80,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Section header entrance
      gsap.fromTo(
        ".editorial-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".editorial-header",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#faf9f5] py-24 md:py-40"
    >
      {/* ── Section Header ── */}
      <div className="editorial-header px-6 md:px-12 lg:px-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/10 pb-8">
        <div>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
            SPECIFICATION CATALOG // AW-25
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none text-black">
            ALL ITEMS
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400">
            {products.length} ARCHIVE UNITS
          </span>
          <div className="w-8 h-[1px] bg-black/20" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#c00000]">
            SELECT TO ACQUIRE
          </span>
        </div>
      </div>

      {/* ── Asymmetric Product Grid ── */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-16 md:gap-y-8 items-start">
          {products.map((product, i) => {
            const layout = LAYOUT_CONFIGS[i % LAYOUT_CONFIGS.length];
            return (
              <div
                key={product.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`${layout.gridClass} ${layout.offsetClass} group relative cursor-none`}
                onClick={() => onProductClick?.(product)}
              >
                {/* Image Container */}
                <div
                  className={`relative w-full ${layout.aspect} overflow-hidden bg-neutral-100 mb-5`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] filter grayscale group-hover:grayscale-0 contrast-[1.02]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                  {/* View tag */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase bg-black text-white px-2 py-1">
                      VIEW //
                    </span>
                  </div>

                  {/* Index number */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-neutral-400">
                      {product.category} // REF-{String(product.id).padStart(3, "0")}
                    </p>
                    <h3 className="font-black text-sm md:text-base uppercase tracking-tight text-black group-hover:text-[#c00000] transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    <span className="font-mono text-xs font-bold text-neutral-600 group-hover:text-black transition-colors">
                      {product.price}
                    </span>
                    <span className="font-mono text-[7px] tracking-[0.15em] text-neutral-400 uppercase">
                      + SHIPPING
                    </span>
                  </div>
                </div>

                {/* Bottom border line that expands on hover */}
                <div className="mt-4 h-[1px] bg-black/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#c00000] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom CTA Row ── */}
      <div className="px-6 md:px-12 lg:px-16 mt-24 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400">
          END OF CATALOG // {products.length} ITEMS DISPLAYED
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c00000]" />
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400">
            MORE DROPS INCOMING
          </p>
        </div>
      </div>
    </section>
  );
}
