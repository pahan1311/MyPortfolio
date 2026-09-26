import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import Reveal from "./Reveal";
import ScrubText from "./ScrubText";
import SectionHeading from "./SectionHeading";
import { about } from "../data/content";

function Counter({ value, suffix, label, index }) {
  const ref = useRef(null);
  const numRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const decimals = (String(value).split(".")[1] || "").length;
      const o = { v: 0 };
      numRef.current.textContent = (0).toFixed(decimals);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        delay: index * 0.1,
      });
      tl.from(ref.current, { y: 40, autoAlpha: 0, duration: 1, ease: "expo.out" }).to(
        o,
        {
          v: value,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            numRef.current.textContent = o.v.toFixed(decimals);
          },
        },
        0
      );
    },
    { scope: ref }
  );

  return (
    <div className="metric" ref={ref}>
      <div className="metric-num">
        <span ref={numRef}>{value}</span>
        <span className="metric-suffix">{suffix}</span>
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" className="section container">
      <SectionHeading index="01" label="About" />
      <ScrubText className="about-lead" text={lead} />

      <div className="about-grid">
        <div className="about-body">
          {rest.map((p, i) => (
            <Reveal as="p" key={p.slice(0, 40)} delay={i * 0.08}>
              {p}
            </Reveal>
          ))}
        </div>
        <Reveal className="stat-list" delay={0.1}>
          {about.stats.map((s) => (
            <div className="stat-row" key={s.label}>
              <span className="label">{s.label}</span>
              <span className="val">{s.val}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="metrics">
        {about.metrics.map((m, i) => (
          <Counter key={m.label} index={i} {...m} />
        ))}
      </div>
    </section>
  );
}
