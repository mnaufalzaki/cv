"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { gsap as Gsap } from "gsap";
import { createAsciiReveal, type AsciiRevealController } from "ascii-reveal/core";
import { usePathname } from "next/navigation";
import { usePortfolioPreferences } from "@/components/portfolio-preferences";
import { INTRO_FONT_WAIT_MS, INTRO_RUNNING_TIMEOUT_MS } from "@/lib/portfolio-intro";
import { createPortfolioTimeline } from "@/lib/portfolio-motion";

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

const binaryColumns = Array.from({ length: 18 }, (_, column) =>
  Array.from({ length: 36 }, (_, row) => ((row * 7 + column * 11 + row * column) % 5) % 2).join("\n"),
);

export function PortfolioIntro({ children }: { children: React.ReactNode }) {
  const { language } = usePortfolioPreferences();
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(subscribeHydration, clientReady, serverReady);
  const introRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const intro = introRef.current;
    const site = siteRef.current;
    if (!hydrated || !intro || !site || !root.hasAttribute("data-intro")) return;

    let cancelled = false;
    let keyboardUsed = false;
    let context: ReturnType<typeof Gsap.context> | undefined;
    let ascii: AsciiRevealController | undefined;
    let fontTimer: ReturnType<typeof setTimeout> | undefined;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finish = (keyboard = keyboardUsed || root.dataset.introKeyboard === "true") => {
      if (cancelled) return;
      cancelled = true;
      clearTimeout(fontTimer);
      clearTimeout(watchdog);
      root.removeAttribute("data-intro");
      root.removeAttribute("data-intro-reveal");
      root.removeAttribute("data-intro-keyboard");
      site.inert = false;
      context?.revert();
      if (keyboard) {
        ascii?.destroy();
        ascii = undefined;
      }
      intro.removeAttribute("data-scene");
      if (keyboard) document.querySelector<HTMLAnchorElement>(".skip-link")?.focus({ preventScroll: true });
    };

    if (pathname !== "/" || window.location.hash || motion.matches) {
      finish(false);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (cancelled) return;
      if (event.key === "Escape") {
        event.preventDefault();
        finish(true);
        return;
      }
      // Once the overlay ends, typing or opening Settings should keep focus
      // where the visitor put it and immediately finish the remaining reveal.
      if (!root.hasAttribute("data-intro")) {
        ascii?.destroy();
        ascii = undefined;
        finish(false);
        return;
      }
      keyboardUsed = true;
      if (event.key === "Tab") {
        // With no intro control, keyboard navigation opens the website directly.
        event.preventDefault();
        finish(true);
      }
    };

    function onLocationChange() {
      finish(false);
    }

    function onMotionChange(event: MediaQueryListEvent) {
      if (event.matches) finish();
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    motion.addEventListener("change", onMotionChange);

    const fontFamily = getComputedStyle(intro).fontFamily;
    const fontReady = document.fonts.load(`600 48px ${fontFamily}`).catch(() => undefined);
    const fontDeadline = new Promise<void>((resolve) => {
      fontTimer = setTimeout(resolve, INTRO_FONT_WAIT_MS);
    });
    void Promise.all([import("gsap"), Promise.race([fontReady, fontDeadline])]).then(([{ gsap }]) => {
      if (cancelled) return;
      clearTimeout(fontTimer);
      // A late chunk must not re-open an overlay that CSS already released.
      if (!root.hasAttribute("data-intro") || getComputedStyle(intro).visibility === "hidden") {
        finish(false);
        return;
      }
      root.dataset.intro = "running";
      watchdog = setTimeout(() => {
        ascii?.destroy();
        ascii = undefined;
        finish();
      }, INTRO_RUNNING_TIMEOUT_MS);
      ascii = createAsciiReveal(site, {
        preset: "decode",
        duration: "cinematic",
        // Add roughly 300 ms to the original cinematic media transition.
        speed: 0.363,
        origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        selector: "[data-reveal-order]",
        lazy: true,
      });
      context = gsap.context(() => {}, intro);
      context.add(() => {
        createPortfolioTimeline(gsap, {
          intro,
          site,
          onFade: () => {
            root.dataset.introReveal = "true";
            // Start behind the fading overlay so the page never flashes fully
            // visible before its ASCII content begins decoding.
            void ascii?.reveal();
          },
          onOverlayComplete: () => {
            root.removeAttribute("data-intro");
            root.removeAttribute("data-intro-reveal");
            site.inert = false;
            if (keyboardUsed || root.dataset.introKeyboard === "true") document.querySelector<HTMLAnchorElement>(".skip-link")?.focus({ preventScroll: true });
            keyboardUsed = false;
            root.removeAttribute("data-intro-keyboard");
          },
          onComplete: () => finish(),
        });
      });
    }).catch(() => finish(false));

    return () => {
      cancelled = true;
      clearTimeout(fontTimer);
      clearTimeout(watchdog);
      if (context) {
        root.removeAttribute("data-intro");
        root.removeAttribute("data-intro-reveal");
        site.inert = false;
        context.revert();
      }
      ascii?.destroy();
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [pathname, language, hydrated]);

  return (
    <>
      <div className="portfolio-intro" ref={introRef}>
        <div className="intro-visual" aria-hidden="true">
          <div className="intro-binary">
            {binaryColumns.map((column, index) => <span key={index}>{column}</span>)}
          </div>
          <div className="intro-rule intro-rule-top" />
          <div className="intro-sweep" />
          <span className="intro-caption">NZ / PORTFOLIO</span>
          <span className="intro-corner intro-corner-tl" />
          <span className="intro-corner intro-corner-br" />
          <div className="intro-type">
            <div className="intro-welcome">
              <div className="intro-welcome-word">
                {Array.from("WELCOME").map((letter, index) => (
                  <span className="intro-letter-mask" key={index}>
                    <span>{letter}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="intro-to-mask"><span className="intro-to">TO MY</span></div>
            <div className="intro-name-mask"><span className="intro-name">NAUFAL ZAKI</span></div>
            <div className="intro-portfolio-mask"><span className="intro-portfolio">PORTFOLIO</span></div>
          </div>
          <div className="intro-rule intro-rule-bottom" />
          <div className="intro-progress"><span className="intro-progress-fill" /></div>
        </div>
      </div>
      {/* The head bootstrap adds inert before hydration; this wrapper alone
          permits that intentional attribute difference until the effect owns it. */}
      <div className="intro-site" ref={siteRef} suppressHydrationWarning>{children}</div>
    </>
  );
}
