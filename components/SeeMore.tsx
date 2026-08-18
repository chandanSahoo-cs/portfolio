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
  buttonClassName = "inline-flex items-center gap-2 border border-ink px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wide transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper",
}: SeeMoreProps<T>) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - initialCount;

  return (
    <>
      <div className={className}>
        {visibleItems.map((item, i) => renderItem(item, i))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className={buttonClassName}>
            {showAll ? "Show less ↑" : `See more (${hiddenCount}) ↓`}
          </button>
        </div>
      )}
    </>
  );
}
