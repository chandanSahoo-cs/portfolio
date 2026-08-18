import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { SeeMore } from "./SeeMore";

const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    org: "Tata Power-DDL",
    period: "June, 2026 - July, 2026",
    desc: " Built a graph-based request clubbing system using Disjoint Set Union (Union-Find) to consolidate shutdown requests across connected electrical zones",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <SectionLabel index="03" title="where I've worked" />
      <SeeMore
        initialCount={3}
        items={EXPERIENCE}
        className="mt-10 space-y-6"
        renderItem={(e, i) => (
          <Reveal
            key={i}
            rotate={i % 2 === 0 ? -0.6 : 0.6}
            delay={i * 90}>
            <div className="rough-border flex flex-col gap-2 bg-paper p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-xl">{e.role}</h3>
                <p className="font-mono text-sm text-marker-dark">{e.org}</p>
                <p className="mt-2 max-w-lg font-body text-[15px] text-ink-soft">
                  {e.desc}
                </p>
              </div>
              <span className="font-mono text-xs text-ink-soft whitespace-nowrap">
                {e.period}
              </span>
            </div>
          </Reveal>
        )}
      />
    </section>
  );
}
