"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { SeeMore } from "./SeeMore";

const PROJECTS = [
  {
    name: "Mesh",
    tag: "spotlight",
    image: "mesh.png",
    desc: "Mesh is a modern full-stack communication platform, enabling real-time messaging, server-based collaboration, friend interactions, role-based permissions, and voice support.",
    stack: [
      "Next.js",
      "Typescript",
      "ConvexDB",
      "Liveblocks",
      "LiveKit",
      "Turborepo",
    ],
    color: "var(--sticky)",
    preview: "map" as const,
    url: "https://mesh-ochre.vercel.app/",
    github: "https://github.com/chandanSahoo-cs/mesh-turborepo",
  },
  {
    name: "QuickQuill",
    tag: "spotlight",
    image: "quickquill.png",
    desc: "A powerful, real-time collaborative editor designed to streamline teamwork on documents and code. Built with Next.js and styled with Shadcn UI, it offers a seamless live editing experience coupled with robust Git-like version control and an integrated diff checker.",
    stack: ["Next.js", "Typescript", "ConvexDB", "Liveblocks"],
    color: "var(--leaf)",
    preview: "terminal" as const,
    url: "https://quickquill-swart.vercel.app/",
    github: "https://github.com/chandanSahoo-cs/QuickQuill",
  },
];

const FUN_PROJECTS = [
  {
    name: "Pinkify",
    tag: "VS Code Marketplace",
    desc: "Give your Visual Studio Code a stylish pinkish tint with the Pinkify Theme! This theme adds soft contrast, vibrant syntax highlighting, and works with both light and dark modes.",
    stack: ["TypeScript", "VS Code API"],
    color: "var(--leaf)",
    stats: "260+ installs",
    url: "https://marketplace.visualstudio.com/items?itemName=Realm.pinkify-theme",
    github: "https://github.com/chandanSahoo-cs/vscode-pinkify-extension",
  },
  {
    name: "Gifrot",
    tag: "VS Code Marketplace",
    desc: "GifRot is a simple Visual Studio Code extension that displays a GIF inside a dedicated sidebar view. Users can change the GIF by providing any direct GIF URL through the extension's view actions.",
    stack: ["TypeScript", "VS Code API"],
    color: "var(--pen-blue)",
    stats: "20 installs",
    url: "https://marketplace.visualstudio.com/items?itemName=Realm.gifrot",
    github: "https://github.com/chandanSahoo-cs/vscode-gifrot-extension",
  },
];

export default function ProjectSection() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-6 py-20">
      <SectionLabel index="01" title="things I've built" />
      <SeeMore
        initialCount={2}
        items={PROJECTS}
        className="mt-10 grid gap-8 sm:grid-cols-2"
        renderItem={(p, i) => (
          <Reveal key={i} rotate={i % 2 === 0 ? -1.5 : 1.5} delay={i * 80}>
            <div className="group rough-border-thick relative flex h-full flex-col overflow-hidden bg-paper">
              <div className="relative aspect-12/6 w-full overflow-hidden bg-ink/5">
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  priority={i === 0}
                />
              </div>

              {/* Separator between preview and content */}
              <div aria-hidden className="relative h-4 w-full shrink-0">
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink" />
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                  <span className="bg-paper px-2 font-mono text-[10px] tracking-widest text-ink">
                    ✂ — — — — — — — — — — — — — — — — —
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span
                  className="inline-block w-fit border border-ink px-2 py-0.5 font-mono text-[11px] font-bold"
                  style={{ background: p.color }}>
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-ink px-2 py-0.5 font-mono text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3 border-t border-ink/15 pt-5">
                  {p.url && (
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 font-mono text-[11px] font-bold text-ink transition-all hover:bg-ink hover:text-paper">
                      Visit ↗
                    </Link>
                  )}
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 font-mono text-[11px] font-bold text-ink transition-all hover:bg-ink hover:text-paper">
                      GitHub ↗
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      />

      <p className="max-w-xl font-hand text-2xl text-ink-soft pt-15">
        Weekend builds, browser extensions, and things I made because I wanted
        them to exist.
      </p>

      <SeeMore
        initialCount={3}
        items={FUN_PROJECTS}
        className="mt-5 grid gap-8 sm:grid-cols-3"
        renderItem={(p, i) => (
          <Reveal key={i} rotate={i % 2 === 0 ? 1.5 : -1.5} delay={i * 80}>
            <div className="rough-border relative block h-full overflow-hidden bg-paper-alt">
              <div className="p-5">
                <span
                  className="inline-block border border-ink px-2 py-0.5 font-mono text-[10px] font-bold"
                  style={{ background: p.color }}>
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg">{p.name}</h3>
                <p className="mt-2 font-body text-sm text-ink-soft">{p.desc}</p>
                <p className="mt-3 border-t border-ink/15 pt-3 font-mono text-xs text-marker-dark">
                  {p.stats}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.url && (
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border inline-flex items-center gap-1 bg-paper px-2.5 py-1 font-mono text-[10px] font-bold text-ink transition-all hover:bg-ink hover:text-paper">
                      Visit ↗
                    </Link>
                  )}
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rough-border inline-flex items-center gap-1 bg-paper px-2.5 py-1 font-mono text-[10px] font-bold text-ink transition-all hover:bg-ink hover:text-paper">
                      GitHub ↗
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      />
    </section>
  );
}
