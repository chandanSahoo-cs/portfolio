import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const COMPETITIVE = [
  {
    platform: "Codeforces",
    handle: "@realmchan",
    rating: "1233",
    ratingLabel: "Pupil",
    stat: "595 problems solved",
    color: "var(--marker)",
    url: "https://codeforces.com/profile/Realmchan",
  },
  {
    platform: "LeetCode",
    handle: "realmchan",
    rating: "1778",
    ratingLabel: null,
    stat: "735 problems solved",
    color: "var(--sticky)",
    url: "https://leetcode.com/u/realmchan/",
  },
  {
    platform: "CodeChef",
    handle: "realm",
    rating: "1559",
    ratingLabel: "2★",
    stat: "141 problems solved",
    color: "var(--leaf)",
    url: "https://www.codechef.com/users/realm",
  },
];

export default function CompetitiveSections() {
  return (
    <section id="competitive" className="mx-auto max-w-5xl px-6 py-20">
      <SectionLabel
        index="04"
        title="competitive programming"
        accent="var(--leaf)"
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {COMPETITIVE.map((c, i) => (
          <Reveal key={c.platform} rotate={i % 2 === 0 ? -1 : 1} delay={i * 80}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rough-border group block h-full bg-paper-alt p-5 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg transition-colors group-hover:text-marker-dark">
                  {c.platform}
                </h3>
                {c.ratingLabel !== null && (
                  <span
                    className="rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold transition-transform duration-200 group-hover:scale-110"
                    style={{ background: c.color }}>
                    {c.ratingLabel}
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-ink-soft">{c.handle}</p>
              <p className="mt-4 font-display text-3xl transition-transform duration-200 group-hover:scale-105 origin-left">
                {c.rating}
              </p>
              <p className="font-mono text-xs text-ink-soft">rating</p>
              <p className="mt-3 border-t border-ink/15 pt-3 font-mono text-xs">
                {c.stat}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
