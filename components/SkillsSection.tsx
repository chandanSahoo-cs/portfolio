import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const SKILLS = [
  { group: "Languages", items: ["Javascript", "TypeScript", "C++", "SQL"] },
  {
    group: "Frameworks / Libraries",
    items: ["React.js", "Next.js", "Liveblocks", "LiveKit"],
  },
  { group: "Databases", items: ["MongoDB", "PostgresSQL", "ConvexDB"] },
  { group: "Developer Tools", items: ["Git", "VS Code", "Neovim"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <SectionLabel index="04" title="toolbox" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {SKILLS.map((s, i) => (
          <Reveal key={s.group} rotate={i % 2 === 0 ? 1 : -1} delay={i * 70}>
            <div className="rough-border group bg-paper-alt p-5 transition-all">
              <h3 className="font-hand text-xl text-marker-dark transition-transform duration-200 group-hover:translate-x-1">
                {s.group}
              </h3>
              <ul className="mt-3 space-y-1.5 font-mono text-sm">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 transition-transform duration-150 hover:translate-x-1"
                  >
                    <span className="text-marker transition-transform duration-150 group-hover:scale-125">
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
