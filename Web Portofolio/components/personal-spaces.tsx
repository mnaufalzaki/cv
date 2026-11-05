"use client";

import { useEffect, useRef, useState } from "react";
import { AsciiReveal } from "ascii-reveal";
import { ArrowUpRight } from "lucide-react";
import { personalSpaces } from "@/app/personal-spaces";
import type { Language } from "@/app/portfolio-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const copy = {
  id: {
    label: "Buka ruang pribadi Naufal",
    discovery: "Kamu memperhatikan hal kecil.",
    title: "Ruang kecil",
    close: "Tutup ruang kecil",
  },
  en: {
    label: "Explore Naufal’s personal spaces",
    discovery: "You noticed the little things.",
    title: "A little space",
    close: "Close personal spaces",
  },
};

export function PersonalSpaces({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openedByHover = useRef(false);
  const t = copy[language];

  const clearHover = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = undefined;
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <Popover open={open} onOpenChange={(value) => {
      clearHover();
      setOpen(value);
    }}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="personal-spaces-trigger"
          aria-label={t.label}
          onPointerEnter={(event) => {
            if (event.pointerType !== "mouse" || open) return;
            clearHover();
            hoverTimer.current = setTimeout(() => {
              openedByHover.current = true;
              setOpen(true);
            }, 1500);
          }}
          onPointerLeave={clearHover}
          onPointerCancel={clearHover}
          onPointerDown={() => {
            clearHover();
            openedByHover.current = false;
          }}
          onKeyDown={() => { openedByHover.current = false; }}
          onBlur={clearHover}
        >
          <span className="personal-spaces-dot" aria-hidden="true" />
        </button>
      </PopoverTrigger>
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
          <p className="personal-spaces-discovery">{t.discovery}</p>
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
