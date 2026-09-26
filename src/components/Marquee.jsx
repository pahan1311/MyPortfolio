import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "../lib/gsap";

// Endless ticker. Scrolling fast speeds it up and skews it; it settles back
// to cruising speed when scrolling stops.
export default function Marquee({ items, reverse = false, speed = 30, className = "" }) {
  const scope = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const loop = gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 }
      );
      const skew = gsap.quickTo(track.current, "skewX", { duration: 0.4, ease: "power3" });
      const settle = gsap.delayedCall(0.15, () => skew(0)).pause();

      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = 1 + Math.min(Math.abs(v) / 400, 5);
          gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
          skew(gsap.utils.clamp(-8, 8, v / -250));
          settle.restart(true);
        },
      });
    },
    { scope }
  );

  const group = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="marquee-unit">
          <span className={`marquee-item ${i % 2 ? "outline" : ""}`}>{item}</span>
          <span className="marquee-sep">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`} ref={scope}>
      <div className="marquee-track" ref={track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
