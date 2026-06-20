import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Tag, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

interface CartDrawerProps {
  onClose: () => void;
  onCheckout?: () => void;
}

export function CartPage({ onClose, onCheckout }: CartDrawerProps) {
  const { items: cartItems, updateQuantity, removeItem } = useCartStore();

  const formatPrice = (amount: number, symbol: string = "$") => {
    return symbol + amount.toLocaleString(symbol === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // DYNAMIC BILLING PARSER: Strips currency marks natively and aggregates sub-totals
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      // Regex pattern strips out currency symbol, commas, and other non-numeric characters
      const priceStr = String(item.price);
      const cleanPrice = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
      return acc + cleanPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const currencySymbol = cartItems[0]?.currencySymbol || "$";

  return (
    <>
      {/* Backdrop Dim Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xs"
      />

      {/* Drawer Container Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 200 }}
        className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] z-[300] bg-[#0c0c0c] flex flex-col shadow-2xl overflow-hidden border-l border-neutral-900"
      >
        {/* Header Block */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-900 bg-[#0c0c0c] shrink-0 font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
          <span>[ ANTIGRAVITY SPEC // BAG_LEDGER ]</span>
          <div className="flex items-center gap-3">
            <span className="text-[#faf9f5]">LOADED // {cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors p-1 bg-[#111111] border border-neutral-900 rounded-none cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Cart Item Row List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar space-y-4 bg-[#0c0c0c]">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 font-mono text-[9px] tracking-[0.25em] uppercase py-12">
              [ NO ITEMS REGISTERED IN STORAGE ]
            </div>
          ) : (
            <div className="flex flex-col">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-6 flex gap-5 group border-b border-neutral-900/60 font-mono text-[9px] tracking-[0.25em] uppercase"
                >
                  {/* Miniature Image Frame */}
                  <div className="w-20 h-24 bg-black border border-neutral-900 shrink-0 overflow-hidden relative rounded-none">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.03]"
                    />
                  </div>

                  {/* Specification details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-mono text-[10px] font-black text-[#faf9f5] truncate">
                          {item.name}
                        </h3>
                        <span className="font-mono text-[10px] font-bold text-[#c00000] shrink-0">
                          {formatPrice(item.price, item.currencySymbol)}
                        </span>
                      </div>
                      <div className="text-neutral-500 space-y-0.5 mt-1 font-mono text-[8px] tracking-[0.2em]">
                        <p>ID // {item.productId}</p>
                        <p>SIZE // {item.size}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Micro Stepper Quantity Selection */}
                      <div className="flex items-center gap-3 bg-black border border-neutral-900 px-2.5 py-1 w-max rounded-none">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono font-semibold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      {/* Remove Index Row */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-[#c00000] hover:bg-neutral-950 border border-transparent hover:border-neutral-900 p-1.5 transition-all cursor-pointer rounded-none"
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

        {/* Totals Summary Panel */}
        {cartItems.length > 0 && (
          <div className="bg-[#0c0c0c] border-t border-neutral-900 shrink-0 font-mono text-[9px] tracking-[0.25em] uppercase">
            <div className="px-6 py-6 space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-neutral-500">
                  <span>AGGREGATE SUB</span>
                  <span className="text-neutral-300 font-bold">{formatPrice(subtotal, currencySymbol)}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-500">
                  <span>LOGISTICS GATE</span>
                  <span className="text-green-500 font-bold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-center text-[#faf9f5] border-t border-neutral-900 pt-3 font-black">
                  <span>TOTAL ESTIMATED</span>
                  <span className="text-[#c00000] font-bold text-[11px]">{formatPrice(subtotal, currencySymbol)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#c00000] hover:bg-[#ea3423] text-white font-black py-4 transition-all cursor-pointer rounded-none flex items-center justify-center gap-1.5"
                >
                  <span>PROCEED TO CHECKOUT //</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-transparent border border-neutral-900 text-neutral-400 py-4 hover:border-neutral-700 hover:text-white transition-all cursor-pointer rounded-none"
                >
                  RETURN TO ARCHIVE
                </button>
              </div>

              {/* Secure Handshake Notice */}
              <div className="flex items-center gap-2.5 border-t border-neutral-900/50 pt-4 text-[8px] text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>SSL KEY SECURED. ANTIGRAVITY TRANSACTIONS LOGGED.</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
