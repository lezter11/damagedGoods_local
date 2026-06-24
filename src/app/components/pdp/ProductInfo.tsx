import React, { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Product } from "../ProductPage";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pincodeMessage, setPincodeMessage] = useState("");

  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!cleanPin || cleanPin.length < 5) {
      setPincodeStatus("error");
      setPincodeMessage("INVALID PINCODE METRIC");
      return;
    }

    setPincodeStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setPincodeStatus("success");
    setPincodeMessage("COURIER SHUTTLE DOCK ACTIVE");
  };

  return (
    <div className="space-y-6">
      {/* Star ratings & Review count */}
      <div className="flex items-center gap-1.5 text-yellow-500 text-[10px] tracking-wider">
        <span>★★★★★</span>
        <span className="text-neutral-500 text-[8.5px] font-mono tracking-widest ml-1 font-black uppercase">
          [ 2 CLIENT VERIFICATIONS ]
        </span>
      </div>

      {/* Main product identifiers */}
      <div className="flex justify-between items-start border-b border-neutral-900 pb-5">
        <div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.25em] block mb-1">
            {product.category} // SERIAL_DG_{product.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.05em] text-[#faf9f5] leading-tight font-sans">
            {product.name}
          </h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xl sm:text-2xl font-bold text-[#faf9f5] tracking-wider block">
            {product.price}
          </span>
          <span className="text-[8px] font-mono text-neutral-500 tracking-wider block uppercase mt-0.5 font-bold">
            TAX & DUTY INCLUDED
          </span>
        </div>
      </div>

      {/* Stock Status Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#090909] border border-neutral-900/60 font-mono text-[9px] tracking-[0.15em] text-neutral-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="uppercase">AVAILABILITY: IN STOCK // DEPLOYMENT SHUTTLE READY</span>
      </div>

      {/* Short specifications intro */}
      <p className="text-[11px] leading-relaxed text-neutral-400 font-medium font-sans">
        High-density structural garment. Tailored silhouette engineered with reinforced micro-stitching, custom raw-finish trims, and heavy-duty structural hardware built for long lifecycles.
      </p>

      {/* Pincode shipping checker */}
      <div className="space-y-2.5 pt-1">
        <span className="font-mono text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
          VERIFY SHIPPING SHUTTLE ROUTE //
        </span>
        <form onSubmit={handlePincodeCheck} className="flex gap-2">
          <input
            type="text"
            placeholder="ENTER ZIP/PINCODE"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="flex-1 bg-[#090909] border border-neutral-900 text-[10px] font-mono text-white placeholder:text-neutral-600 px-3.5 py-3 outline-none focus:border-neutral-700 transition-all uppercase"
            maxLength={8}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#111111] hover:bg-neutral-900 border border-neutral-900 text-[#faf9f5] font-black text-[8.5px] tracking-[0.2em] transition-colors cursor-pointer font-mono"
          >
            VALIDATE
          </button>
        </form>

        {pincodeStatus !== "idle" && (
          <div className="p-3 border border-neutral-900 bg-neutral-950/20 font-mono text-[8px] tracking-[0.18em]">
            {pincodeStatus === "loading" ? (
              <div className="text-neutral-400 animate-pulse flex items-center gap-1.5">
                <Clock className="w-3 h-3 animate-spin text-neutral-500" />
                <span>ESTABLISHING SECURE CONNECTION TO CARRIER ARCHIVE...</span>
              </div>
            ) : pincodeStatus === "success" ? (
              <div className="space-y-1.5 text-neutral-400">
                <div className="text-emerald-500 font-black flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{pincodeMessage}</span>
                </div>
                <div className="text-[7.5px] pl-5 text-neutral-500">✓ STANDARD CASH ON DELIVERY (COD) OPTIONS IN SERVICE</div>
                <div className="text-[7.5px] pl-5 text-neutral-500">✓ DISPATCH ESTIMATED WITHIN 1-2 SOLAR ROTATIONS</div>
              </div>
            ) : (
              <div className="text-red-500 font-bold">{pincodeMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
