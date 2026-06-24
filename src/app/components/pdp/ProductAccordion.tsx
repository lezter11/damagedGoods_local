import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Layers, HelpCircle, Truck, Sparkles, RefreshCw } from "lucide-react";

interface ProductAccordionProps {
  productName: string;
}

export function ProductAccordion({ productName }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>("features");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Helper to extract feature descriptions based on active product name
  const getProductFeatures = (nameStr: string) => {
    const name = nameStr.toUpperCase();
    if (name.includes("SHELL") || name.includes("JACKET")) {
      return [
        "FABRIC: HEAVYWEIGHT 100% NYLON RIPSTOP UTILITY CANVAS",
        "FIT: RELAXED OVERSIZED UTILITY SHAPE SYSTEM",
        "COLORWAY: SHADOW CARBON BLACK",
        "ADJUSTABLE VELCRO CUFFS WITH REINFORCED STITCH TRACKS",
        "HIGH-DENSITY COMPOSITE DOUBLE NEEDLE STITCHING",
        "TURN-DOWN STORM WEATHER SHIELD COLLAR",
        "ZIPPERED FRONT UTILITY STORAGE HARNESS SYSTEM",
        "UNISEX STYLING TAILORED FOR HIGH LIFECYCLE RESISTANCE"
      ];
    } else if (name.includes("CARGO") || name.includes("PANT")) {
      return [
        "FABRIC: DOUBLE-DYED 100% COTTON CANVAS TWILL",
        "FIT: STRAIGHT-LEG RELAXED CARGO PROFILE",
        "COLORWAY: ANTHRACITE DISTRESSED GREY",
        "MODULAR CARGO FLAP PANELS WITH DUAL COMPRESSED BUTTONS",
        "DOUBLE KNEE REINFORCEMENTS FOR HIGH STRETCH ABRASION",
        "HEM DRAWSTRING CONTROLS FOR ADJUSTABLE SILHOUETTE FLUIDITY",
        "UNISEX ERGONOMIC TAILORING STRUCTURALLY TAILORED"
      ];
    } else if (name.includes("WALKER") || name.includes("SHOE") || name.includes("BOOT")) {
      return [
        "FABRIC: DISTRESSED WATERPROOF MATTE LEATHER & SUEDE SHARDS",
        "FIT: COMFORT FOOTBED PROFILE SYSTEM",
        "COLORWAY: JET BLACK DECAYED HIGHLIGHTS",
        "REINFORCED METAL HARDWARE HOOK EYELETS",
        "VULCANIZED GRIP RUBBER OUTSOLE FOR TRACTION INDICES",
        "UNISEX STREET RUNNER FORM FACTOR DEPLOYMENT READY"
      ];
    } else {
      return [
        "FABRIC: premium 100% heavy cotton weave twill",
        "fit: relaxed streetwear drape silhouette",
        "colorway: vintage sand ecru base",
        "cuffs: single-button custom drop wrist closure",
        "texture: checkered weave aesthetic details",
        "collar: tailored turn-down industrial collar design",
        "front pocket: utility chest card slip panel",
        "unisex styling suitable for daily streetwear wear"
      ];
    }
  };

  const features = getProductFeatures(productName);

  const sections = [
    {
      id: "features",
      title: "TECHNICAL FEATURES",
      icon: Layers,
      content: (
        <ul className="list-disc list-inside space-y-1.5 text-[9px] text-neutral-400 font-mono tracking-wide pl-1">
          {features.map((feat, idx) => (
            <li key={idx} className="uppercase leading-normal">{feat}</li>
          ))}
        </ul>
      )
    },
    {
      id: "materials",
      title: "MATERIALS & FABRIC LOG",
      icon: Sparkles,
      content: (
        <div className="text-[9px] text-neutral-400 font-mono tracking-wide space-y-1 pl-1 leading-normal uppercase">
          <p>• MAIN BODY: 100% ORGANIC STREETWEAR-GRADE HEAVYWEIGHT TWILL</p>
          <p>• FABRIC SPECIFICATION: 380 GSM COMPRESSED FRENCH TERRY & COTTON SHELL</p>
          <p>• DYE SYSTEM: ACID WASH DISTRESSED ECO-DYE DECAY PATTERN</p>
          <p>• SUSTAINABILITY LOG: 100% RECYCLABLE CELLULOSE PACKAGING WRAP</p>
        </div>
      )
    },
    {
      id: "care",
      title: "CARE ARCHIVE GUIDELINES",
      icon: HelpCircle,
      content: (
        <ul className="list-disc list-inside space-y-1.5 text-[9px] text-neutral-400 font-mono tracking-wide pl-1 leading-normal uppercase">
          <li>WASH PIECE INSIDE OUT WITH COMPATIBLE DARK TONAL COLORS ONLY</li>
          <li>COLD MACHINE WASH RUN ONLY (DELICATE / GENTLE SPEED SETTING)</li>
          <li>DO NOT BLEACH OR TUMBLE DRY TO AVOID FIBRE TENSILE DECAY</li>
          <li>WARM STEAM IRON ON REVERSE SIDE ONLY (DO NOT TOUCH GRAPHIC SEAL)</li>
          <li>FLAT DRY IN NATURALLY SHADED BREEZE TO SECURE DEEP WASH TONES</li>
        </ul>
      )
    },
    {
      id: "shipping",
      title: "SHIPPING & COMPLIANT EXCHANGE",
      icon: Truck,
      content: (
        <div className="text-[9px] text-neutral-400 font-mono tracking-wide space-y-2.5 leading-relaxed uppercase">
          <div className="flex items-start gap-2">
            <Truck className="w-3.5 h-3.5 text-[#c00000] shrink-0 mt-0.5" />
            <span>FREE EXPRESS DELIVERY GLOBALLY. DISPATCH WITHIN 24-48 SOLAR HOURS FROM ACTIVE ORDER COUPLING.</span>
          </div>
          <div className="flex items-start gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-[#c00000] shrink-0 mt-0.5" />
            <span>COMPLIMENTARY EXCHANGE PROTOCOL IN SERVICE WITHIN 14 SHIP CYCLES. RAW TAGS MUST REMAIN ENGAGED.</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="border-t border-neutral-900 mt-2 pt-1 space-y-2">
      {sections.map((sec) => {
        const Icon = sec.icon;
        const isOpen = openSection === sec.id;
        return (
          <div key={sec.id} className="border-b border-neutral-900/60 pb-2">
            <button
              onClick={() => toggleSection(sec.id)}
              type="button"
              className="w-full flex justify-between items-center py-2.5 text-left font-mono text-[9px] tracking-[0.2em] font-black text-[#faf9f5] hover:text-[#c00000] transition-colors cursor-pointer uppercase"
            >
              <span className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-neutral-500" />
                <span>{sec.title}</span>
              </span>
              {isOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-3.5 pt-1 pr-2">
                    {sec.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
