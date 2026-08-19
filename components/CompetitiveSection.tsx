import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

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

interface CompetitivePlatform {
  platform: string;
  handle: string;
  rating: string;
  ratingLabel: string | null;
  stat: string;
  color: string;
  url: string;
  repoUrl?: string;
}

const COMPETITIVE: CompetitivePlatform[] = [
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
    repoUrl: "https://github.com/chandanSahoo-cs/code-submission",
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
            <div className="rough-border group flex flex-col justify-between h-full bg-paper-alt p-5 transition-all">
              <div>
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
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-ink/15 flex flex-wrap items-center gap-2">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rough-border flex flex-1 items-center justify-center gap-1.5 bg-paper px-3 py-1.5 font-mono text-xs font-bold text-ink transition-all hover:bg-paper hover:text-marker-dark"
                >
                  <span>Profile</span>
                  <ExternalLink className="h-3 w-3 opacity-75" />
                </a>

                {c.repoUrl && (
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View LeetCode solutions repo on GitHub"
                    className="rough-border flex flex-1 items-center justify-center gap-1.5 bg-sticky/90 px-3 py-1.5 font-mono text-xs font-bold text-ink transition-all hover:bg-sticky"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Solutions</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

