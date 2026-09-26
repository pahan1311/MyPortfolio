import { useRef } from "react";
import { gsap, useGSAP, reducedMotion, finePointer } from "../lib/gsap";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import { projects } from "../data/content";

const STACK_STEP = 28; // px each stacked card sits below the previous one

function ProjectCard({ p, i }) {
  const inner = useRef(null);

  // Cursor spotlight + gentle 3D tilt.
  useGSAP(
    () => {
      if (!finePointer() || reducedMotion()) return;
      const el = inner.current;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
      gsap.set(el, { transformPerspective: 1400 });

      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        ry((px - 0.5) * 5);
        rx((0.5 - py) * 5);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: inner }
  );

  return (
    <article className="work-card" style={{ top: `calc(var(--stack-top) + ${i * STACK_STEP}px)` }}>
      <div className="work-card-inner" ref={inner}>
        <div className="wc-spot" />
        <div className="wc-content">
          <div className="wc-top">
            <span className="wc-idx">{String(i + 1).padStart(2, "0")}</span>
            <span>{p.year}</span>
          </div>
          <h3>{p.title}</h3>
          <p className="wc-desc">{p.desc}</p>
          <div className="stack">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="wc-links">
            <Magnetic strength={0.25}>
              <a className="btn btn-sm btn-primary" href={p.caseStudyUrl} data-cursor="Read">
                <span>Case study</span>
                <span className="btn-arrow">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a className="btn btn-sm" href={p.repoUrl} data-cursor="Code">
                <span>Repo</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {p.metric && (
          <div className="wc-visual" aria-label={`${p.metric.label}: ${p.metric.from} to ${p.metric.to}`}>
            <div className="wc-orb" />
            <div className="wc-grid" />
            <div className="wc-metric" aria-hidden="true">
              <span className="from">{p.metric.from}</span>
              <span className="arrow">→</span>
              <span className="to" data-text={p.metric.to}>
                {p.metric.to}
              </span>
            </div>
            <div className="wc-metric-label">{p.metric.label}</div>
          </div>
        )}
        <div className="wc-shade" />
      </div>
    </article>
  );
}

export default function Work() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".work-card", scope.current);
      const stackTop = () =>
        parseFloat(getComputedStyle(scope.current.querySelector(".work-stack")).getPropertyValue("--stack-top")) *
        (window.innerHeight / 100);

      const mm = gsap.matchMedia();

      // Desktop: cards pin on top of each other; the one underneath shrinks
      // and dims as the next slides over it.
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const range = {
            trigger: next,
            start: "top bottom",
            end: () => `top ${stackTop() + (i + 1) * STACK_STEP}px`,
            scrub: true,
            invalidateOnRefresh: true,
          };
          gsap.to(card.querySelector(".work-card-inner"), {
            scale: 0.92 - (cards.length - 2 - i) * 0.02,
            ease: "none",
            scrollTrigger: range,
          });
          gsap.to(card.querySelector(".wc-shade"), { opacity: 0.55, ease: "none", scrollTrigger: range });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card) => {
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          });
          tl.from(card.querySelectorAll(".wc-content > *"), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.07 })
            .from(card.querySelector(".wc-metric"), { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.2)
            .to(
              card.querySelector(".wc-metric .to"),
              { duration: 1.2, scrambleText: { text: "{original}", chars: "0123456789", speed: 0.5 } },
              0.3
            );
        });
      });
    },
    { scope }
  );

  return (
    <section id="work" className="section container" ref={scope}>
      <SectionHeading index="02" label="Selected work" title="Things I've shipped that are still running." />
      <div className="work-stack">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
