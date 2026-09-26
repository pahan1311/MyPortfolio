import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";

// Wrap any block in <Reveal> to fade+slide it in once, the first time
// it scrolls into view. Pass `delay` to stagger multiple Reveals in a group.
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
