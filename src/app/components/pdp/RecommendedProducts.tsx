import React from "react";
import { Heart } from "lucide-react";
import { Product } from "../ProductPage";
import { products } from "../../data/products";
import { useWishlistStore } from "../../../store/useWishlistStore";

interface RecommendedProductsProps {
  currentProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export function RecommendedProducts({ currentProduct, onSelectProduct }: RecommendedProductsProps) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: isProductWishlisted } = useWishlistStore();

  // Filter out the current product and pick up to 4 recommendations
  const recommendedList = products.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  return (
    <div className="space-y-4 pt-8 border-t border-neutral-900 mt-10">
      {/* Section Title */}
      <span className="font-mono text-[9px] font-black tracking-[0.25em] text-neutral-500 uppercase block text-center">
        ⚡ CLIENT CUSTOMERS ALSO LOVED // POPULAR SELECTION
      </span>

      {/* Grid Layout (2 columns mobile, 4 columns desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        {recommendedList.map((p) => {
          const isLiked = isProductWishlisted(p.id);
          return (
            <div
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className="bg-[#070707] border border-neutral-900 hover:border-neutral-750 p-3 flex flex-col gap-3 transition-all duration-300 text-left cursor-pointer group relative hover:shadow-lg"
            >
              {/* Wishlist Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLiked) {
                    removeFromWishlist(p.id);
                  } else {
                    addToWishlist({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      category: p.category,
                      image: p.image,
                      colSpan: p.colSpan || "",
                    });
                  }
                }}
                type="button"
                className={`absolute top-5 right-5 z-10 w-8 h-8 bg-black/70 border border-neutral-900 rounded-none flex items-center justify-center transition-all duration-300 hover:scale-[1.08] cursor-pointer ${
                  isLiked ? "text-red-500 border-red-950/40" : "text-neutral-500 hover:text-white"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />
              </button>

              {/* Product Card Image */}
              <div className="aspect-[3/4] overflow-hidden bg-neutral-950 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>

              {/* Card Metadata */}
              <div className="space-y-1.5 px-1">
                <div className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest">
                  {p.category}
                </div>
                <div className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-white uppercase tracking-wide truncate transition-colors">
                  {p.name}
                </div>
                <div className="text-[11px] font-mono font-bold text-[#c00000]">
                  {p.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
