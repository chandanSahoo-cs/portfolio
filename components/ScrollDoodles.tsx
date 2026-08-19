"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Coffee, Rocket, Zap, GitBranch, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDoodles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const doodleItems = containerRef.current?.querySelectorAll<HTMLElement>(".scroll-doodle-item");

      doodleItems?.forEach((item) => {
        const speed = parseFloat(item.dataset.speed || "0.2");
        const rotationAmount = parseFloat(item.dataset.rotate || "5");

        // 1. Parallax scrub floating movement
        gsap.fromTo(
          item,
          {
            y: 30 * speed,
            rotate: -rotationAmount,
          },
          {
            y: -40 * speed,
            rotate: rotationAmount,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        // 2. Stroke-by-stroke hand-drawn pen animation on scroll entrance
        const strokePaths = item.querySelectorAll<SVGGeometryElement>("path, circle, rect");
        const fills = item.querySelectorAll<SVGElement>("[data-fill-fade]");
        const label = item.querySelector<HTMLElement>(".doodle-label");

        // Prepare strokes with exact pixel path lengths
        strokePaths.forEach((path) => {
          let length = 100;
          try {
            if (typeof (path as any).getTotalLength === "function") {
              length = (path as any).getTotalLength();
            } else if (path.tagName === "rect") {
              const w = parseFloat(path.getAttribute("width") || "50");
              const h = parseFloat(path.getAttribute("height") || "50");
              length = 2 * (w + h);
            } else if (path.tagName === "circle") {
              const r = parseFloat(path.getAttribute("r") || "10");
              length = 2 * Math.PI * r;
            }
          } catch (e) {
            length = 150;
          }

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });

        // Set fills to transparent initially
        if (fills.length > 0) {
          gsap.set(fills, { opacity: 0 });
        }

        if (label) {
          gsap.set(label, { opacity: 0, scale: 0.85, y: 6 });
        }

        // Create drawing timeline on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Physical pen drawing stroke animation (faster & snappy)
        tl.to(strokePaths, {
          strokeDashoffset: 0,
          duration: 0.42,
          stagger: 0.045,
          ease: "power2.out",
        });

        // Softly fill in colored backgrounds once line drawing is complete
        if (fills.length > 0) {
          tl.to(
            fills,
            {
              opacity: 1,
              duration: 0.22,
              stagger: 0.03,
              ease: "power1.out",
            },
            "-=0.18"
          );
        }

        // Pop in the handwritten label
        if (label) {
          tl.to(
            label,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.28,
              ease: "back.out(1.6)",
            },
            "-=0.14"
          );
        }
      });
    }, containerRef);
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden select-none"
    >
      {/* 1. HERO MARGIN: Hand-drawn Coffee Mug with Steam (Right side) */}
      <div
        data-speed="0.25"
        data-rotate="4"
        className="scroll-doodle-item absolute top-95 right-4 lg:right-12 hidden md:block opacity-80 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-center">
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="overflow-visible">
            {/* Steam lines */}
            <path
              d="M 22 18 Q 18 10, 24 2"
              stroke="var(--marker)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            <path
              d="M 32 20 Q 38 12, 30 4"
              stroke="var(--marker)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            {/* Cup Body Fill */}
            <path
              data-fill-fade
              d="M 12 24 L 16 56 C 17 62, 43 62, 44 56 L 48 24 Z"
              fill="var(--paper)"
            />
            {/* Cup Outline */}
            <path
              d="M 12 24 L 16 56 C 17 62, 43 62, 44 56 L 48 24 Z"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Handle */}
            <path
              d="M 46 30 C 56 30, 56 46, 44 48"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Coffee band accent */}
            <path
              d="M 15 36 L 45 36"
              stroke="var(--sticky)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="doodle-label flex items-center gap-1 font-hand text-xs text-marker-dark rotate-[-4deg] mt-1 font-bold">
            fuel.js <Coffee size={15} />
          </span>
        </div>
      </div>

      {/* 2. PROJECTS MARGIN: Code Brackets & Rocket (Left side) */}
      <div
        data-speed="0.3"
        data-rotate="-6"
        className="scroll-doodle-item absolute top-[1100px] left-3 lg:left-10 hidden md:block opacity-80 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-start">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" className="overflow-visible">
            {/* Curly bracket */}
            <path
              d="M 35 10 C 22 10, 20 22, 20 28 C 20 34, 12 35, 12 35 C 12 35, 20 36, 20 42 C 20 48, 22 60, 35 60"
              stroke="var(--ink)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Code tag arrow */}
            <path
              d="M 42 22 L 54 35 L 42 48"
              stroke="var(--marker)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sparkle star fill */}
            <path
              data-fill-fade
              d="M 52 14 L 54 20 L 60 22 L 54 24 L 52 30 L 50 24 L 44 22 L 50 20 Z"
              fill="var(--sticky)"
            />
            {/* Sparkle star outline */}
            <path
              d="M 52 14 L 54 20 L 60 22 L 54 24 L 52 30 L 50 24 L 44 22 L 50 20 Z"
              stroke="var(--ink)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="doodle-label flex items-center gap-1 font-hand text-xs text-ink-soft rotate-6 -mt-1 font-bold">
            ship it! <Rocket size={15} />
          </span>
        </div>
      </div>

      {/* 3. EXPERIENCE MARGIN: Git Branch Tree (Right side) */}
      <div
        data-speed="0.22"
        data-rotate="5"
        className="scroll-doodle-item absolute top-[1950px] right-3 lg:right-10 hidden md:block opacity-80 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-end">
          <svg width="75" height="90" viewBox="0 0 75 90" fill="none" className="overflow-visible">
            {/* Main branch stem */}
            <path
              d="M 25 10 L 25 80"
              stroke="var(--ink)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Feature branch curve */}
            <path
              d="M 25 35 C 25 48, 55 45, 55 60 L 55 80"
              stroke="var(--leaf)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Commit nodes */}
            <circle
              data-fill-fade
              cx="25"
              cy="20"
              r="4.5"
              fill="var(--paper)"
            />
            <circle
              cx="25"
              cy="20"
              r="4.5"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              data-fill-fade
              cx="25"
              cy="48"
              r="4.5"
              fill="var(--sticky)"
            />
            <circle
              cx="25"
              cy="48"
              r="4.5"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              data-fill-fade
              cx="55"
              cy="65"
              r="4.5"
              fill="var(--leaf)"
            />
            <circle
              cx="55"
              cy="65"
              r="4.5"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              data-fill-fade
              cx="25"
              cy="76"
              r="4.5"
              fill="var(--marker)"
            />
            <circle
              cx="25"
              cy="76"
              r="4.5"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>
          <span className="doodle-label flex items-center gap-1 font-mono text-[10px] text-leaf-dark font-bold mt-1">
            <GitBranch size={12} /> git merge --prod
          </span>
        </div>
      </div>

      {/* 4. SKILLS / TOOLBOX MARGIN: Battery (Left side) */}
      <div
        data-speed="0.28"
        data-rotate="-4"
        className="scroll-doodle-item absolute top-[2800px] left-4 lg:left-12 hidden md:block opacity-80 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-start">
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className="overflow-visible">
            {/* Battery fill */}
            <rect
              data-fill-fade
              x="12"
              y="18"
              width="38"
              height="24"
              rx="3"
              fill="var(--paper)"
            />
            {/* Battery outline */}
            <rect
              x="12"
              y="18"
              width="38"
              height="24"
              rx="3"
              stroke="var(--ink)"
              strokeWidth="2.2"
            />
            {/* Battery tip */}
            <path
              d="M 50 26 L 54 26 L 54 34 L 50 34"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Battery charge bars */}
            <rect
              data-fill-fade
              x="16"
              y="22"
              width="8"
              height="16"
              fill="var(--marker)"
            />
            <rect
              data-fill-fade
              x="26"
              y="22"
              width="8"
              height="16"
              fill="var(--sticky)"
            />
            <rect
              data-fill-fade
              x="36"
              y="22"
              width="8"
              height="16"
              fill="var(--leaf)"
            />
          </svg>
          <span className="doodle-label flex items-center gap-1 font-hand text-xs text-leaf-dark font-bold -rotate-3 mt-1">
            100% charged <Zap size={15} />
          </span>
        </div>
      </div>

      {/* 5. COMPETITIVE MARGIN: Trophy & Medal (Right side) */}
      <div
        data-speed="0.24"
        data-rotate="6"
        className="scroll-doodle-item absolute top-[3650px] right-4 lg:right-12 hidden md:block opacity-80 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-center">
          <svg width="65" height="70" viewBox="0 0 65 70" fill="none" className="overflow-visible">
            {/* Trophy Fill */}
            <path
              data-fill-fade
              d="M 18 16 L 47 16 L 44 42 C 43 48, 22 48, 21 42 Z"
              fill="var(--sticky)"
            />
            {/* Trophy Cup Outline */}
            <path
              d="M 18 16 L 47 16 L 44 42 C 43 48, 22 48, 21 42 Z"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Handles */}
            <path
              d="M 18 22 C 8 22, 8 36, 19 36"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 47 22 C 57 22, 57 36, 46 36"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Stem & Base */}
            <path
              d="M 32.5 45 L 32.5 56"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect
              data-fill-fade
              x="20"
              y="56"
              width="25"
              height="8"
              rx="2"
              fill="var(--paper)"
            />
            <rect
              x="20"
              y="56"
              width="25"
              height="8"
              rx="2"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>
          <span className="doodle-label flex items-center gap-1 font-mono text-[10px] text-marker-dark font-bold mt-1">
            <Trophy size={12} /> AC // 1500+ solved
          </span>
        </div>
      </div>
    </div>
  );
}
