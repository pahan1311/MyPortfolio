import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "../lib/gsap";

// "01 / About ———" eyebrow + big title whose words rise out of masked lines
// the first time the heading scrolls into view.
export default function SectionHeading({ index, label, title }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      tl.from(".sh-rule", { scaleX: 0, transformOrigin: "left center", duration: 1.4 }, 0).from(
        ".sh-meta > *",
        { yPercent: 100, duration: 0.9, stagger: 0.06 },
        0
      );

      const h2 = ref.current.querySelector("h2");
      if (h2) {
        SplitText.create(h2, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            const words = gsap.from(self.words, { yPercent: 110, duration: 1.2, stagger: 0.04, ease: "expo.out" });
            tl.add(words, 0.1);
            return words;
          },
        });
      }
    },
    { scope: ref }
  );

  return (
    <div className="section-heading" ref={ref}>
      <div className="sh-top">
        <div className="sh-meta">
          <span className="num">{index}</span>
          <span className="label">{label}</span>
        </div>
        <div className="sh-rule" />
      </div>
      {title && <h2>{title}</h2>}
    </div>
  );
}
