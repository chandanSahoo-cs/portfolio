"use client"
import CompetitiveSections from "@/components/CompetitiveSection";
import ContactSection from "@/components/ContactSection";
import DoodleCanvas from "@/components/DoodleCanvas";
import { SquiggleDivider } from "@/components/Doodles";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PlaneLauncher from "@/components/PlaneLauncher";
import ProfileSection from "@/components/ProfileSection";
import ProjectSection from "@/components/ProjectSection";
import ScrollDoodles from "@/components/ScrollDoodles";
import SkillsSection from "@/components/SkillsSection";

// const BLOGS = [
//   {
//     title: "Why I stopped using ORMs for anything serious",
//     date: "Jun 2026",
//     excerpt:
//       "Three incidents, one migration nightmare, and what I reach for now instead.",
//   },
//   {
//     title: "A minimal mental model for Kafka partitions",
//     date: "Mar 2026",
//     excerpt: "The diagram I wish someone had shown me before my first outage.",
//   },
//   {
//     title: "Building a linter plugin from nothing",
//     date: "Nov 2025",
//     excerpt:
//       "Notes from writing Lintern — parsing, AST traversal, and publishing to npm.",
//   },
// ];

// const TECH_BOOKS = [
//   {
//     title: "Designing Data-Intensive Applications",
//     author: "Martin Kleppmann",
//     rating: 5,
//   },
//   {
//     title: "A Philosophy of Software Design",
//     author: "John Ousterhout",
//     rating: 5,
//   },
//   { title: "The Pragmatic Programmer", author: "Hunt & Thomas", rating: 4 },
//   { title: "Thinking in Systems", author: "Donella Meadows", rating: 4 },
// ];

// const NON_TECH_BOOKS = [
//   { title: "Sapiens", author: "Yuval Noah Harari", rating: 5 },
//   { title: "The Midnight Library", author: "Matt Haig", rating: 4 },
//   { title: "Atomic Habits", author: "James Clear", rating: 4 },
//   { title: "Educated", author: "Tara Westover", rating: 5 },
// ];



export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      <ScrollDoodles />
      <PlaneLauncher />
      <DoodleCanvas />
      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* PROJECTS */}
      <ProjectSection />

      <div className="py-4">
        <SquiggleDivider />
      </div>

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* SKILLS */}
      <SkillsSection />

      {/* COMPETITIVE PROGRAMMING */}
      <CompetitiveSections />

      {/* BOOKS */}
      {/* <section id="books" className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel index="07" title="books I've read" accent="var(--leaf)" />

        <h3 className="mt-10 font-hand text-2xl text-marker-dark">Tech</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {TECH_BOOKS.map((b, i) => (
            <Reveal key={b.title} rotate={i % 2 === 0 ? -1 : 1} delay={i * 60}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 font-hand text-2xl text-leaf-dark">Non-tech</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {NON_TECH_BOOKS.map((b, i) => (
            <Reveal key={b.title} rotate={i % 2 === 0 ? 1 : -1} delay={i * 60}>
              <BookCard book={b} accent="var(--leaf)" />
            </Reveal>
          ))}
        </div>
      </section> */}

      {/* PROFILES */}
      <ProfileSection />

      {/* CONTACT */}
      <ContactSection />
    </div>
  );
}

function BookCard({
  book,
  accent = "var(--marker-dark)",
}: {
  book: { title: string; author: string; rating: number };
  accent?: string;
}) {
  return (
    <div className="rough-border flex items-start gap-4 bg-paper-alt p-5">
      <div
        className="flex h-16 w-12 shrink-0 items-center justify-center border-2 border-ink font-display text-xs text-paper"
        style={{ background: "var(--ink-soft)" }}
        aria-hidden="true">
        {book.title.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <h3 className="font-display text-base leading-snug">{book.title}</h3>
        <p className="mt-1 font-mono text-xs text-ink-soft">{book.author}</p>
        <p
          className="mt-2 text-sm"
          style={{ color: accent }}
          aria-label={`${book.rating} out of 5 stars`}>
          {"★".repeat(book.rating)}
          <span className="text-ink/20">{"★".repeat(5 - book.rating)}</span>
        </p>
      </div>
    </div>
  );
}
