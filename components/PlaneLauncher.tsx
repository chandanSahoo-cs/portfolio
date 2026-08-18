"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, Wind, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface FlyingPlane {
  id: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  scale: number;
  opacity: number;
  color: string;
  points: Array<{ x: number; y: number; opacity: number }>;
  life: number;
  maxLife: number;
  curveSpeed: number;
}

const ACCENT_COLORS = [
  "var(--marker)",
  "var(--sticky)",
  "var(--pen-blue)",
  "var(--leaf)",
];

export default function PlaneLauncher() {
  const [planes, setPlanes] = useState<FlyingPlane[]>([]);
  const [launchCount, setLaunchCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const requestRef = useRef<number | null>(null);
  const planesRef = useRef<FlyingPlane[]>([]);

  // Keep planesRef in sync with state for animation loop
  planesRef.current = planes;

  // Spawn a new paper plane from given coordinates
  const launchPlane = useCallback((fromX?: number, fromY?: number) => {
    soundManager.playWhoosh();
    
    const isMobile = window.innerWidth < 768;
    const spawnX = fromX !== undefined ? fromX : (isMobile ? window.innerWidth * 0.15 : 80);
    const spawnY = fromY !== undefined ? fromY : (window.innerHeight - 100);

    // Randomized trajectory & physics parameters
    const randomAngleDeg = -30 - Math.random() * 35; // Angle upwards to the right
    const angleRad = (randomAngleDeg * Math.PI) / 180;
    const speed = 7 + Math.random() * 4.5;
    const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];

    const newPlane: FlyingPlane = {
      id: Date.now() + Math.random(),
      startX: spawnX,
      startY: spawnY,
      x: spawnX,
      y: spawnY,
      vx: Math.cos(angleRad) * speed,
      vy: Math.sin(angleRad) * speed,
      angle: randomAngleDeg,
      targetAngle: randomAngleDeg + (Math.random() * 20 - 10),
      scale: 0.85 + Math.random() * 0.35,
      opacity: 1,
      color,
      points: [{ x: spawnX, y: spawnY, opacity: 0.7 }],
      life: 0,
      maxLife: 140 + Math.random() * 60,
      curveSpeed: (Math.random() - 0.48) * 0.8,
    };

    setPlanes((prev) => [...prev.slice(-6), newPlane]);
    setLaunchCount((c) => c + 1);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }, []);

  // Keyboard shortcut (press 'P' or 'Space' on focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is typing in an input, don't trigger
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key.toLowerCase() === "p") {
        launchPlane();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launchPlane]);

  // Animation frame update loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      if (planesRef.current.length > 0) {
        const updatedPlanes = planesRef.current
          .map((p) => {
            const nextLife = p.life + 1 * dt;
            const progress = nextLife / p.maxLife;

            // Aerodynamic lift and slight gravity wave
            const lift = Math.sin(nextLife * 0.05) * 0.45;
            const nextVx = p.vx * 0.995;
            const nextVy = p.vy + 0.08 * dt - lift * 0.15;
            const nextX = p.x + nextVx * dt;
            const nextY = p.y + nextVy * dt;

            // Smoothly calculate flight heading angle
            const currentAngle = (Math.atan2(nextVy, nextVx) * 180) / Math.PI;

            // Trail points decay
            const newPoint = { x: nextX, y: nextY, opacity: 0.65 };
            const updatedPoints = [
              ...p.points.slice(-28).map((pt) => ({ ...pt, opacity: pt.opacity * 0.95 })),
              newPoint,
            ];

            const nextOpacity = progress > 0.8 ? Math.max(0, (1 - progress) * 5) : 1;

            return {
              ...p,
              x: nextX,
              y: nextY,
              vx: nextVx,
              vy: nextVy,
              angle: currentAngle,
              opacity: nextOpacity,
              points: updatedPoints,
              life: nextLife,
            };
          })
          .filter((p) => p.life < p.maxLife && p.opacity > 0.02);

        setPlanes(updatedPlanes);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Plane Flight & Vapor Trail Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 h-full w-full overflow-hidden"
      >
        <svg className="h-full w-full">
          {planes.map((p) => {
            if (p.points.length < 2) return null;
            // Build polyline path for dashed vapor trail
            const d = p.points.reduce((acc, pt, idx) => {
              return idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
            }, "");

            return (
              <g key={p.id}>
                {/* Vapor Trail Shadow */}
                <path
                  d={d}
                  fill="none"
                  stroke="var(--paper-alt)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={p.opacity * 0.7}
                />
                {/* Hand-drawn dashed vapor trail */}
                <path
                  d={d}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                  opacity={p.opacity * 0.45}
                />
              </g>
            );
          })}
        </svg>

        {/* Render Flying Origami Planes */}
        {planes.map((p) => (
          <div
            key={p.id}
            className="absolute top-0 left-0 will-change-transform"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0px) rotate(${p.angle + 90}deg) scale(${p.scale})`,
              opacity: p.opacity,
              transformOrigin: "center center",
            }}
          >
            {/* Paper Plane Silhouette with Hand-drawn Aesthetic */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              style={{ transform: "translate(-18px, -18px)" }}
              className="drop-shadow-[2px_3px_2px_rgba(26,26,26,0.2)]"
            >
              {/* Left wing (Paper) */}
              <path
                d="M18 2 L4 30 L18 23 Z"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Right wing (Accent color) */}
              <path
                d="M18 2 L32 30 L18 23 Z"
                fill={p.color}
                stroke="var(--ink)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Center crease */}
              <path
                d="M18 2 L18 23"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Dotted fold details */}
              <path
                d="M18 12 L9 25"
                stroke="var(--ink)"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
                opacity="0.35"
              />
              <path
                d="M18 12 L27 25"
                stroke="var(--paper)"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
                opacity="0.65"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Tactical Airmail Stamp / Launcher Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-1.5 sm:gap-2 select-none">
        {showToast && (
          <div className="animate-bounce font-hand text-base sm:text-lg font-bold text-marker-dark bg-sticky/90 px-2 sm:px-2.5 py-0.5 rounded border border-ink shadow-[2px_2px_0_0.5px_var(--ink)]">
            ✈ Airmail sent!
          </div>
        )}

        <button
          type="button"
          onClick={() => launchPlane()}
          title="Fold & throw a paper plane (Press 'P')"
          className="rough-border group relative flex items-center gap-1.5 sm:gap-2.5 bg-paper px-2.5 py-1.5 sm:px-4 sm:py-2.5 font-mono text-[11px] sm:text-xs font-bold text-ink transition-all hover:-translate-y-1 hover:bg-paper-alt hover:shadow-[6px_6px_0_0.5px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0_0.5px_var(--ink)]"
        >
          {/* Postmark stamp style decoration */}
          <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-dashed border-ink bg-marker/10 text-marker transition-transform group-hover:rotate-45">
            <Send className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </span>

          <div className="text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span>THROW PLANE</span>
              <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] border border-ink border-b-[2.5px] bg-paper-alt px-1 font-mono text-[10px] font-bold text-ink shadow-[0_1px_0_0_rgba(26,26,26,0.2)] transition-transform group-hover:scale-105 group-active:translate-y-[1px] group-active:border-b">
                P
              </kbd>
            </div>
            {launchCount > 0 && (
              <span className="hidden sm:block font-mono text-[9px] text-ink-soft">
                {launchCount} thrown
              </span>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
