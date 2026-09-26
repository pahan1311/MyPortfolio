import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/content";

export default function Skills() {
  const scope = useRef(null);
  const grid = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: grid.current, start: "top 80%", once: true },
      });
      tl.from(".bento-cell", { y: 80, autoAlpha: 0, rotateX: -10, duration: 1.2, stagger: 0.1, transformPerspective: 1000 })
        .from(".chip-list li", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.025 }, 0.4);
    },
    { scope }
  );

  // Every cell tracks the cursor, so the border glow bleeds across neighbours.
  const onMove = (e) => {
    for (const cell of grid.current.children) {
      const r = cell.getBoundingClientRect();
      cell.style.setProperty("--x", `${e.clientX - r.left}px`);
      cell.style.setProperty("--y", `${e.clientY - r.top}px`);
    }
  };

  return (
    <section id="skills" className="section container" ref={scope}>
      <SectionHeading index="03" label="Toolbox" title="The stack I reach for." />
      <div className="bento" ref={grid} onPointerMove={onMove}>
        {skills.map((s, i) => (
          <div className="bento-cell" key={s.title}>
            <div className="bento-head">
              <h4>{s.title}</h4>
              <span className="bento-idx">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <ul className="chip-list">
              {s.items.split(" · ").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
