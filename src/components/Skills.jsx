import Reveal from "./Reveal";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <section id="skills">
      <div className="eyebrow-line">
        <span className="num">03</span>
        <div className="rule"></div>
      </div>
      <Reveal as="h2" className="section-title">
        Toolbox
      </Reveal>
      <Reveal className="skill-grid">
        {skills.map((s) => (
          <div className="skill-cell" key={s.title}>
            <h4>{s.title}</h4>
            <div className="items">{s.items}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
