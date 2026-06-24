import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";

interface ProductVariantsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  productColor?: string;
}

export function ProductVariants({ selectedSize, setSelectedSize, productColor = "WASHED CARBON BLACK" }: ProductVariantsProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedColor, setSelectedColor] = useState(productColor);

  // Future-ready color palette options
  const colorWays = [
    { name: "WASHED CARBON BLACK", hex: "#1c1c1c" },
    { name: "RAW ECROU", hex: "#dcd9ce", status: "COMING SOON" },
    { name: "DESERT ORE", hex: "#8e7f72", status: "COMING SOON" },
  ];

  return (
    <div className="space-y-5">
      {/* Sizing grid control headers */}
      <div className="space-y-3">
        <div className="flex justify-between items-center font-mono text-[8px] text-neutral-500 tracking-[0.25em] uppercase">
          <span>
            CHOOSE MEASUREMENT: <span className="text-[#faf9f5] font-black">{selectedSize || "NOT SELECTED"}</span>
          </span>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            type="button"
            className="underline hover:text-[#faf9f5] cursor-pointer transition-colors uppercase font-black text-[#c00000] flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span>[ SIZE SPEC GUIDE ]</span>
          </button>
        </div>

        {/* Technical size guide specs table */}
        <AnimatePresence>
          {showSizeGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#090909] border border-neutral-900 overflow-hidden rounded-xs"
            >
              <div className="p-3">
                <table className="w-full font-mono text-[8.5px] text-neutral-400 text-left uppercase border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-900 text-neutral-500">
                      <th className="py-1.5 pb-2 font-black">SIZE</th>
                      <th className="py-1.5 pb-2 font-black">CHEST (IN)</th>
                      <th className="py-1.5 pb-2 font-black">LENGTH (IN)</th>
                      <th className="py-1.5 pb-2 font-black">SHOULDER (IN)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "S", c: "42", l: "27.5", sh: "18" },
                      { s: "M", c: "44", l: "28.5", sh: "19" },
                      { s: "L", c: "46", l: "29.5", sh: "20" },
                      { s: "XL", c: "48", l: "30.5", sh: "21" },
                      { s: "2XL", c: "50", l: "31.5", sh: "22" },
                    ].map((row) => (
                      <tr key={row.s} className="border-b border-neutral-900/60 last:border-0 hover:bg-neutral-950/40">
                        <td className="py-2 font-black text-white">{row.s}</td>
                        <td className="py-2">{row.c}</td>
                        <td className="py-2">{row.l}</td>
                        <td className="py-2">{row.sh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size buttons matrix grid */}
        <div className="grid grid-cols-5 gap-2">
          {["S", "M", "L", "XL", "2XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
              type="button"
              className={`py-3 text-[11px] font-mono font-black rounded-none tracking-wider border transition-all cursor-pointer ${
                selectedSize === size
                  ? "bg-[#faf9f5] text-black border-[#faf9f5]"
                  : "bg-transparent text-neutral-400 border-neutral-900 hover:border-neutral-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector (Future-Ready) */}
      <div className="space-y-2 pt-2 border-t border-neutral-950">
        <span className="font-mono text-[8px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
          COLORWAY CONFIGURATION: <span className="text-[#faf9f5] font-black">{selectedColor}</span>
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {colorWays.map((cWay) => (
            <button
              key={cWay.name}
              onClick={() => setSelectedColor(cWay.name)}
              type="button"
              className={`flex items-center gap-2 border px-2.5 py-1.5 relative group/c cursor-pointer transition-colors ${
                selectedColor === cWay.name
                  ? "border-neutral-500 bg-[#121212]"
                  : "border-neutral-950 opacity-40 hover:opacity-60"
              }`}
            >
              {/* Color Dot Swatch */}
              <span
                style={{ backgroundColor: cWay.hex }}
                className="w-3 h-3 rounded-full border border-white/10 shrink-0 block"
              />
              <span className="font-mono text-[8px] font-black text-neutral-400 tracking-wider">
                {cWay.name}
              </span>
              {cWay.status && (
                <span className="text-[6.5px] font-mono bg-neutral-900 text-neutral-500 border border-neutral-800/60 px-1 py-0.5 ml-1 font-bold">
                  {cWay.status}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
