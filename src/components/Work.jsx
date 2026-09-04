import Reveal from "./Reveal";
import { projects } from "../data/content";

export default function Work() {
  return (
    <section id="work">
      <div className="eyebrow-line">
        <span className="num">02</span>
        <div className="rule"></div>
      </div>
      <Reveal as="h2" className="section-title">
        Selected work
      </Reveal>

      {projects.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08} className="project">
          <div className="yr">{p.year}</div>
          <div>
            <h3>{p.title}</h3>
            <p className="desc">{p.desc}</p>
            <div className="stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="links">
              <a href={p.caseStudyUrl}>Case study</a>
              <a href={p.repoUrl}>Repo</a>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
