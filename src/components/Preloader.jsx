import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { lockScroll, unlockScroll } from "../lib/scroll";
import { profile } from "../data/content";

// Counts 000 → 100, then wipes away like a curtain. `onDone` fires as the
// curtain starts lifting so the hero intro overlaps it instead of waiting.
export default function Preloader({ onDone }) {
  const ref = useRef(null);
  const countRef = useRef(null);

  useGSAP(
    () => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      if (reducedMotion()) {
        gsap.set(ref.current, { display: "none" });
        onDone();
        return;
      }

      lockScroll();
      const counter = { v: 0 };
      const tl = gsap.timeline();

      tl.from(".pl-name, .pl-tag", { yPercent: 100, duration: 0.8, stagger: 0.08, ease: "expo.out" })
        .to(
          counter,
          {
            v: 100,
            duration: 1.8,
            ease: "power3.inOut",
            onUpdate: () => {
              countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.1
        )
        .to(".pl-bar-fill", { scaleX: 1, duration: 1.8, ease: "power3.inOut" }, 0.1)
        .to(".pl-inner > *", { yPercent: -120, duration: 0.6, stagger: 0.04, ease: "power3.in" })
        .to(ref.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2")
        .call(
          () => {
            unlockScroll();
            onDone();
          },
          null,
          "-=0.6"
        )
        .set(ref.current, { display: "none" });

      return () => unlockScroll();
    },
    { scope: ref }
  );

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="pl-inner">
        <div className="pl-top">
          <div className="pl-mask"><span className="pl-name">{profile.name}</span></div>
          <div className="pl-mask"><span className="pl-tag">Portfolio — {new Date().getFullYear()}</span></div>
        </div>
        <div className="pl-count" ref={countRef}>000</div>
        <div className="pl-bar"><div className="pl-bar-fill" /></div>
      </div>
    </div>
  );
}
