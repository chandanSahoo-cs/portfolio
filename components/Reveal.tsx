"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  rotate = -1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translate3d(0, 0, 0) rotate(${rotate}deg)`
          : `translate3d(0, 20px, 0) rotate(${rotate * 1.6}deg)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
