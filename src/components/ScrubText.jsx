import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "../lib/gsap";

// Paragraph whose words light up one by one, tied to scroll position.
export default function ScrubText({ text, className = "", as: Tag = "p" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      SplitText.create(ref.current, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 50%", scrub: true },
            }
          ),
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
