"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Coffee, Rocket, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDoodles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax float on each marginal doodle
      const items = containerRef.current?.querySelectorAll(
        ".scroll-doodle-item",
      );
      items?.forEach((item) => {
        const speed = parseFloat((item as HTMLElement).dataset.speed || "0.2");
        const rotationAmount = parseFloat(
          (item as HTMLElement).dataset.rotate || "5",
        );

        gsap.fromTo(
          item,
          {
            y: 35 * speed,
            rotate: -rotationAmount,
          },
          {
            y: -45 * speed,
            rotate: rotationAmount,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 h-full w-full overflow-hidden select-none">
      {/* 1. HERO MARGIN: Hand-drawn Coffee Mug with Steam (Right side) */}
      <div
        data-speed="0.25"
        data-rotate="4"
        className="scroll-doodle-item absolute top-[380px] right-4 lg:right-12 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-center">
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
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
            {/* Cup */}
            <path
              d="M 12 24 L 16 56 C 17 62, 43 62, 44 56 L 48 24 Z"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Handle */}
            <path
              d="M 46 30 C 56 30, 56 46, 44 48"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tea/Coffee band */}
            <path
              d="M 15 36 L 45 36"
              stroke="var(--sticky)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="flex items-center gap-1 font-hand text-xs text-marker-dark rotate-[-4deg]">
            fuel.js <Coffee size={16} />
          </span>
        </div>
      </div>

      {/* 2. PROJECTS MARGIN: Code Brackets & Sparkles (Left side) */}
      <div
        data-speed="0.3"
        data-rotate="-6"
        className="scroll-doodle-item absolute top-[1100px] left-3 lg:left-10 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-start">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            {/* Curly bracket */}
            <path
              d="M 35 10 C 22 10, 20 22, 20 28 C 20 34, 12 35, 12 35 C 12 35, 20 36, 20 42 C 20 48, 22 60, 35 60"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Code tag */}
            <path
              d="M 42 22 L 54 35 L 42 48"
              stroke="var(--marker)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sparkle */}
            <path
              d="M 52 14 L 54 20 L 60 22 L 54 24 L 52 30 L 50 24 L 44 22 L 50 20 Z"
              fill="var(--sticky)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
          </svg>
          <span className="flex items-center gap-1 font-hand text-xs text-ink-soft rotate-[6deg] -mt-1">
            ship it! <Rocket size={16} />
          </span>
        </div>
      </div>

      {/* 3. EXPERIENCE MARGIN: Git Branch Tree (Right side) */}
      <div
        data-speed="0.22"
        data-rotate="5"
        className="scroll-doodle-item absolute top-[1950px] right-3 lg:right-10 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-end">
          <svg width="75" height="90" viewBox="0 0 75 90" fill="none">
            {/* Main branch stem */}
            <path
              d="M 25 10 L 25 80"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Feature branch curve */}
            <path
              d="M 25 35 C 25 48, 55 45, 55 60 L 55 80"
              stroke="var(--leaf)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Commit nodes */}
            <circle
              cx="25"
              cy="20"
              r="4.5"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              cx="25"
              cy="48"
              r="4.5"
              fill="var(--sticky)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              cx="55"
              cy="65"
              r="4.5"
              fill="var(--leaf)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              cx="25"
              cy="76"
              r="4.5"
              fill="var(--marker)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>
          <span className="font-mono text-[10px] text-leaf-dark font-bold">
            git merge --prod
          </span>
        </div>
      </div>

      {/* 4. SKILLS / TOOLBOX MARGIN: Starburst & Battery (Left side) */}
      <div
        data-speed="0.28"
        data-rotate="-4"
        className="scroll-doodle-item absolute top-[2800px] left-4 lg:left-12 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-start">
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
            {/* Battery outline */}
            <rect
              x="12"
              y="18"
              width="38"
              height="24"
              rx="3"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            {/* Battery tip */}
            <path d="M 50 26 L 54 26 L 54 34 L 50 34" fill="var(--ink)" />
            {/* Battery charge bars */}
            <rect x="16" y="22" width="8" height="16" fill="var(--marker)" />
            <rect x="26" y="22" width="8" height="16" fill="var(--sticky)" />
            <rect x="36" y="22" width="8" height="16" fill="var(--leaf)" />
          </svg>
          <span className="flex items-center gap-1 font-hand text-xs text-leaf-dark font-bold rotate-[-3deg]">
            100% charged <Zap size={16}/>
          </span>
        </div>
      </div>

      {/* 5. COMPETITIVE MARGIN: Trophy & Medal (Right side) */}
      <div
        data-speed="0.24"
        data-rotate="6"
        className="scroll-doodle-item absolute top-[3650px] right-4 lg:right-12 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-center">
          <svg width="65" height="70" viewBox="0 0 65 70" fill="none">
            {/* Trophy Cup */}
            <path
              d="M 18 16 L 47 16 L 44 42 C 43 48, 22 48, 21 42 Z"
              fill="var(--sticky)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            {/* Handles */}
            <path
              d="M 18 22 C 8 22, 8 36, 19 36"
              stroke="var(--ink)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 47 22 C 57 22, 57 36, 46 36"
              stroke="var(--ink)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Stem & Base */}
            <path
              d="M 32.5 45 L 32.5 56"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <rect
              x="20"
              y="56"
              width="25"
              height="8"
              rx="2"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>
          <span className="font-mono text-[10px] text-marker-dark font-bold">
            AC // 1500+ solved
          </span>
        </div>
      </div>

      {/* 6. PROFILES MARGIN: Postmark Stamp & Airmail (Left side) */}
      <div
        data-speed="0.26"
        data-rotate="-5"
        className="scroll-doodle-item absolute top-[4450px] left-4 lg:left-12 hidden md:block opacity-65 transition-opacity hover:opacity-100">
        <div className="flex flex-col items-start">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            {/* Postmark stamp circle */}
            <circle
              cx="35"
              cy="35"
              r="28"
              fill="none"
              stroke="var(--marker)"
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />
            {/* Wavy cancellation lines */}
            <path
              d="M 15 30 Q 25 24, 35 30 T 55 30"
              stroke="var(--marker)"
              strokeWidth="1.4"
            />
            <path
              d="M 15 40 Q 25 34, 35 40 T 55 40"
              stroke="var(--marker)"
              strokeWidth="1.4"
            />
            <circle cx="35" cy="35" r="4" fill="var(--marker)" />
          </svg>
          <span className="font-mono text-[9px] text-marker font-bold tracking-widest uppercase">
            PAR AVION ✉
          </span>
        </div>
      </div>
    </div>
  );
}
