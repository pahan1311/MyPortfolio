import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap";

// Lenis gives the page its weighted, inertial scroll. It's driven by GSAP's
// ticker so ScrollTrigger animations stay perfectly in sync with it.
let lenis = null;
let locked = false;

export function initSmoothScroll() {
  if (reducedMotion()) return () => {};

  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  if (locked) lenis.stop();

  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function lockScroll() {
  locked = true;
  document.documentElement.classList.add("is-locked");
  lenis?.stop();
}

export function unlockScroll() {
  locked = false;
  document.documentElement.classList.remove("is-locked");
  lenis?.start();
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// onClick handler for in-page "#section" links.
export function onAnchorClick(e) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    scrollTo(href);
  }
}
