import Image from "next/image";
import { ScribbleUnderline } from "./Doodles";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-6 pt-20 pb-28 sm:pt-28 flex ">
      <div>
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
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rough-border bg-ink px-5 py-3 font-mono text-sm font-bold text-paper transition hover:-translate-y-1">
            see the work ↓
          </a>
          <a
            href="#contact"
            className="rough-border bg-paper px-5 py-3 font-mono text-sm font-bold text-ink transition hover:-translate-y-1">
            get in touch
          </a>
        </div>
      </div>
      <Image
        alt="drinking-coffee"
        src="/drinking-coffee.png"
        width="700"
        height="800"
      />
    </section>
  );
}
