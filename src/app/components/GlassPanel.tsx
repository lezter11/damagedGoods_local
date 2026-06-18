import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "light" | "heavy";
}

export function GlassPanel({
  children,
  className,
  intensity = "heavy",
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        
        // 1. Fake the glass reflection using a gradient instead of a blur
        intensity === "heavy" 
          ? "bg-white/40" 
          : "bg-white/20",
          
        // 2. We can use backdrop-blur on light mode since we don't have the Safari stacking bug as badly, or keep it off. Let's use backdrop blur.
        "backdrop-blur-md", 
        
        // 3. Kept your existing premium depth and highlight effects but inverted for light mode
        "shadow-[0_24px_48px_rgba(0,0,0,0.05)]", 
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]", 
        "border border-black/5", 
        
        className
      )}
      {...props}
    >
      {/* Secondary inset glow for extra polish */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] rounded-[inherit]" />
      
      {/* Content wrapper */}
      <div className="relative z-10 size-full">
        {children}
      </div>
    </div>
  );
}