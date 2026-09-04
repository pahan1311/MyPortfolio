import Reveal from "./Reveal";
import { contact, profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="eyebrow-line">
        <span className="num">05</span>
        <div className="rule"></div>
      </div>
      <Reveal as="h2">{contact.heading}</Reveal>
      <Reveal as="p" className="sub">
        {contact.sub}
      </Reveal>
      <Reveal className="contact-links">
        <a href={`mailto:${profile.email}`}>
          {profile.email} <span className="arrow">↗</span>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          {profile.github.replace("https://", "")} <span className="arrow">↗</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          {profile.linkedin.replace("https://", "")} <span className="arrow">↗</span>
        </a>
      </Reveal>
      <footer>
        <span>© 2026 {profile.name}</span>
        <span>Built with React, GSAP, and too many terminal tabs</span>
      </footer>
    </section>
  );
}
