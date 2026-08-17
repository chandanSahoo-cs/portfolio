import CompetitiveSections from "@/components/CompetitiveSection";
import ContactSection from "@/components/ContactSection";
import { SquiggleDivider } from "@/components/Doodles";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ProjectSection from "@/components/ProjectSection";
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

const PROFILES = [
  {
    label: "GitHub",
    handle: "@chandanSahoo-cs",
    url: "https://github.com/chandanSahoo-cs",
  },
  {
    label: "LinkedIn",
    handle: "/in/chandansahoo-cs",
    url: "https://www.linkedin.com/in/chandansahoo-cs/",
  },
  {
    label: "Twitter / X",
    handle: "@chandanSahoo_cs",
    url: "https://x.com/chandanSahoo_cs",
  },
  {
    label: "Email",
    handle: "chandansahoo02468@gmail.com",
    url: "mailto:chandansahoo02468@gmail.com",
  },
];

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg tracking-tight">
            CS<span className="text-marker">.</span>
          </a>
          <div className="hidden gap-4 font-mono text-[12px] xl:flex">
            <a href="#projects" className="hover:text-marker">
              projects
            </a>
            <a href="#experience" className="hover:text-marker">
              experience
            </a>
            <a href="#skills" className="hover:text-marker">
              skills
            </a>
            <a href="#competitive" className="hover:text-leaf">
              competitive
            </a>
            {/* <a href="#blogs" className="hover:text-marker">
              blogs
            </a> */}
            {/* <a href="#books" className="hover:text-leaf">
              books
            </a> */}
          </div>
          <a
            href="#contact"
            className="rough-border bg-marker px-3 py-1.5 font-mono text-xs font-bold text-paper transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)]">
            say hi
          </a>
        </nav>
      </header>

      {/* HERO */}
      <HeroSection />

      {/* PROJECTS */}
      <ProjectSection />
      {/* <section id="projects" className="relative mx-auto max-w-5xl px-6 py-20">
        <SectionLabel index="01" title="things I've built" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.name}
              rotate={i % 2 === 0 ? -1.5 : 1.5}
              delay={i * 80}>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rough-border-thick relative block h-full overflow-hidden bg-paper transition hover:-translate-y-1">
                <ProjectPreview kind={p.preview} accent={p.color} />
                <div className="p-6">
                  <span
                    className="inline-block border border-ink px-2 py-0.5 font-mono text-[11px] font-bold"
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
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="max-w-xl font-hand text-2xl text-ink-soft pt-15">
          Weekend builds, browser extensions, and things I made because I wanted
          them to exist.
        </p>
        <div className="mt-5 grid gap-8 sm:grid-cols-3">
          {FUN_PROJECTS.map((p, i) => (
            <Reveal
              key={p.name}
              rotate={i % 2 === 0 ? 1.5 : -1.5}
              delay={i * 80}>
              <a
                href={p.url}
                className="rough-border relative block h-full overflow-hidden bg-paper-alt transition hover:-translate-y-1">
                <ProjectPreview kind={p.preview} accent={p.color} />
                <div className="p-5">
                  <span
                    className="inline-block border border-ink px-2 py-0.5 font-mono text-[10px] font-bold"
                    style={{ background: p.color }}>
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-display text-lg">{p.name}</h3>
                  <p className="mt-2 font-body text-sm text-ink-soft">
                    {p.desc}
                  </p>
                  <p className="mt-3 border-t border-ink/15 pt-3 font-mono text-xs text-marker-dark">
                    {p.stat}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section> */}

      <div className="py-4">
        <SquiggleDivider />
      </div>

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* SKILLS */}
      <SkillsSection />

      {/* COMPETITIVE PROGRAMMING */}
      <CompetitiveSections />

      {/* BLOGS
      <section id="blogs" className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel index="06" title="writing" />
        <div className="mt-10 space-y-5">
          {BLOGS.map((b, i) => (
            <Reveal
              key={b.title}
              rotate={i % 2 === 0 ? -0.4 : 0.4}
              delay={i * 80}>
              <a
                href="#"
                className="rough-border flex flex-col gap-1 bg-paper p-6 transition hover:-translate-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-lg">{b.title}</h3>
                  <p className="mt-1 font-body text-sm text-ink-soft">
                    {b.excerpt}
                  </p>
                </div>
                <span className="font-mono text-xs text-marker-dark whitespace-nowrap">
                  {b.date}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section> */}

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
