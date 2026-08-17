export default function SectionLabel({
  index,
  title,
  accent = "var(--marker-dark)",
}: {
  index: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-sm" style={{ color: accent }}>
        {index}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      <span className="h-0.75 flex-1 bg-ink/15" />
    </div>
  );
}