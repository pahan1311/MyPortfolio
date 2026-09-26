import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "../lib/gsap";
import { scrollTo } from "../lib/scroll";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";
import { contact, profile } from "../data/content";

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());

function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(timeZone)), 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, external: true },
  { label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin, external: true },
];

export default function Contact() {
  const scope = useRef(null);
  const titleRef = useRef(null);
  const time = useLocalTime(profile.timeZone);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      SplitText.create(titleRef.current, {
        type: "lines,chars",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 120,
            rotate: 8,
            duration: 1.2,
            stagger: 0.015,
            ease: "expo.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
          }),
      });

      gsap.from(".contact-sub, .big-btn-wrap", {
        y: 30,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-top", start: "top 75%", once: true },
      });
      gsap.from(".contact-row", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-links", start: "top 85%", once: true },
      });
    },
    { scope }
  );

  return (
    <section id="contact" className="contact" ref={scope}>
      <Marquee className="marquee-xl" items={[contact.marquee, contact.marquee]} speed={40} />

      <div className="container section">
        <SectionHeading index="05" label="Contact" />
        <div className="contact-top">
          <div>
            <h2 className="contact-title" ref={titleRef}>
              {contact.heading}
            </h2>
            <p className="contact-sub">{contact.sub}</p>
          </div>
          <div className="big-btn-wrap">
            <Magnetic strength={0.45}>
              <a className="big-btn" href={`mailto:${profile.email}`} data-cursor="Write">
                <span>Say hello</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="contact-links">
          {rows.map((r) => (
            <a
              key={r.label}
              className="contact-row"
              href={r.href}
              {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="cr-label">{r.label}</span>
              <span className="cr-value">{r.value}</span>
              <span className="cr-arrow">↗</span>
            </a>
          ))}
        </div>

        <footer>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            {profile.location} · <span className="clock">{time}</span> local
          </span>
          <span>Built with React, GSAP & Lenis</span>
          <button className="to-top" onClick={() => scrollTo(0)}>
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
