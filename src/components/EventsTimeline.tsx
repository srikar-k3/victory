"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type EventItem = { title: string; subtitle: string; href?: string };

export default function EventsTimeline({ events }: { events: EventItem[] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [step, setStep] = useState(320);

  const updateLayout = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const first = track.querySelector<HTMLLIElement>("li");
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const itemW = first.offsetWidth;
    const stepW = Math.ceil(itemW + gap);
    const visibleCount = Math.max(1, Math.floor(vp.clientWidth / stepW));
    setVisible(visibleCount);
    setStep(stepW);
    setIndex((prev) => Math.min(prev, Math.max(0, events.length - visibleCount)));
  }, [events.length]);

  useEffect(() => {
    updateLayout();
    const ro = new ResizeObserver(updateLayout);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [updateLayout]);

  const canPrev = index > 0;
  const canNext = index + visible < events.length;

  const go = (dir: 1 | -1) => {
    setIndex((i) => {
      const next = Math.max(0, Math.min(i + dir * visible, events.length - visible));
      return next;
    });
  };

  const translateX = -(index * step);

  return (
    <div className="relative hidden md:block py-20 mt-8">
      {/* Center line across viewport */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--c-dark)] opacity-25 pointer-events-none" aria-hidden />

      {/* Arrow controls */}
      <button
        type="button"
        aria-label="Previous events"
        onClick={() => go(-1)}
        disabled={!canPrev}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full grid place-items-center bg-white shadow ring-1 ring-black/5 disabled:opacity-40"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next events"
        onClick={() => go(1)}
        disabled={!canNext}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full grid place-items-center bg-white shadow ring-1 ring-black/5 disabled:opacity-40"
      >
        ›
      </button>

      {/* Viewport */}
      <div ref={viewportRef} className="overflow-x-hidden overflow-y-visible">
        <ul
          ref={trackRef}
          className="relative flex flex-nowrap items-center gap-12 lg:gap-16 px-8"
          style={{ transform: `translateX(${translateX}px)`, transition: "transform 400ms ease" }}
        >
          {events.map((e, i) => (
            <li key={i} className="relative flex-none w-[22rem] lg:w-[26rem] h-[22rem] lg:h-[24rem]">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--c-accent)] ring-4 ring-white" aria-hidden />
              <div className={`absolute left-1/2 -translate-x-1/2 w-full ${i % 2 === 0 ? "bottom-[calc(50%+48px)]" : "top-[calc(50%+48px)]"}`}>
                <article className="card-accent px-6 py-6 min-h-[7.5rem]">
                  <div className="text-body font-medium">
                    {e.href ? (
                      <Link href={e.href} className="underline underline-offset-4 decoration-current">
                        {e.title}
                      </Link>
                    ) : (
                      e.title
                    )}
                  </div>
                  <div className="text-body-sm mt-1 text-[var(--c-primary)]">{e.subtitle}</div>
                </article>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
