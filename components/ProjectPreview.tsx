import Image from "next/image";

type PreviewKind =
  | "map"
  | "terminal"
  | "pipeline"
  | "puzzle"
  | "browser"
  | "editor";

export default function ProjectPreview({ image }: { image: string }) {
  return (
    <div
      className="flex h-32 w-full items-center justify-center border-b-2 border-ink"
      style={{ background: "var(--paper-alt)" }}
      aria-hidden="true">
      <Image src={image} alt="mesh" height="24" width="24" />
    </div>
  );
}

function MapScene({ accent }: { accent: string }) {
  return (
    <g>
      <path
        d="M10 80 Q 40 20, 70 55 T 150 25"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="4 5"
      />
      <circle
        cx="10"
        cy="80"
        r="5"
        fill={accent}
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <path
        d="M150 15 L156 27 L150 24 L144 27 Z"
        fill="var(--marker)"
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
      <path
        d="M40 20 L45 30 L35 30 Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <path
        d="M95 45 L100 55 L90 55 Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
    </g>
  );
}

function TerminalScene({ accent }: { accent: string }) {
  return (
    <g>
      <rect
        x="8"
        y="15"
        width="144"
        height="70"
        rx="2"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="30"
        x2="152"
        y2="30"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="22" r="2.5" fill="var(--marker)" />
      <circle cx="27" cy="22" r="2.5" fill="var(--sticky)" />
      <circle cx="36" cy="22" r="2.5" fill={accent} />
      <text x="16" y="48" fontFamily="monospace" fontSize="9" fill="var(--ink)">
        $ npm run lint
      </text>
      <text x="16" y="62" fontFamily="monospace" fontSize="9" fill={accent}>
        ✓ 0 problems
      </text>
      <rect x="16" y="70" width="18" height="10" fill={accent} opacity="0.5" />
    </g>
  );
}

function PipelineScene({ accent }: { accent: string }) {
  return (
    <g>
      <rect
        x="8"
        y="40"
        width="26"
        height="20"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <rect
        x="67"
        y="40"
        width="26"
        height="20"
        fill={accent}
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.5"
      />
      <rect
        x="126"
        y="40"
        width="26"
        height="20"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <path
        d="M34 50 L64 50"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="3 3"
        markerEnd="url(#arrow1)"
      />
      <path
        d="M93 50 L123 50"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="3 3"
        markerEnd="url(#arrow1)"
      />
      <defs>
        <marker
          id="arrow1"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink)" />
        </marker>
      </defs>
    </g>
  );
}

function PuzzleScene({ accent }: { accent: string }) {
  return (
    <g>
      <rect
        x="20"
        y="20"
        width="40"
        height="40"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
        transform="rotate(-6 40 40)"
      />
      <rect
        x="90"
        y="30"
        width="40"
        height="40"
        fill={accent}
        opacity="0.55"
        stroke="var(--ink)"
        strokeWidth="2"
        transform="rotate(5 110 50)"
      />
      <circle
        cx="70"
        cy="65"
        r="4"
        fill="var(--marker)"
        stroke="var(--ink)"
        strokeWidth="1"
      />
    </g>
  );
}

function BrowserScene({ accent }: { accent: string }) {
  return (
    <g>
      <rect
        x="10"
        y="18"
        width="140"
        height="64"
        rx="2"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <line
        x1="10"
        y1="32"
        x2="150"
        y2="32"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="25" r="2.5" fill="var(--marker)" />
      <rect
        x="34"
        y="21"
        width="90"
        height="8"
        rx="3"
        fill="var(--paper-alt)"
        stroke="var(--ink)"
        strokeWidth="1"
      />
      <rect x="20" y="42" width="60" height="8" fill={accent} opacity="0.6" />
      <rect
        x="20"
        y="55"
        width="90"
        height="5"
        fill="var(--ink)"
        opacity="0.15"
      />
      <rect
        x="20"
        y="64"
        width="70"
        height="5"
        fill="var(--ink)"
        opacity="0.15"
      />
    </g>
  );
}

function EditorScene({ accent }: { accent: string }) {
  return (
    <g>
      <rect
        x="8"
        y="15"
        width="144"
        height="70"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <rect
        x="8"
        y="15"
        width="34"
        height="70"
        fill="var(--paper-alt)"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <rect
        x="16"
        y="24"
        width="18"
        height="4"
        fill="var(--ink)"
        opacity="0.3"
      />
      <rect
        x="16"
        y="33"
        width="18"
        height="4"
        fill="var(--ink)"
        opacity="0.3"
      />
      <rect x="16" y="42" width="12" height="4" fill={accent} />
      <rect
        x="50"
        y="26"
        width="60"
        height="4"
        fill="var(--pen-blue)"
        opacity="0.6"
      />
      <rect
        x="50"
        y="35"
        width="80"
        height="4"
        fill="var(--ink)"
        opacity="0.2"
      />
      <rect
        x="58"
        y="44"
        width="50"
        height="4"
        fill="var(--marker)"
        opacity="0.5"
      />
      <rect
        x="50"
        y="53"
        width="70"
        height="4"
        fill="var(--ink)"
        opacity="0.2"
      />
    </g>
  );
}
