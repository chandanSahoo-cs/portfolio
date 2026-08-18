"use client";

import {
  Broom,
  Coffee,
  Eraser,
  Heart,
  Palette,
  Sparkles,
  Stamp,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { soundManager } from "@/lib/audio";

type StampKind = "star" | "coffee" | "sparkle" | "heart" | "checkmark";

interface PlacedStamp {
  id: number;
  x: number;
  y: number;
  kind: StampKind;
  rotation: number;
  scale: number;
  color: string;
}

const STAMP_CONFIGS: Record<StampKind, { label: string; color: string }> = {
  star: { label: "★ Star", color: "var(--sticky)" },
  coffee: { label: "☕ Coffee", color: "var(--marker)" },
  sparkle: { label: "✦ Sparkle", color: "var(--pen-blue)" },
  heart: { label: "♥ Heart", color: "var(--marker)" },
  checkmark: { label: "✓ Done", color: "var(--leaf)" },
};

export default function DoodleCanvas() {
  const [stampMode, setStampMode] = useState<boolean>(false);
  const [selectedStamp, setSelectedStamp] = useState<StampKind>("star");
  const [stamps, setStamps] = useState<PlacedStamp[]>([]);
  const [toast, setToast] = useState<React.ReactNode>(null);

  // Click on screen to stamp when stampMode is on
  useEffect(() => {
    if (!stampMode) return;

    const handleClick = (e: MouseEvent) => {
      // Don't stamp if clicking inside toolbar
      const target = e.target as HTMLElement;
      if (
        target.closest(".doodle-toolbar") ||
        target.closest("button") ||
        target.closest("a")
      ) {
        return;
      }

      soundManager.playStamp();

      const x = e.pageX;
      const y = e.pageY;
      const rotation = (Math.random() - 0.5) * 35;
      const scale = 0.85 + Math.random() * 0.35;
      const color = STAMP_CONFIGS[selectedStamp].color;

      const newStamp: PlacedStamp = {
        id: Date.now() + Math.random(),
        x,
        y,
        kind: selectedStamp,
        rotation,
        scale,
        color,
      };

      setStamps((prev) => [...prev.slice(-30), newStamp]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [stampMode, selectedStamp]);

  const toggleMode = () => {
    soundManager.playClick();
    const next = !stampMode;
    setStampMode(next);
    setToast(
      next ? (
        <span className="flex items-center gap-2">
          <Palette size={16} /> Stamp Mode ON: Click anywhere to drop doodles!
        </span>
      ) : null,
    );
    if (next) setTimeout(() => setToast(null), 3000);
  };

  const clearStamps = () => {
    soundManager.playClick();
    setStamps([]);
    setToast(
      <span className="flex items-center gap-2">
        <Broom size={16} /> Canvas cleared!
      </span>,
    );
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {/* Placed Stamps Layer across the full scrollable page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-hidden select-none">
        {stamps.map((s) => (
          <div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform animate-in zoom-in-50 duration-200"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale})`,
            }}>
            {s.kind === "star" && (
              <svg width="34" height="34" viewBox="0 0 34 34">
                <path
                  d="M17 2 L21 12 L32 13 L24 20 L27 31 L17 25 L7 31 L10 20 L2 13 L13 12 Z"
                  fill="var(--sticky)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {s.kind === "coffee" && (
              <svg width="34" height="34" viewBox="0 0 34 34">
                <path
                  d="M8 12 L10 28 C11 31, 23 31, 24 28 L26 12 Z"
                  fill="var(--paper)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <path
                  d="M25 15 C30 15, 30 23, 24 24"
                  stroke="var(--ink)"
                  strokeWidth="1.8"
                  fill="none"
                />
                <path
                  d="M12 18 L22 18"
                  stroke="var(--marker)"
                  strokeWidth="2"
                />
              </svg>
            )}

            {s.kind === "sparkle" && (
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path
                  d="M16 2 L18 12 L28 16 L18 20 L16 30 L14 20 L4 16 L14 12 Z"
                  fill="var(--pen-blue)"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {s.kind === "heart" && (
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path
                  d="M16 28 C8 20, 2 15, 2 9 C2 4, 6 2, 10 2 C13 2, 15 4, 16 6 C17 4, 19 2, 22 2 C26 2, 30 4, 30 9 C30 15, 24 20, 16 28 Z"
                  fill="var(--marker)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {s.kind === "checkmark" && (
              <svg width="34" height="34" viewBox="0 0 34 34">
                <circle
                  cx="17"
                  cy="17"
                  r="14"
                  fill="var(--leaf)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <path
                  d="M10 17 L15 22 L24 12"
                  fill="none"
                  stroke="var(--paper)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Floating Stamp Toolbar (Bottom-Left) */}
      <div className="doodle-toolbar fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-1.5 sm:gap-2 select-none">
        {toast && (
          <div className="rough-border bg-sticky px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold text-ink shadow-[2px_2px_0_0.5px_var(--ink)] animate-in fade-in slide-in-from-bottom-2">
            {toast}
          </div>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Main Toggle Button */}
          <button
            type="button"
            onClick={toggleMode}
            className={`rough-border flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 font-mono text-[11px] sm:text-xs font-bold transition-all ${
              stampMode
                ? "bg-sticky text-ink shadow-[4px_4px_0_0.5px_var(--ink)] -translate-y-0.5"
                : "bg-paper text-ink hover:bg-paper-alt"
            }`}>
            <Stamp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>{stampMode ? "STAMPING" : "DOODLE"}</span>
          </button>

          {/* Clear Button (Shown when stamps exist) */}
          {stamps.length > 0 && (
            <button
              type="button"
              onClick={clearStamps}
              title="Clear all placed doodles"
              className="rough-border flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center bg-paper text-ink transition-all hover:bg-marker hover:text-paper">
              <Eraser className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          )}
        </div>

        {/* Sticker Selector Palette (Expanded when stampMode is active) */}
        {stampMode && (
          <div className="rough-border flex items-center gap-1.5 bg-paper p-1.5 shadow-[4px_4px_0_0.5px_var(--ink)] animate-in fade-in slide-in-from-bottom-2">
            {(Object.keys(STAMP_CONFIGS) as StampKind[]).map((kind) => {
              const isSelected = selectedStamp === kind;
              return (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setSelectedStamp(kind)}
                  className={`flex h-7 w-7 items-center justify-center rounded border transition-all ${
                    isSelected
                      ? "border-ink bg-marker text-paper font-bold scale-110 shadow-sm"
                      : "border-transparent text-ink hover:border-ink/40 hover:bg-paper-alt"
                  }`}
                  title={`Stamp ${kind}`}>
                  {kind === "star" && (
                    <Star className="h-3.5 w-3.5 fill-current" />
                  )}
                  {kind === "coffee" && <Coffee className="h-3.5 w-3.5" />}
                  {kind === "sparkle" && <Sparkles className="h-3.5 w-3.5" />}
                  {kind === "heart" && (
                    <Heart className="h-3.5 w-3.5 fill-current" />
                  )}
                  {kind === "checkmark" && <span>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
