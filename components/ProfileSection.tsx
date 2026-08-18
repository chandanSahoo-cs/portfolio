import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const PROFILES = [
  {
    label: "GitHub",
    handle: "@chandanSahoo-cs",
    url: "https://github.com/chandanSahoo-cs",
  },
  {
    label: "LinkedIn",
    handle: "/in/chandansahoo-cs/",
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

export default function ProfileSection() {
  return (
    <section id="profiles" className="mx-auto max-w-5xl px-6 py-20">
      <SectionLabel index="08" title="find me elsewhere" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PROFILES.map((p, i) => (
          <Reveal key={p.label} rotate={i % 2 === 0 ? -1 : 1} delay={i * 70}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rough-border group flex items-center justify-between bg-paper-alt px-5 py-4 transition-all hover:bg-sticky/30">
              <span className="font-display text-lg transition-transform duration-200 group-hover:translate-x-1">
                {p.label}
              </span>
              <span className="font-mono text-sm text-ink-soft transition-colors duration-200 group-hover:text-ink font-medium">
                {p.handle} ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
