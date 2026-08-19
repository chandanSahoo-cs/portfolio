"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollMarginIndicator() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const sections = [
      { id: "top", label: "// hey, start here" },
      { id: "projects", label: "p.1 // ooh, projects" },
      { id: "experience", label: "p.2 // been around" },
      { id: "skills", label: "p.3 // stuff I'm good at" },
      { id: "competitive", label: "p.4 // I like winning" },
      { id: "profiles", label: "p.5 // find me elsewhere" },
      { id: "contact", label: "// say something" },
    ];

    // Cache elements to avoid repetitive querySelector/getElementById on every frame
    const sectionElements = sections.map((s) => ({
      id: s.id,
      label: s.label,
      el: document.getElementById(s.id),
    }));

    let lastSection = "top";

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction =
          docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        setProgress(scrollFraction);

        // Detect current section in view
        const scrollMiddle = scrollTop + window.innerHeight * 0.35;
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const item = sectionElements[i];
          if (item.el && item.el.offsetTop <= scrollMiddle) {
            if (lastSection !== item.label) {
              lastSection = item.label;
              setActiveSection(item.label);
            }
            break;
          }
        }
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
      className="fixed left-2 sm:left-4 md:left-6 top-24 bottom-24 z-30 hidden sm:flex flex-col items-center pointer-events-none select-none">
      {/* Top Margin Header / Notebook Binding Punch Hole */}
      <div className="flex flex-col items-center mb-2 opacity-60">
        <div className="h-2 w-2 rounded-full border border-ink/40 bg-paper-alt shadow-inner mb-2" />
      </div>

      {/* Main Track Container */}
      <div ref={trackRef} className="relative flex-1 w-6 flex justify-center">
        {/* Background Ruled Margin Line (classic red sketchbook line) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-marker/25 border-r border-dashed border-marker/40" />

        {/* Drawn Pencil Line (fills as you scroll) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-marker/80 transition-all duration-75 ease-out rounded-full"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Section Notch Ticks along the margin */}
        {[0.15, 0.38, 0.58, 0.75, 0.92].map((pos, idx) => (
          <div
            key={idx}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-ink/30"
            style={{ top: `${pos * 100}%` }}
          />
        ))}

        {/* Sliding Doodle Marker (Paperclip & Pencil Nib) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out pointer-events-auto group cursor-default"
          style={{ top: `${progress * 100}%` }}>
          {/* Hand-drawn Paperclip SVG */}
          <div className="relative -rotate-12 transition-transform duration-200 group-hover:rotate-0 group-hover:scale-110">
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

            {/* Small Sticky Tag showing Current Notebook Page / Section */}
            <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-paper px-2 py-0.5 rough-border shadow-sm opacity-0 group-hover:opacity-100 sm:opacity-85 transition-all duration-200">
              <span className="font-hand text-xs font-bold text-ink-soft">
                {activeSection}
              </span>
            </div>
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
