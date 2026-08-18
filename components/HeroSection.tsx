import Image from "next/image";
import { ScribbleUnderline } from "./Doodles";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-6 pt-20 pb-28 sm:pt-28 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      {/* Incomplete, borderless graph grid pattern behind Name & Stickman */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-8 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_45%,black_40%,rgba(0,0,0,0.5)_68%,transparent_92%)]"
      >
        <svg
          className="h-full w-full opacity-100"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-graph-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              {/* Incomplete horizontal lines with broken segments */}
              <path
                d="M 0 0 L 30 0 M 36 0 L 48 0"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                opacity="0.22"
              />
              {/* Incomplete vertical lines with broken segments */}
              <path
                d="M 0 0 L 0 24 M 0 32 L 0 48"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="0.8"
                strokeDasharray="5 5"
                opacity="0.22"
              />
              {/* Subtle sketchy intersection ticks */}
              <path
                d="M -3 0 L 3 0 M 0 -3 L 0 3"
                stroke="var(--marker)"
                strokeWidth="0.9"
                opacity="0.32"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-graph-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex-1">
        <p className="font-mono text-sm text-marker-dark">
          {"// software engineer, based in Delhi"}
        </p>
        <h1 className="relative mt-3 font-display text-[13vw] leading-[0.9] sm:text-7xl md:text-8xl">
          Chandan
          <br />
          <span className="relative inline-block">
            Sahoo<span className="text-marker">.</span>
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5" />
          </span>
        </h1>
        <p className="mt-8 max-w-xl font-hand text-2xl text-ink-soft">
          I build backend systems that don&apos;t fall over, and the occasional
          weird little frontend toy.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rough-border bg-ink px-5 py-3 font-mono text-sm font-bold text-paper transition-all hover:bg-ink-soft hover:text-paper active:translate-y-0"
          >
            see the work ↓
          </a>
          <a
            href="#contact"
            className="rough-border bg-paper px-5 py-3 font-mono text-sm font-bold text-ink transition-all hover:bg-paper-alt active:translate-y-0"
          >
            get in touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rough-border group relative inline-flex items-center gap-2 bg-sticky px-4 py-3 font-mono text-xs font-bold text-ink transition-all hover:bg-sticky/90 active:translate-y-0"
          >
            <span>resume / cv ↗</span>
            <span className="rounded border border-ink/40 bg-paper px-1.5 py-0.5 text-[9px] uppercase tracking-wider group-hover:bg-marker group-hover:text-paper transition-colors">
              PDF
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <Image
          alt="drinking-coffee"
          src="/drinking-coffee.png"
          width="480"
          height="550"
          className="max-w-[280px] sm:max-w-[360px] md:max-w-[420px] h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
