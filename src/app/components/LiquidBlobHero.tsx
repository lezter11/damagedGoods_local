import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── SIMPLEX NOISE (Inline, ~60 lines, no dep) ───────────────────────────────
// A minimal 2D Simplex Noise implementation.
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const grad3: [number, number][] = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 1], [-1, 1], [1, -1], [-1, -1],
];
let perm: Uint8Array;
const initNoise = () => {
  perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
};
initNoise();
const dot2 = (g: [number, number], x: number, y: number) => g[0] * x + g[1] * y;
const simplex2 = (xin: number, yin: number): number => {
  const s = (xin + yin) * F2;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const t = (i + j) * G2;
  const X0 = i - t, Y0 = j - t;
  const x0 = xin - X0, y0 = yin - Y0;
  const [i1, j1] = x0 > y0 ? [1, 0] : [0, 1];
  const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
  const ii = i & 255, jj = j & 255;
  const gi0 = perm[ii + perm[jj]] % 8;
  const gi1 = perm[ii + i1 + perm[jj + j1]] % 8;
  const gi2 = perm[ii + 1 + perm[jj + 1]] % 8;
  let n = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 > 0) { t0 *= t0; n += t0 * t0 * dot2(grad3[gi0], x0, y0); }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 > 0) { t1 *= t1; n += t1 * t1 * dot2(grad3[gi1], x1, y1); }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 > 0) { t2 *= t2; n += t2 * t2 * dot2(grad3[gi2], x2, y2); }
  return 70 * n; // range [-1, 1]
};

// ─── BLOB GEOMETRY ────────────────────────────────────────────────────────────
const NUM_POINTS = 8; // control-point count for blob silhouette

function buildBlobPoints(
  cx: number,
  cy: number,
  baseRadius: number,
  time: number,
  mouseOffX: number,
  mouseOffY: number
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const angle = (i / NUM_POINTS) * Math.PI * 2;
    const noiseVal = simplex2(
      Math.cos(angle) * 0.6 + time * 0.18,
      Math.sin(angle) * 0.6 + time * 0.14
    );
    const r = baseRadius * (1 + noiseVal * 0.28);
    const px = cx + mouseOffX + Math.cos(angle) * r;
    const py = cy + mouseOffY + Math.sin(angle) * r;
    points.push([px, py]);
  }
  return points;
}

/** Smooth catmull-rom spline through points as an SVG path string */
function buildSmoothPath(pts: [number, number][]): string {
  const n = pts.length;
  if (n < 3) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  d += " Z";
  return d;
}

import img1 from "../../imports/img1.jpg";
import img2 from "../../imports/img2.jpg";
import img3 from "../../imports/img3.jpg";
import img4 from "../../imports/img4.jpg";

