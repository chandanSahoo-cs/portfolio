"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollMarginIndicator() {
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        setProgress(scrollFraction);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <aside
      aria-label="Notebook scroll progress"
      className="fixed left-2 sm:left-4 md:left-6 top-24 bottom-24 z-30 hidden sm:flex flex-col items-center pointer-events-none select-none"
    >
      {/* Top Binder Punch Hole */}
      <div className="flex flex-col items-center mb-4 opacity-60">
        <div className="h-2 w-2 rounded-full border border-ink/40 bg-paper-alt shadow-inner" />
      </div>

      {/* Main Ruled Margin Track */}
      <div ref={trackRef} className="relative flex-1 w-6 flex justify-center">
        {/* Background Ruled Margin Line (classic sketchbook red rule) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-marker/25 border-r border-dashed border-marker/40" />

        {/* Drawn Pencil Line (fills in red ink as you scroll) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-marker/80 transition-all duration-75 ease-out rounded-full"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Sliding Hand-drawn Paperclip (Clean, No BG Box) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out pointer-events-auto group cursor-default"
          style={{ top: `${progress * 100}%` }}
        >
          <div className="relative -rotate-12 transition-transform duration-200 group-hover:rotate-0 group-hover:scale-115">
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="drop-shadow-xs"
            >
              {/* Paperclip wire body */}
              <path
                d="M 8 10 L 8 26 C 8 30 16 30 16 26 L 16 7 C 16 3 5 3 5 8 L 5 28 C 5 34 20 34 20 28 L 20 12"
                stroke="var(--ink)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-200 group-hover:stroke-marker"
              />
              {/* Metallic highlight accent */}
              <path
                d="M 9 12 L 9 25 C 9 27 15 27 15 25 L 15 8"
                stroke="var(--sticky)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Margin Punch Hole & Percentage */}
      <div className="flex flex-col items-center mt-2 opacity-70">
        <span className="font-mono text-[9px] font-bold text-ink/70">
          {Math.round(progress * 100)}%
        </span>
        <div className="h-2 w-2 rounded-full border border-ink/40 bg-paper-alt shadow-inner mt-1" />
      </div>
    </aside>
  );
}








