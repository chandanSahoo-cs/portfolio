"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { soundManager } from "@/lib/audio";

export default function ScrollMarginIndicator() {
  const [activeSection, setActiveSection] = useState("top");
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = [
      { id: "top", label: "// hey, start here" },
      { id: "projects", label: "p.1 // ooh, projects" },
      { id: "experience", label: "p.2 // been around" },
      { id: "skills", label: "p.3 // stuff I'm good at" },
      { id: "competitive", label: "p.4 // I like winning" },
      { id: "profiles", label: "p.5 // find me elsewhere" },
      { id: "contact", label: "// say something" },
    ];

    const sectionElements = sections.map((s) => ({
      id: s.id,
      label: s.label,
      el: document.getElementById(s.id),
    }));

    let lastSection = "top";

    const updateScrollTarget = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      if (!isDraggingRef.current) {
        targetProgressRef.current = fraction;
      }

      // Check section in view
      const scrollMiddle = scrollTop + window.innerHeight * 0.35;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollMiddle) {
          if (lastSection !== item.label) {
            lastSection = item.label;
            setActiveSection(item.label);
            if (tagRef.current) {
              tagRef.current.textContent = item.label;
            }
          }
          break;
        }
      }
    };

    // Smooth physics lerp animation loop running at 60fps/120fps/144fps
    let lastTime = performance.now();
    const renderLoop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Exponential decay smoothing factor (butter smooth inertia)
      const smoothing = isDraggingRef.current ? 35 : 14;
      const factor = 1 - Math.exp(-smoothing * dt);

      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * factor;

      if (
        Math.abs(targetProgressRef.current - currentProgressRef.current) <
        0.0001
      ) {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      const trackHeight = trackRef.current?.clientHeight || 0;

      // 1. GPU Composited scaleY for pencil line (0 layout reflows)
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${p})`;
      }

      // 2. GPU Composited translateY for marker (0 layout reflows)
      if (markerRef.current) {
        markerRef.current.style.transform = `translate3d(-50%, ${p * trackHeight}px, 0)`;
      }

      // 3. Update percentage text without React re-renders
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(p * 100)}%`;
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("resize", updateScrollTarget, { passive: true });

    updateScrollTarget();
    currentProgressRef.current = targetProgressRef.current;
    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("resize", updateScrollTarget);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Smooth cursor interaction: scrub/drag along the scale
  const handlePointerInteraction = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const fraction = Math.min(1, Math.max(0, relativeY / rect.height));

    targetProgressRef.current = fraction;
    currentProgressRef.current = fraction; // Immediate 1:1 sync with cursor drag

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      window.scrollTo({
        top: fraction * docHeight,
        behavior: "auto",
      });
    }
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    soundManager.playClick();
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerInteraction(e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handlePointerInteraction(e.clientY);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture might already be released
      }
    }
  };

  return (
    <aside
      aria-label="Notebook scroll progress"
      className="fixed left-2 sm:left-4 md:left-6 top-24 bottom-24 z-30 hidden sm:flex flex-col items-center select-none">
      {/* Top Margin Header / Notebook Binding Punch Hole */}
      <div className="flex flex-col items-center mb-2 opacity-60 pointer-events-none">
        <div className="h-2 w-2 rounded-full border border-ink/40 bg-paper-alt shadow-inner mb-2" />
      </div>

      {/* Main Track Container with Cursor Interaction */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex-1 w-8 flex justify-center cursor-pointer touch-none pointer-events-auto group/track py-1"
        title="Drag or click to scroll">
        {/* Background Ruled Margin Line (classic red sketchbook line) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-marker/25 border-r border-dashed border-marker/40 pointer-events-none" />

        {/* Interactive Hitbox Glow on Hover/Drag */}
        <div
          className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 rounded-full transition-colors duration-150 pointer-events-none ${
            isDragging ? "bg-marker/10" : "group-hover/track:bg-marker/5"
          }`}
        />

        {/* Drawn Pencil Line (GPU-accelerated scaleY with butter smooth lerp) */}
        <div
          ref={lineRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-marker/80 rounded-full pointer-events-none origin-top will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />

        {/* Section Notch Ticks along the margin */}
        {[0.15, 0.38, 0.58, 0.75, 0.92].map((pos, idx) => (
          <div
            key={idx}
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-px bg-ink/30 pointer-events-none transition-transform group-hover/track:w-3.5 group-hover/track:bg-ink/60"
            style={{ top: `${pos * 100}%` }}
          />
        ))}

        {/* Sliding Doodle Marker (GPU-accelerated translateY with butter smooth lerp) */}
        <div
          ref={markerRef}
          className={`absolute top-0 left-1/2 -translate-y-1/2 group/marker will-change-transform ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ transform: "translate3d(-50%, 0px, 0)" }}>
          {/* Hand-drawn Paperclip SVG */}
          <div
            className={`relative transition-transform duration-200 ${
              isDragging
                ? "rotate-0 scale-125"
                : "-rotate-12 group-hover/marker:rotate-0 group-hover/marker:scale-110"
            }`}>
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="drop-shadow-sm">
              {/* Paperclip wire body */}
              <path
                d="M 8 10 L 8 26 C 8 30 16 30 16 26 L 16 7 C 16 3 5 3 5 8 L 5 28 C 5 34 20 34 20 28 L 20 12"
                stroke="var(--ink)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-200 group-hover/marker:stroke-marker"
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

            {/* Small Sticky Tag showing Current Notebook Page / Section */}
            <div
              className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-paper px-2 py-0.5 rough-border shadow-sm transition-all duration-200 pointer-events-none ${
                isDragging
                  ? "opacity-100 scale-105 shadow-md bg-sticky"
                  : "opacity-0 group-hover/track:opacity-100 sm:opacity-85"
              }`}>
              <span
                ref={tagRef}
                className="font-hand text-xs font-bold text-ink-soft">
                {activeSection}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Margin Punch Hole & Percentage */}
      <div className="flex flex-col items-center mt-2 opacity-70 pointer-events-none">
        <span
          ref={percentRef}
          className="font-mono text-[9px] font-bold text-ink/70">
          0%
        </span>
        <div className="h-2 w-2 rounded-full border border-ink/40 bg-paper-alt shadow-inner mt-1" />
      </div>
    </aside>
  );
}


