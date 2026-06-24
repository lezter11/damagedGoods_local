import React from "react";
import { motion } from "motion/react";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlistStore, Product } from "../../store/useWishlistStore";

interface WishlistPageProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function WishlistPage({ onClose, onSelectProduct }: WishlistPageProps) {
  const { items: wishlistItems, removeItem } = useWishlistStore();

  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <>
      {/* Backdrop Dim Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-xs"
      />

      {/* Drawer Container Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[460px] z-[300] bg-[#090909] flex flex-col shadow-2xl overflow-hidden border-l border-neutral-900"
        data-lenis-prevent
      >
        {/* Header Block */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-900 bg-[#090909] shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-[11px] font-black tracking-[0.2em] text-[#faf9f5] uppercase">
              YOUR WISHLIST ({wishlistItems.length})
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-neutral-400 hover:text-white p-2 bg-[#121212] border border-neutral-900 hover:border-neutral-800 rounded-xs transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close wishlist"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#090909] scrollbar-none">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-[10px] tracking-[0.2em] uppercase py-12 space-y-3">
              <Heart className="w-8 h-8 text-neutral-800" strokeWidth={1} />
              <span>YOUR WISHLIST IS CURRENTLY EMPTY</span>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-neutral-900/60">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="py-6 flex gap-5 group"
                >
                  {/* Miniature Image Frame */}
                  <button
                    onClick={() => handleProductClick(item)}
                    type="button"
                    className="w-20 h-26 bg-neutral-950 border border-neutral-900 shrink-0 overflow-hidden relative rounded-xs text-left cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.03] transition-all group-hover:scale-[1.03]"
                    />
                  </button>

                  {/* Specification details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <button
                          onClick={() => handleProductClick(item)}
                          type="button"
                          className="text-[11px] font-black text-[#faf9f5] uppercase tracking-wide truncate hover:text-red-500 transition-colors text-left cursor-pointer"
                        >
                          {item.name}
                        </button>
                        <span className="text-[11.5px] font-bold text-[#faf9f5] shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-[8.5px] tracking-wider uppercase font-medium mt-1">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* View Details Action Link */}
                      <button
                        onClick={() => handleProductClick(item)}
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] border border-neutral-900 hover:border-neutral-800 text-[8.5px] font-black tracking-widest text-[#faf9f5] uppercase rounded-xs transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-neutral-400" />
                        <span>VIEW DETAILS</span>
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        type="button"
                        className="text-neutral-500 hover:text-red-500 hover:bg-red-950/15 border border-transparent hover:border-red-950/20 p-2 transition-all cursor-pointer rounded-xs"
                        aria-label="Remove item"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="bg-[#090909] border-t border-neutral-900 shrink-0 text-[10px] tracking-wider uppercase p-6">
            <button
              onClick={onClose}
              type="button"
              className="w-full bg-white hover:bg-neutral-200 text-black font-black py-4 transition-all cursor-pointer rounded-xs text-[9.5px] tracking-widest uppercase text-center"
            >
              CLOSE WISHLIST
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
