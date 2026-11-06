"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AsciiReveal } from "ascii-reveal";
import { ArrowUpRight } from "lucide-react";
import { personalSpaces } from "@/app/personal-spaces";
import type { Language } from "@/app/portfolio-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ATTENTION_WAIT_MS = 8000;

const copy = {
  id: {
    label: "Buka ruang pribadi Naufal",
    discovery: "Kamu memperhatikan hal kecil.",
    title: "Ruang kecil",
    close: "Tutup ruang kecil",
    hint: "Arahkan kursor atau fokus ke titik selama 8 detik. Di layar sentuh, ketuk lalu tunggu 8 detik.",
  },
  en: {
    label: "Explore Naufal’s personal spaces",
    discovery: "You noticed the little things.",
    title: "A little space",
    close: "Close personal spaces",
    hint: "Hover or focus on the dot for 8 seconds. On a touch screen, tap and wait 8 seconds.",
  },
};

export function PersonalSpaces({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const waitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const waitOrigin = useRef<"hover" | "focus" | "tap" | undefined>(undefined);
  const trigger = useRef<HTMLButtonElement>(null);
  const openedByHover = useRef(false);
  const restoringFocus = useRef(false);
  const hintId = useId();
  const t = copy[language];

  const cancelWait = useCallback(() => {
    clearTimeout(waitTimer.current);
    waitTimer.current = undefined;
    waitOrigin.current = undefined;
    setWaiting(false);
  }, []);

  const startWait = (origin: "hover" | "focus" | "tap") => {
    if (open || waitTimer.current !== undefined) return;
    waitOrigin.current = origin;
    setWaiting(true);
    waitTimer.current = setTimeout(() => {
      const button = trigger.current;
      const rect = button?.getBoundingClientRect();
      const visible = rect && rect.bottom > 0 && rect.top < window.innerHeight &&
        rect.right > 0 && rect.left < window.innerWidth;
      const stillAttending = origin === "tap" || (origin === "hover"
        ? button?.matches(":hover") : document.activeElement === button);
      cancelWait();
      if (!visible || !stillAttending || document.visibilityState !== "visible") return;
      openedByHover.current = origin === "hover";
      setOpen(true);
    }, ATTENTION_WAIT_MS);
  };

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!trigger.current?.contains(event.target as Node)) cancelWait();
    };
    const visibility = () => {
      if (document.visibilityState !== "visible") cancelWait();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearTimeout(waitTimer.current);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [cancelWait]);

  return (
    <Popover open={open} onOpenChange={(value) => {
      // Only the completed attention timer can open the panel.
      if (!value) {
        cancelWait();
        setOpen(false);
      }
    }}>
      <PopoverTrigger asChild>
        <button
          ref={trigger}
          type="button"
          className="personal-spaces-trigger"
          aria-label={t.label}
          aria-describedby={hintId}
          aria-busy={waiting}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") startWait("hover");
          }}
          onPointerLeave={() => {
            if (waitOrigin.current === "hover") cancelWait();
          }}
          onPointerCancel={cancelWait}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") startWait("tap");
          }}
          onClick={() => startWait("tap")}
          onFocus={() => {
            if (!restoringFocus.current) startWait("focus");
            restoringFocus.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") cancelWait();
          }}
          onBlur={() => {
            restoringFocus.current = false;
            if (waitOrigin.current === "focus") cancelWait();
          }}
        >
          {waiting && (
            <svg className="personal-spaces-wait-ring" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <circle className="personal-spaces-wait-track" cx="16" cy="16" r="12" />
              <circle className="personal-spaces-wait-progress" cx="16" cy="16" r="12" pathLength="1" style={{ animationDuration: `${ATTENTION_WAIT_MS}ms` }} />
            </svg>
          )}
          <span className="personal-spaces-dot" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <span className="sr-only" id={hintId}>{t.hint}</span>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={10}
        collisionPadding={20}
        className="personal-spaces-panel"
        aria-label={t.title}
        onOpenAutoFocus={(event) => {
          // Discovering the dot with a mouse must not move keyboard focus.
          if (openedByHover.current) event.preventDefault();
        }}
        onCloseAutoFocus={(event) => {
          if (openedByHover.current) event.preventDefault();
          else restoringFocus.current = true;
          openedByHover.current = false;
        }}
      >
        <AsciiReveal preset="decode" duration="cinematic" speed={0.363}>
          <div className="personal-spaces-heading">
            <span className="personal-spaces-eyebrow">{t.title}</span>
            <button type="button" className="personal-spaces-close" aria-label={t.close} onClick={() => setOpen(false)}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <h2 className="personal-spaces-discovery">{t.discovery}</h2>
          <ul className="personal-spaces-list">
            {personalSpaces.map((space, index) => (
              <li key={space.slug}>
                <a className="personal-space-link" href={space.href}>
                  <span className="personal-space-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="personal-space-copy">
                    <span className="personal-space-title">{space.title}</span>
                    <span className="personal-space-description">{space.description[language]}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </AsciiReveal>
      </PopoverContent>
    </Popover>
  );
}
