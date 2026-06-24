import React from "react";
import { Camera } from "lucide-react";

// Import local premium lookbook photos
import img1 from "../../../imports/img1.jpg";
import img2 from "../../../imports/img2.jpg";
import img3 from "../../../imports/img3.jpg";
import img4 from "../../../imports/img4.jpg";

export function LifestyleGallery() {
  // Editorial campaign styling logs
  const lookbookList = [
    {
      url: img1,
      caption: "TACTICAL CORE // STYLING LOOK_01",
      gridSpan: "col-span-12 md:col-span-4 aspect-[3/4]"
    },
    {
      url: img2,
      caption: "REINFORCED PROFILE // STYLING LOOK_02",
      gridSpan: "col-span-12 md:col-span-8 aspect-[16/9]"
    },
    {
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      caption: "METRIC SYSTEM // STYLING LOOK_03",
      gridSpan: "col-span-12 md:col-span-8 aspect-[16/10]"
    },
    {
      url: img3,
      caption: "STREET ARCHIVE // STYLING LOOK_04",
      gridSpan: "col-span-12 md:col-span-4 aspect-[3/4]"
    },
    {
      url: img4,
      caption: "SYNAPSE BOUND // STYLING LOOK_05",
      gridSpan: "col-span-12 md:col-span-6 aspect-[4/5]"
    },
    {
      url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
      caption: "MODULAR LAYER // STYLING LOOK_06",
      gridSpan: "col-span-12 md:col-span-6 aspect-[4/5]"
    }
  ];

  return (
    <div className="space-y-4 pt-8 border-t border-neutral-900 mt-10">
      {/* Title Header Section */}
      <div className="flex items-center gap-2 px-1">
        <Camera className="w-3.5 h-3.5 text-[#c00000]" />
        <span className="font-mono text-[9px] font-black tracking-[0.25em] text-neutral-500 uppercase block">
          LIFESTYLE EDITORIAL LOOKBOOK // DROP_07_VISUALS
        </span>
      </div>

      {/* Campaign Mixed Grid */}
      <div className="grid grid-cols-12 gap-3 pt-2">
        {lookbookList.map((item, idx) => (
          <div
            key={idx}
            className={`${item.gridSpan} bg-neutral-950 border border-neutral-950/60 overflow-hidden relative group cursor-crosshair`}
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover filter grayscale contrast-115 brightness-[0.72] group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.03] transition-all duration-[900ms] ease-out"
              loading="lazy"
            />
            {/* Dark gradient overlay text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <span className="text-[7.5px] font-mono text-neutral-500 tracking-wider">
                [ CAMPAIGN SERIES DROP_07 ]
              </span>
              <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase mt-0.5">
                {item.caption}
              </span>
            </div>
            
            {/* Top-Right Technical Grid Tag */}
            <div className="absolute top-3 right-3 font-mono text-[7px] bg-black/70 px-2 py-1 border border-neutral-900/40 text-neutral-500 tracking-wider">
              IMG_0{idx + 1} // DG_SYS
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
