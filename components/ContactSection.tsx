import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal rotate={-0.5}>
        <div className="rough-border-thick relative bg-ink px-8 py-16 text-center text-paper">
          <p className="font-mono text-sm text-sticky">
            {"// the plane lands here"}
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 font-hand text-2xl text-paper/80">
            Open to interesting problems and good teams.
          </p>
          <a
            href="mailto:chandansahoo02468@gmail.com"
            className="mt-8 inline-block border-[3px] border-paper bg-marker px-6 py-3 font-mono text-sm font-bold text-paper transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(247,243,233,0.5)]">
            chandansahoo02468@gmail.com
          </a>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center gap-2 text-center font-mono text-xs text-ink-soft">
        <p>
          built by hand, with a little help. © {new Date().getFullYear()}{" "}
          Chandan Sahoo.
        </p>
      </footer>
    </section>
  );
}
