import Reveal from "./Reveal";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience">
      <div className="eyebrow-line">
        <span className="num">04</span>
        <div className="rule"></div>
      </div>
      <Reveal as="h2" className="section-title">
        Experience
      </Reveal>
      <Reveal>
        {experience.map((e) => (
          <div className="exp-row" key={e.role + e.org}>
            <div className="when">{e.when}</div>
            <div>
              <div className="role">{e.role}</div>
              <div className="org">{e.org}</div>
              <div className="note">{e.note}</div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
