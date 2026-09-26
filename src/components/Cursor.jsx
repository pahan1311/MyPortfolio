import { useRef } from "react";
import { gsap, useGSAP, finePointer } from "../lib/gsap";

// Two-part cursor: a dot that tracks tightly and a ring that trails behind.
// Hovering a link/button grows the ring; elements with data-cursor="Label"
// grow it further and show the label inside. Disabled on touch devices.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useGSAP(() => {
    if (!finePointer()) return;
    document.documentElement.classList.add("has-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    let current = null;
    let shown = false;

    const setState = (target) => {
      current = target;
      const text = target?.dataset.cursor || "";
      label.current.textContent = text;
      ring.current.classList.toggle("is-hover", !!target && !text);
      ring.current.classList.toggle("is-label", !!text);
      gsap.to(ring.current, {
        width: text ? 88 : target ? 56 : 36,
        height: text ? 88 : target ? 56 : 36,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });
    };

    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const target = e.target.closest?.("a, button, [data-cursor]") || null;
      if (target !== current) setState(target);
    };

    const leave = () => {
      shown = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(ring.current, { scale: 0.85, duration: 0.15 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3, ease: "back.out(3)" });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  });

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