// ─── EDITORIAL IMAGES ─────────────────────────────────────────────────────────
const EDITORIAL_IMAGES = [
  img1,
  img2,
  img3,
  img4,
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export function LiquidBlobHero({ onScrollDown }: { onScrollDown?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Spring mouse tracking
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  // SVG path state — updated via ref to avoid react re-renders in RAF loop
  const pathRef = useRef<SVGPathElement | null>(null);

  const [imgIndex, setImgIndex] = useState(0);
  const [prevImgIndex, setPrevImgIndex] = useState<number | null>(null);
  const [blobPath, setBlobPath] = useState("");
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  // ── Resize handling ──
  useEffect(() => {
    const handleResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Mouse spring attractor ──
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize to -0.5 … +0.5 relative to center
    targetMouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5),
      y: ((e.clientY - rect.top) / rect.height - 0.5),
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ── RAF Animation Loop ──
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += delta;

      // Spring lerp mouse position
      const spring = 0.055;
      currentMouseRef.current.x +=
        (targetMouseRef.current.x - currentMouseRef.current.x) * spring;
      currentMouseRef.current.y +=
        (targetMouseRef.current.y - currentMouseRef.current.y) * spring;

      const { w, h } = { w: dims.w, h: dims.h };
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.33;

      // Mouse attractor offsets (max ±80px)
      const mouseOffX = currentMouseRef.current.x * 160;
      const mouseOffY = currentMouseRef.current.y * 100;

      const pts = buildBlobPoints(cx, cy, baseRadius, timeRef.current, mouseOffX, mouseOffY);
      const path = buildSmoothPath(pts);

      // Directly mutate SVG path element for performance (no React state re-render)
      if (pathRef.current) {
        pathRef.current.setAttribute("d", path);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dims]);

  // ── Image cycle (every 3.5s) ──
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex((prev) => {
        setPrevImgIndex(prev);
        return (prev + 1) % EDITORIAL_IMAGES.length;
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const { w, h } = dims;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0c0c0c] select-none"
      style={{ cursor: "none" }}
    >
      {/* ── SVG DEFS: clip path driven by RAF ── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="blob-clip" clipPathUnits="userSpaceOnUse">
            <path
              ref={pathRef}
              d=""
            />
          </clipPath>
        </defs>
      </svg>

      {/* ── EDITORIAL COLLAGE (clipped by blob) ── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#blob-clip)" }}
      >
        {/* Previous image fading out */}
        <AnimatePresence>
          {prevImgIndex !== null && (
            <motion.img
              key={`prev-${prevImgIndex}`}
              src={EDITORIAL_IMAGES[prevImgIndex]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onAnimationComplete={() => setPrevImgIndex(null)}
            />
          )}
        </AnimatePresence>
        {/* Current image fading in */}
        <motion.img
          key={`curr-${imgIndex}`}
          src={EDITORIAL_IMAGES[imgIndex]}
          alt="DAMAGED GOODS editorial"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: imgIndex === 0 ? 1 : 0, scale: imgIndex === 0 ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* Tinted overlay inside blob */}
        <div className="absolute inset-0 bg-[#0c0c0c]/30 mix-blend-multiply" />
      </div>

      {/* ── SOFT BLOB EDGE GLOW (outside the clip) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: "url(#blob-clip)", filter: "blur(0px)" }}
      />

      {/* ── DARK VIGNETTE FRAME ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, #0c0c0c 72%)",
        }}
      />

      {/* ── CORNER METADATA TICKERS ── */}
      <div className="absolute top-24 left-6 md:left-10 z-20 pointer-events-none">
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
          SYSTEM // ONLINE
        </p>
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20 mt-0.5">
          COLLECTION AW/25
        </p>
      </div>
      <div className="absolute top-24 right-6 md:right-10 z-20 pointer-events-none text-right">
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
          ARCHIVE REF//DG-{String(Math.floor(Date.now() / 1000)).slice(-4)}
        </p>
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20 mt-0.5">
          FREQUENCY ACTIVE
        </p>
      </div>

      {/* ── BRAND TYPOGRAPHY (centered, mix-blend-difference) ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <h1
            className="font-black uppercase leading-[0.88] tracking-tighter text-white"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 18rem)",
              mixBlendMode: "difference",
              letterSpacing: "-0.03em",
            }}
          >
            DAMAGED
          </h1>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tighter"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 18rem)",
              mixBlendMode: "difference",
              color: "#faf9f5",
              letterSpacing: "-0.03em",
              opacity: 0.6,
            }}
          >
            GOODS
          </h1>

          {/* Red separator line */}
          <motion.div
            className="w-16 h-[2px] bg-[#c00000] mt-5 mb-4 origin-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          />

          {/* Subtitle */}
          <p
            className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(250,249,245,0.35)", mixBlendMode: "difference" }}
          >
            STREETWEAR SYSTEMS // EST. 2024
          </p>
        </motion.div>
      </div>

      {/* ── BOTTOM LEFT: Image index indicator ── */}
      <div className="absolute bottom-10 left-6 md:left-10 z-20 flex items-center gap-2 pointer-events-none">
        {EDITORIAL_IMAGES.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-500"
            style={{
              width: i === imgIndex ? "24px" : "6px",
              height: "2px",
              borderRadius: "2px",
              backgroundColor:
                i === imgIndex ? "#c00000" : "rgba(250,249,245,0.25)",
            }}
          />
        ))}
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button
        className="absolute bottom-8 right-6 md:right-10 z-20 flex flex-col items-end gap-1 group pointer-events-auto"
        onClick={onScrollDown}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/30 group-hover:text-white/60 transition-colors">
          SCROLL
        </span>
        <div className="w-[1px] h-8 bg-white/20 group-hover:bg-white/50 transition-colors" />
      </motion.button>

      {/* ── RED DOT ACCENT ── */}
      <motion.div
        className="absolute z-20 rounded-full bg-[#c00000]"
        style={{ width: 8, height: 8, top: "50%", right: "12%" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
