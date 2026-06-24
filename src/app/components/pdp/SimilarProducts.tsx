import React from "react";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { Product } from "../ProductPage";
import { products } from "../../data/products";

interface SimilarProductsProps {
  currentProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export function SimilarProducts({ currentProduct, onSelectProduct }: SimilarProductsProps) {
  // Filter current product and show other items in catalog
  const filteredProducts = products.filter((p) => p.id !== currentProduct.id);

  return (
    <div className="space-y-4 pt-6 border-t border-neutral-900/60 mt-8">
      <div className="flex justify-between items-center px-1">
        <span className="font-mono text-[9px] font-black tracking-[0.25em] text-neutral-500 uppercase flex items-center gap-2">
          <ArrowLeftRight className="w-3 h-3 text-[#c00000]" />
          <span>YOU MAY ALSO LIKE // ARCHIVE COMPLEMENTS</span>
        </span>
        <span className="text-[7.5px] font-mono text-neutral-600 tracking-wider hidden sm:block uppercase">
          SWIPE OR DRAG H-SCROLL ➔
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory">
        {filteredProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProduct(p)}
            type="button"
            className="w-36 sm:w-44 shrink-0 bg-[#070707] border border-neutral-900 hover:border-neutral-700/80 p-2 flex flex-col gap-2.5 transition-all duration-300 text-left group snap-start cursor-pointer hover:shadow-lg hover:shadow-black/50"
          >
            {/* Image display container */}
            <div className="aspect-[3/4] overflow-hidden bg-neutral-950 relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover filter grayscale contrast-[1.05] brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.04] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2">
                <span className="text-[7px] font-mono text-white tracking-widest font-black uppercase">
                  VIEW ARCHIVE
                </span>
                <ArrowRight className="w-3 h-3 text-white -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
              </div>
            </div>

            {/* Typography metadata */}
            <div className="px-1 space-y-1">
              <div className="text-[8px] font-mono text-neutral-500 truncate uppercase tracking-widest">
                {p.category}
              </div>
              <div className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-white truncate uppercase tracking-wide transition-colors">
                {p.name}
              </div>
              <div className="text-[10.5px] font-mono font-black text-[#c00000] mt-0.5">
                {p.price}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
