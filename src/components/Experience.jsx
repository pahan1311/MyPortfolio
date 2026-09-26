import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "../lib/gsap";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/content";

export default function Experience() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".tl-item", scope.current);

      // Each dot lights up as the scroll line reaches it.
      items.forEach((item) => {
        ScrollTrigger.create({ trigger: item, start: "top 65%", toggleClass: "is-active" });
      });

      if (reducedMotion()) {
        gsap.set(".tl-progress", { scaleY: 1 });
        return;
      }

      gsap.to(".tl-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 65%", end: "bottom 65%", scrub: 0.5 },
      });

      items.forEach((item) => {
        gsap.from(item.querySelectorAll(".tl-when, .tl-body > *"), {
          x: -30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section id="experience" className="section container" ref={scope}>
      <SectionHeading index="04" label="Experience" title="Where I've been on call." />
      <div className="timeline">
        <div className="tl-track">
          <div className="tl-progress" />
        </div>
        {experience.map((e) => (
          <div className="tl-item" key={e.role + e.org}>
            <span className="tl-dot" />
            <div className="tl-when">{e.when}</div>
            <div className="tl-body">
              <h3>{e.role}</h3>
              <div className="tl-org">{e.org}</div>
              <p>{e.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
