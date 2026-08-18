"use client";

import { ReactNode, useState } from "react";

interface SeeMoreProps<T> {
  items: T[];
  initialCount: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  buttonClassName?: string;
}

export function SeeMore<T>({
  items,
  initialCount,
  renderItem,
  className = "mt-10 grid gap-8 sm:grid-cols-2",
  buttonClassName = "rough-border inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wide text-ink transition-all hover:bg-ink hover:text-paper",
}: SeeMoreProps<T>) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - initialCount;

  return (
    <>
      <div className={className}>
        {visibleItems.map((item, i) => (
          <div
            key={i}
            className="transition-all duration-500 ease-out"
            style={{
              animation:
                i >= initialCount
                  ? `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(i - initialCount) * 70}ms forwards`
                  : "none",
            }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className={buttonClassName}
          >
            {showAll ? "Show less ↑" : `See more (${hiddenCount}) ↓`}
          </button>
        </div>
      )}
    </>
  );
}
