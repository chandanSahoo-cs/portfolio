"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { SeeMore } from "./SeeMore";

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const PROJECTS = [
  {
    name: "Mesh",
    index: "01",
    tag: "Full-stack Platform",
    image: "mesh.png",
    domain: "mesh-ochre.vercel.app",
    desc: "A modern full-stack communication and collaboration platform featuring real-time channels, server-based communities, voice rooms, and fine-grained role permissions.",
    highlights: [
      "Real-time WebSocket chat",
      "LiveKit voice infrastructure",
      "Turborepo monorepo architecture",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "ConvexDB",
      "Liveblocks",
      "LiveKit",
      "Turborepo",
    ],
    color: "var(--sticky)",
    url: "https://mesh-ochre.vercel.app/",
    github: "https://github.com/chandanSahoo-cs/mesh-turborepo",
  },
  {
    name: "QuickQuill",
    index: "02",
    tag: "Collaborative Editor",
    image: "quickquill.png",
    domain: "quickquill-swart.vercel.app",
    desc: "A powerful, real-time collaborative document and code editor built with integrated Git-like version snapshots, live multi-cursor presence, and visual diff checking.",
    highlights: [
      "Multiplayer live cursors",
      "Git-style version branches",
      "Integrated diff checker",
    ],
    stack: ["Next.js", "TypeScript", "ConvexDB", "Liveblocks", "Tailwind CSS"],
    color: "var(--leaf)",
    url: "https://quickquill-swart.vercel.app/",
    github: "https://github.com/chandanSahoo-cs/QuickQuill",
  },
];

const FUN_PROJECTS = [
  {
    name: "Pinkify",
    tag: "VS Code Theme",
    desc: "A stylish pinkish aesthetic theme for Visual Studio Code featuring soft contrast, vibrant syntax highlighting, and dual light/dark modes.",
    stack: ["TypeScript", "VS Code API"],
    color: "var(--marker)",
    stats: "260+ installs",
    url: "https://marketplace.visualstudio.com/items?itemName=Realm.pinkify-theme",
    github: "https://github.com/chandanSahoo-cs/vscode-pinkify-extension",
  },
  {
    name: "Gifrot",
    tag: "VS Code Extension",
    desc: "A fun sidebar extension for VS Code that embeds customized looping GIFs inside a dedicated workbench view with direct URL triggers.",
    stack: ["TypeScript", "VS Code API"],
    color: "var(--pen-blue)",
    stats: "20 installs",
    url: "https://marketplace.visualstudio.com/items?itemName=Realm.gifrot",
    github: "https://github.com/chandanSahoo-cs/vscode-gifrot-extension",
  },
  {
    name: "Youtube Time",
    tag: "Chrome Extension",
    desc: "A Chrome extension to track your YouTube watch time and video history.",
    stack: ["Javascript", "Chrome Extension APIs"],
    color: "var(--leaf)",
    stats: null,
    url: null,
    github: "https://github.com/chandanSahoo-cs/youtube-time",
  },
];

export default function ProjectSection() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-6 py-20">
      <SectionLabel index="01" title="things I've built" />

      {/* Main Spotlight Project Cards */}
      <SeeMore
        initialCount={2}
        items={PROJECTS}
        className="mt-12 grid gap-10 sm:grid-cols-2"
        renderItem={(p, i) => (
          <Reveal key={p.name} rotate={i % 2 === 0 ? -1.2 : 1.2} delay={i * 90}>
            <div className="group rough-border-thick relative flex h-full flex-col overflow-hidden bg-paper transition-all duration-300">

              {/* Project Preview Image with Hover Lift */}
              <div className="relative aspect-12/6 w-full overflow-hidden bg-ink/5">
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-ink/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Perforated Scrapbook Ticket Separator */}
              <div aria-hidden="true" className="relative h-4 w-full shrink-0 bg-paper-alt">
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dashed border-ink/40" />
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                  <span className="bg-paper-alt px-3 font-mono text-[10px] tracking-widest text-ink-soft">
                    ✂ — — — — — — — — — — —
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block border border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink bg-paper-alt">
                    {p.tag}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-marker-dark font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-marker animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-marker-dark">
                  {p.name}
                </h3>

                <p className="mt-3 font-body text-[14px] leading-relaxed text-ink-soft">
                  {p.desc}
                </p>

                {/* Key Feature Highlights */}
                <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3 font-mono text-xs">
                  {p.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-ink-soft">
                      <span className="text-marker font-bold">▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-ink/40 bg-paper-alt px-2 py-0.5 font-mono text-[10px] text-ink font-medium transition-colors hover:border-ink hover:bg-paper"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/15 pt-5">
                  {p.url && (
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border flex items-center gap-1.5 bg-marker px-4 py-2 font-mono text-xs font-bold text-paper transition-all hover:bg-marker-dark"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo ↗
                    </Link>
                  )}
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border flex items-center gap-1.5 bg-paper px-4 py-2 font-mono text-xs font-bold text-ink transition-all hover:bg-ink hover:text-paper"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Source ↗
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      />

      {/* Weekend Builds Subheader */}
      <div className="mt-20 flex items-center gap-3">
        <p className="font-hand text-2xl text-ink-soft">
          Weekend builds, browser extensions, and things I made for fun.
        </p>
      </div>

      {/* Weekend Projects Sticky Note Grid */}
      <SeeMore
        initialCount={3}
        items={FUN_PROJECTS}
        className="mt-6 grid gap-6 sm:grid-cols-2"
        renderItem={(p, i) => (
          <Reveal key={p.name} rotate={i % 2 === 0 ? 1.2 : -1.2} delay={i * 80}>
            <div className="rough-border group relative flex h-full flex-col overflow-hidden bg-paper-alt p-6 transition-all duration-300 hover:bg-paper">
              {/* Tape on top */}
              <div
                className="tape pointer-events-none -top-3 left-1/2 -translate-x-1/2 opacity-70"
                style={{ width: "60px", height: "20px" }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between">
                <span
                  className="border border-ink px-2 py-0.5 font-mono text-[10px] font-bold text-ink"
                  style={{ background: p.color }}
                >
                  {p.tag}
                </span>
                {p.stats && (
                  <span className="font-mono text-xs font-bold text-marker-dark">
                    ★ {p.stats}
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-xl tracking-tight text-ink transition-colors group-hover:text-marker-dark">
                {p.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                {p.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-ink/30 bg-paper px-2 py-0.5 font-mono text-[10px] text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 border-t border-ink/15 pt-4">
                {p.url && (
                  <Link
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rough-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 font-mono text-[11px] font-bold text-ink transition-all hover:bg-ink hover:text-paper"
                  >
                    Marketplace ↗
                  </Link>
                )}
                {p.github && (
                  <Link
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rough-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 font-mono text-[11px] font-bold text-ink transition-all hover:bg-ink hover:text-paper"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    GitHub ↗
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        )}
      />
    </section>
  );
}
