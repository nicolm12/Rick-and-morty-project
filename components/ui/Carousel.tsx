"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  children: React.ReactNode;
}

const arrowClass =
  "absolute top-[calc(50%-0.375rem)] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-2xl leading-none text-white transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-0 sm:flex";

export default function Carousel({ label, children }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateButtons, { passive: true });
    // El observer también dispara una primera vez al empezar a observar
    const observer = new ResizeObserver(updateButtons);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updateButtons);
      observer.disconnect();
    };
  }, [updateButtons]);

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      className="relative sm:px-14"
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        disabled={!canPrev}
        aria-label="Ver anteriores"
        className={`${arrowClass} left-0`}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        disabled={!canNext}
        aria-label="Ver siguientes"
        className={`${arrowClass} right-0`}
      >
        ›
      </button>
    </div>
  );
}