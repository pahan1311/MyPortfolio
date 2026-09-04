import Reveal from "./Reveal";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="about">
      <div className="eyebrow-line">
        <span className="num">01</span>
        <div className="rule"></div>
      </div>
      <Reveal className="about-grid">
        <div>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="stat-list">
          {about.stats.map((s) => (
            <div className="stat-row" key={s.label}>
              <span className="label">{s.label}</span>
              <span className="val">{s.val}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
