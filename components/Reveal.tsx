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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) rotate(${rotate}deg)`
          : `translateY(28px) rotate(${rotate * 3}deg)`,
        transition: `opacity 0.6s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 0.6s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
