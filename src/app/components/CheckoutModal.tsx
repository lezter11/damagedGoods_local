import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Truck, Lock, CreditCard, CheckCircle2, Smartphone, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items: cartItems, clearCart } = useCartStore();
  const [step, setStep] = useState<"details" | "processing" | "success">("details");
  const [processingStatus, setProcessingStatus] = useState("");
  const [orderId, setOrderId] = useState("");

  // Shipping form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep("details");
      setOrderId("AG-" + Math.floor(1000 + Math.random() * 9000) + "-" + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currencySymbol = cartItems[0]?.currencySymbol || "$";
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% simulated tax
  const total = subtotal + tax;

  const formatPrice = (amount: number) => {
    return currencySymbol + amount.toLocaleString(currencySymbol === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    const statuses = [
      "ESTABLISHING ENCRYPTED ANTIGRAVITY LINK...",
      "VERIFYING INVENTORY RESERVE ALLOCATION...",
      "SIGNING CRYPTOGRAPHIC LEDGER SEQUENCE...",
      "AUTHORIZING CREDIT TRANSACTION HANDSHAKE..."
    ];

    for (let i = 0; i < statuses.length; i++) {
      setProcessingStatus(statuses[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setStep("success");
    triggerConfetti();
  };

  const handleExpressPayment = async (provider: string) => {
    setStep("processing");
    setProcessingStatus(`CONNECTING SECURELY TO ${provider.toUpperCase()} GATEWAY...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingStatus("DECRYPTING EXPRESS IDENTIFIERS...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setProcessingStatus("SECURING ALLOCATED PIECES...");
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStep("success");
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ["#c00000", "#faf9f5", "#000000"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ["#c00000", "#faf9f5", "#000000"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSuccessDone = () => {
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-0 sm:p-4 overflow-hidden selection:bg-[#c00000]/30 selection:text-white font-mono uppercase tracking-[0.1em]">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full h-[100dvh] sm:h-[85vh] max-w-5xl bg-[#0c0c0c] text-[#faf9f5] border-none sm:border border-neutral-900 rounded-none flex flex-col md:flex-row overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1.5 bg-[#111111] border border-neutral-900 rounded-none z-[450]"
          >
            <X className="w-4 h-4" />
          </button>

          {/* LEFT SIDE: CHECKOUT FORM FRAME */}
          <div className="w-full md:w-[58%] overflow-y-auto px-6 py-8 sm:px-8 md:px-10 flex flex-col justify-between border-r border-neutral-900 order-2 md:order-1 h-[60%] md:h-full">
            {step === "details" && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <h2 className="text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase flex items-center gap-1.5 mb-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    [ SECURE CHECKOUT PROTOCOL // SSL_VAULT ]
                  </h2>
                  <h1 className="text-lg font-black tracking-[0.1em] text-[#faf9f5]">
                    ORDER ALLOCATION SYSTEM
                  </h1>
                </div>

                {/* EXPRESS DECK */}
                <div className="space-y-2 font-mono">
                  <span className="text-[8px] font-black tracking-[0.25em] text-neutral-500 block">
                    EXPRESS GATEWAY ROUTING //
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleExpressPayment("Shop Pay")}
                      className="py-3 bg-[#5a31f4] hover:bg-[#4b26db] text-white text-[9px] font-bold tracking-[0.2em] rounded-none transition-all cursor-pointer flex items-center justify-center"
                    >
                      SHOP PAY
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExpressPayment("Apple Pay")}
                      className="py-3 bg-white text-black hover:bg-neutral-200 text-[9px] font-bold tracking-[0.2em] rounded-none transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Smartphone className="w-3 h-3 text-black fill-black" />
                      APPLE
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExpressPayment("Google Pay")}
                      className="py-3 bg-[#111111] border border-neutral-900 text-white hover:bg-neutral-900 text-[9px] font-bold tracking-[0.2em] rounded-none transition-all cursor-pointer flex items-center justify-center"
                    >
                      G PAY
                    </button>
                  </div>
                </div>

                {/* OR SEPARATOR */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-900" />
                  </div>
                  <span className="relative z-10 px-4 bg-[#0c0c0c] text-[8px] font-mono text-neutral-600 tracking-[0.25em] font-semibold">
                    OR STANDARD VAULT SYSTEM
                  </span>
                </div>

                {/* SHIPPING DETAILS */}
                <div className="space-y-3">
                  <span className="text-[8px] font-black tracking-[0.25em] text-neutral-500 flex items-center gap-1.5 font-mono">
                    <Truck className="w-3 h-3 text-neutral-400" />
                    LOGISTICS PARAMETERS //
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                    <input
                      type="text"
                      required
                      placeholder="RECIPIENT FULL NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="DELIVERY ADDRESS"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="CITY"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                    <input
                      type="text"
                      required
                      placeholder="POSTAL ZIP CODE"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                  </div>
                </div>

                {/* PAYMENT CARD DETAILS */}
                <div className="space-y-3">
                  <span className="text-[8px] font-black tracking-[0.25em] text-neutral-500 flex items-center gap-1.5 font-mono">
                    <Lock className="w-3 h-3 text-neutral-400" />
                    CARD VAULT DECK //
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="CARD NUMBER"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9\s]/g, ""))}
                      className="w-full bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none pl-10 pr-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                      className="bg-[#0c0c0c] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 rounded-none px-3 py-3 outline-none focus:border-neutral-500 transition-all uppercase"
                    />
                  </div>
                </div>

                {/* SECURE SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-[#faf9f5] text-black font-black text-[9px] tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all rounded-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>SECURE ALLOCATION & ORDER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {step === "processing" && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-10 h-10 border border-neutral-900 border-t-[#c00000] rounded-none animate-spin" />
                <div className="space-y-2">
                  <div className="text-[8px] font-black tracking-[0.25em] text-[#c00000] uppercase font-mono">
                    ANTIGRAVITY LEDGER SECURING
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                    {processingStatus}
                  </div>
                </div>
              </div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col justify-between py-4 font-mono text-[9px] tracking-[0.2em]"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
                    <div className="w-10 h-10 rounded-none bg-green-950/20 border border-green-800 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-500 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[8px] font-black tracking-[0.25em] text-green-500 uppercase">
                        SEAL CONFIRMED //
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-[0.1em] text-white">
                        ANTIGRAVITY ALLOCATION VERIFIED
                      </h2>
                    </div>
                  </div>

                  <div className="bg-black border border-neutral-900 rounded-none p-4 space-y-3 font-mono">
                    <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-900/50 pb-2">
                      <span>ORDER SPEC REF</span>
                      <span className="text-white font-bold">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-900/50 pb-2">
                      <span>SIGNATURE LOG</span>
                      <span className="text-green-500 font-bold">SECURED_CONFIRMED</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-900/50 pb-2">
                      <span>DISPATCH SPEC</span>
                      <span className="text-white font-bold">2 - 3 BUSINESS DAYS</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>LOGISTICS LINK</span>
                      <span className="text-[#c00000] font-bold">
                        AG-LOG-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>
                  </div>

                  <div className="leading-relaxed text-neutral-500 text-[8px] tracking-[0.2em]">
                    A digital signature confirming this transaction has been logged on our secure servers. A copy of the receipt invoice and estimated tracking links have been sent to <span className="text-neutral-300 font-bold">{email || "your email address"}</span>.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSuccessDone}
                  className="w-full py-4 mt-6 bg-[#c00000] hover:bg-[#ea3423] text-white font-black tracking-[0.25em] transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>RETURN TO ARCHIVE</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY AND PRODUCTS */}
          <div className="w-full md:w-[42%] bg-[#0c0c0c] overflow-y-auto px-6 py-8 sm:px-8 flex flex-col justify-between order-1 md:order-2 h-[40%] md:h-full">
            <div>
              <h3 className="text-[9px] font-black tracking-[0.25em] text-neutral-500 uppercase mb-4 font-mono">
                ALLOCATIONS // (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h3>

              {cartItems.length === 0 ? (
                <div className="text-neutral-600 text-[9px] font-mono py-6">
                  NO BATCH ALLOCATED.
                </div>
              ) : (
                <div className="space-y-4 max-h-[22vh] md:max-h-[50vh] overflow-y-auto pr-1 hide-scrollbar font-mono text-[9px]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-neutral-900/40 pb-3">
                      <div className="w-14 h-16 bg-black border border-neutral-900 rounded-none overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover filter brightness-75"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#faf9f5] tracking-wider truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-neutral-500 mt-0.5 font-mono text-[8px] tracking-[0.2em]">
                          <span>SIZE: {item.size}</span>
                          <span>QTY: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-300">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOTALS CALCULATION */}
            <div className="border-t border-neutral-900 pt-6 mt-6 space-y-3 text-[9px] tracking-[0.25em] font-mono">
              <div className="flex justify-between items-center text-neutral-500">
                <span>SUBTOTAL</span>
                <span className="text-neutral-300 font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-500">
                <span>PROCESSING VAT</span>
                <span className="text-neutral-300 font-bold">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-900 pb-3">
                <span>LOGISTICS DISPATCH</span>
                <span className="text-green-500 font-semibold uppercase">FREE</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-white pt-1">
                <span>TOTAL VALUE</span>
                <span className="text-lg text-white font-bold">{formatPrice(total)}</span>
              </div>

              {/* Secure Checkout Trust */}
              <div className="flex items-center gap-2 bg-black border border-neutral-900 rounded-none p-2.5 text-[8px] text-neutral-500 leading-normal">
                <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>SSL KEY SECURED LOGGING ACTIVATED. SECURED.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
