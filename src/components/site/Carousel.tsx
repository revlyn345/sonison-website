"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  children: ReactNode[];
  label: string;
  /** tailwind width classes per slide */
  slideClass?: string;
};

export function Carousel({
  children,
  label,
  slideClass = "w-[86%] sm:w-[62%] lg:w-[42%]",
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const centre = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centre);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
  }, [sync, children.length]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.children[Math.max(0, Math.min(children.length - 1, i))] as
      | HTMLElement
      | undefined;
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft - 8, behavior: "smooth" });
  };

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={trackRef}
        onScroll={sync}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(active + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(active - 1);
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={`shrink-0 snap-start ${slideClass}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${children.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-1.5">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1 transition-all ${
                i === active ? "w-8 bg-accent" : "w-4 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-px bg-border">
          <button
            type="button"
            aria-label="Previous"
            disabled={atStart}
            onClick={() => goTo(active - 1)}
            className="flex h-11 w-11 items-center justify-center bg-background transition-colors hover:bg-surface disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={atEnd}
            onClick={() => goTo(active + 1)}
            className="flex h-11 w-11 items-center justify-center bg-background transition-colors hover:bg-surface disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
