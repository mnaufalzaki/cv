import type { gsap as Gsap } from "gsap";
import {
  BACKGROUND_REVEAL_DELAY_MS,
  BACKGROUND_REVEAL_DURATION_MS,
  INTRO_DURATION_MS,
  INTRO_WELCOME_DURATION_MS,
  PAGE_REVEAL_START_MS,
} from "./portfolio-intro";

type MotionElements = {
  intro: HTMLElement;
  site: HTMLElement;
  onFade: () => void;
  onOverlayComplete: () => void;
  onComplete: () => void;
};

export function createPortfolioTimeline(gsap: typeof Gsap, elements: MotionElements) {
  const { intro, site, onFade, onOverlayComplete, onComplete } = elements;
  const select = (selector: string) => intro.querySelectorAll<HTMLElement>(selector);
  const welcome = select(".intro-letter-mask > span");
  const to = intro.querySelector<HTMLElement>(".intro-to")!;
  const name = intro.querySelector<HTMLElement>(".intro-name")!;
  const portfolio = intro.querySelector<HTMLElement>(".intro-portfolio")!;
  const fontSize = parseFloat(getComputedStyle(portfolio).fontSize);
  const gap = fontSize * 0.6;
  const portfolioWidth = portfolio.getBoundingClientRect().width;
  const toWidth = to.getBoundingClientRect().width;
  const nameWidth = name.getBoundingClientRect().width;
  // Keep each phrase centered on one baseline. PORTFOLIO moves to make room
  // for the longer name, while its existing DOM node stays visible.
  const toLeft = -(toWidth + gap + portfolioWidth) / 2;
  const nameLeft = -(nameWidth + gap + portfolioWidth) / 2;
  const portfolioStart = toLeft + toWidth + gap;
  const portfolioEnd = nameLeft + nameWidth + gap;
  const darkPalette = {
    "--intro-background": "#050505", "--intro-ink": "#f3f3ee",
    "--intro-line": "#343735", "--intro-accent": "#b9d9d3", "--intro-muted": "#999e9d",
  };
  const lightPalette = {
    "--intro-background": "#f4f3ee", "--intro-ink": "#0d0f0e",
    "--intro-line": "#d0d2ca", "--intro-accent": "#304b43", "--intro-muted": "#626762",
  };
  const { "--intro-ink": darkInk, ...darkSurfaces } = darkPalette;
  const { "--intro-ink": lightInk, ...lightSurfaces } = lightPalette;
  const phase = (value: string) => { intro.dataset.scene = value; };
  const blocks = Array.from(site.querySelectorAll<HTMLElement>("[data-reveal-order]"));
  const objectsIn = (block: HTMLElement) => [
    ...(block.hasAttribute("data-motion-element") ? [block] : []),
    ...block.querySelectorAll<HTMLElement>("[data-motion-element]"),
  ];
  const words = site.querySelectorAll<HTMLElement>(".motion-word");
  const background = site.querySelector<HTMLElement>(".ambient-dots");
  const objects = blocks.flatMap(objectsIn);
  if (background) gsap.set(background, { opacity: 0 });
  gsap.set(words, { opacity: 0, y: 14 });
  gsap.set(objects, { opacity: 0, y: 14 });
  gsap.set(select(".intro-to, .intro-name, .intro-portfolio"), { opacity: 0, yPercent: 110 });
  gsap.set(select(".intro-to-mask"), { x: toLeft });
  gsap.set(select(".intro-name-mask"), { x: nameLeft });
  gsap.set(select(".intro-portfolio-mask"), { x: portfolioStart });
  gsap.set(intro, darkPalette);
  gsap.set(welcome, { opacity: 0, yPercent: 115, rotation: 7, scale: 0.94 });
  gsap.set(select(".intro-rule"), { scaleX: 0 });
  gsap.set(select(".intro-corner, .intro-caption, .intro-progress"), { opacity: 0 });

  const secondScene = INTRO_WELCOME_DURATION_MS / 1000;
  const nameScene = secondScene + 1.8;
  const fadeStart = INTRO_DURATION_MS / 1000 - 1.5;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete });
  tl.call(() => phase("welcome"), [], 0)
    .to(welcome, { opacity: 1, yPercent: 0, rotation: 0, scale: 1, duration: 0.95, stagger: 0.065 }, 0.08)
    .fromTo(select(".intro-type"), { scale: 0.96 }, { scale: 1, duration: 1.5 }, 0)
    .to(select(".intro-rule"), { scaleX: 1, duration: 1.25, stagger: 0.12 }, 0.12)
    .to(select(".intro-corner, .intro-caption, .intro-progress"), { opacity: 1, duration: 0.85, stagger: 0.08 }, 0.3)
    .to(select(".intro-binary"), { y: -36, scale: 1.035, duration: INTRO_DURATION_MS / 1000, ease: "none" }, 0)
    .fromTo(select(".intro-progress-fill"), { scaleX: 0 }, { scaleX: 1, duration: INTRO_DURATION_MS / 1000, ease: "none" }, 0)
    .call(() => phase("to-portfolio"), [], secondScene)
    .to(intro, { ...lightSurfaces, duration: 0.55, ease: "power2.inOut" }, secondScene)
    // Switch ink as the background crosses middle gray, keeping PORTFOLIO
    // readable throughout the inversion instead of blending into its backdrop.
    .set(intro, { "--intro-ink": lightInk }, secondScene + 0.27)
    .to(welcome, { yPercent: -115, opacity: 0, duration: 0.4, stagger: 0.025, ease: "power3.in" }, secondScene)
    .to(select(".intro-to"), { opacity: 1, yPercent: 0, duration: 0.7 }, secondScene + 0.3)
    .fromTo(select(".intro-portfolio"), { xPercent: 40, yPercent: 105, opacity: 0, rotation: -3 },
      { xPercent: 0, yPercent: 0, opacity: 1, rotation: 0, duration: 0.95 }, secondScene + 0.25)
    .fromTo(select(".intro-sweep"), { xPercent: -110, opacity: 0 }, { xPercent: 110, opacity: 0.65, duration: 0.9, ease: "power2.inOut" }, secondScene)
    .to(select(".intro-sweep"), { opacity: 0, duration: 0.2 }, secondScene + 0.85)
    .call(() => phase("name"), [], nameScene)
    .to(intro, { ...darkSurfaces, duration: 0.55, ease: "power2.inOut" }, nameScene)
    .set(intro, { "--intro-ink": darkInk }, nameScene + 0.28)
    .to(select(".intro-to"), { yPercent: -110, opacity: 0, duration: 0.45, ease: "power3.in" }, nameScene + 0.05)
    .to(select(".intro-to-mask"), { x: nameLeft, duration: 0.65, ease: "power3.inOut" }, nameScene)
    .to(select(".intro-name"), { yPercent: 0, opacity: 1, duration: 0.8 }, nameScene + 0.35)
    .to(select(".intro-portfolio-mask"), { x: portfolioEnd + fontSize * 0.2, duration: 0.65, ease: "power3.inOut" }, nameScene)
    .to(select(".intro-portfolio-mask"), { x: portfolioEnd, duration: 0.45 }, nameScene + 0.65)
    .to(select(".intro-rule-top"), { xPercent: 5, scaleX: 0.9, duration: 0.9 }, nameScene)
    .to(select(".intro-rule-bottom"), { xPercent: -5, scaleX: 0.9, duration: 0.9 }, nameScene)
    .call(() => { phase("fade"); onFade(); }, [], fadeStart)
    .to(intro, { opacity: 0, duration: 1.5, ease: "power2.inOut" }, fadeStart)
    .call(onOverlayComplete, [], INTRO_DURATION_MS / 1000)
    .call(() => phase("page"), [], PAGE_REVEAL_START_MS / 1000);

  for (const block of blocks) {
    const start = PAGE_REVEAL_START_MS / 1000 + Number(block.dataset.revealOrder) * 0.1;
    const blockWords = block.querySelectorAll<HTMLElement>(".motion-word");
    const blockObjects = objectsIn(block);
    if (blockWords.length) tl.to(blockWords, { opacity: 1, y: 0, duration: 0.55, stagger: { amount: 0.45 } }, start);
    if (blockObjects.length) tl.to(blockObjects, { opacity: 1, y: 0, duration: 0.55, stagger: { amount: 0.18 } }, start);
  }
  // Let the profile appear first, then introduce the peripheral binary field.
  // Keeping this tween in the same context restores it on skip or navigation.
  if (background) tl.to(background, {
    opacity: 1,
    duration: BACKGROUND_REVEAL_DURATION_MS / 1000,
    ease: "sine.inOut",
  }, (INTRO_DURATION_MS + BACKGROUND_REVEAL_DELAY_MS) / 1000);
  return tl;
}
