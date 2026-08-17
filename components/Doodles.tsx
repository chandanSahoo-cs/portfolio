export function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 12 Q 30 4, 55 11 T 110 9 T 165 12 T 198 8"
        fill="none"
        stroke="var(--marker)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SquiggleDivider({ color = "var(--ink)" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 400 16"
      className="mx-auto w-full max-w-xs opacity-40"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 8 Q 10 0, 20 8 T 40 8 T 60 8 T 80 8 T 100 8 T 120 8 T 140 8 T 160 8 T 180 8 T 200 8 T 220 8 T 240 8 T 260 8 T 280 8 T 300 8 T 320 8 T 340 8 T 360 8 T 380 8 T 400 8"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CompassDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--paper)" strokeWidth="2" strokeDasharray="3 4" />
      <path d="M40 14 L46 40 L40 66 L34 40 Z" fill="var(--sticky)" stroke="var(--paper)" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="3" fill="var(--paper)" />
    </svg>
  );
}

export function StarBurst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z"
        fill="var(--leaf)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
