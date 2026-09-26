import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "../lib/gsap";
import { onAnchorClick } from "../lib/scroll";
import { hero, profile } from "../data/content";
import NetworkCanvas from "./NetworkCanvas";
import Magnetic from "./Magnetic";

const [headPre, headPost] = hero.headline.split(hero.headlineAccent);

export default function Hero({ ready }) {
  const scope = useRef(null);
  const h1Ref = useRef(null);
  const termRef = useRef(null);

  // The page's one orchestrated "load moment", kicked off by the preloader.
  useGSAP(
    () => {
      if (!ready) return;
      gsap.set(scope.current, { autoAlpha: 1 });

      const caret = '<span class="t-caret"></span>';
      const allLines = hero.terminalLines.map((l) => l.text).join("\n");

      if (reducedMotion()) {
        termRef.current.innerHTML = allLines + caret;
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      SplitText.create(h1Ref.current, {
        type: "lines,words",
        mask: "lines",
        wordsClass: "word",
        autoSplit: true,
        // Return just this tween so a re-split (font load, resize) swaps only it.
        onSplit: (self) => {
          const words = gsap.from(self.words, { yPercent: 115, rotate: 4, duration: 1.3, stagger: 0.035, ease: "expo.out" });
          tl.add(words, 0.15);
          return words;
        },
      });

      tl.from(".hero-meta > *", { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, 0)
        .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 1.1 }, 0.7)
        .from(".hero-cta .magnetic", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.8)
        .from(".terminal", { y: 60, autoAlpha: 0, rotateX: 18, duration: 1.4, transformPerspective: 900 }, 0.8)
        .from(".hero-canvas, .hero-aurora", { autoAlpha: 0, duration: 2, ease: "power2.out" }, 0);

      // Type the terminal lines in after the terminal lands.
      let acc = "";
      termRef.current.innerHTML = caret;
      const typeAt = tl.duration() - 0.6;
      let t = typeAt;
      hero.terminalLines.forEach((line) => {
        t += line.delay / 1000 + 0.05;
        tl.call(
          () => {
            acc += (acc ? "\n" : "") + line.text;
            termRef.current.innerHTML = acc + caret;
          },
          null,
          t
        );
      });

      // Scroll-out: content drifts up and fades while the backdrop lags behind.
      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-canvas", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { dependencies: [ready], scope }
  );

  return (
    <section id="intro" className="hero" ref={scope}>
      <div className="hero-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <NetworkCanvas />

      <div className="container hero-inner">
        <div className="hero-meta">
          <span className="chip">
            <span className="dot" />
            {profile.status}
          </span>
          <span>{profile.role}</span>
          <span>{profile.location}</span>
          <a href="#about" className="scroll-hint" onClick={onAnchorClick}>
            scroll <span className="scroll-line" />
          </a>
        </div>

        <h1 ref={h1Ref}>
          {headPre}
          <em className="accent">{hero.headlineAccent}</em>
          {headPost}
        </h1>

        <div className="hero-bottom">
          <div>
            <p className="hero-sub">{hero.sub}</p>
            <div className="hero-cta">
              <Magnetic>
                <a href="#work" className="btn btn-primary" onClick={onAnchorClick}>
                  <span>View selected work</span>
                  <span className="btn-arrow">↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn" onClick={onAnchorClick}>
                  <span>Get in touch</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="terminal">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
              <em>~/whoami.ts</em>
            </div>
            <pre ref={termRef}></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
