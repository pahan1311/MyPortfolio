import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { hero } from "../data/content";

export default function Hero() {
  const termRef = useRef(null);
  const scope = useRef(null);

  // This is the one orchestrated "load moment" for the whole page —
  // everything else uses scroll-triggered reveals instead.
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });
      let acc = "";

      hero.terminalLines.forEach((line) => {
        tl.call(
          () => {
            acc += (acc ? "\n" : "") + line.text;
            if (termRef.current) termRef.current.innerHTML = acc;
          },
          null,
          `+=${line.delay / 1000}`
        );
      });
    },
    { scope }
  );

  return (
    <section id="intro" className="hero" ref={scope}>
      <h1>
        {hero.headline}
        <span className="cursor"></span>
      </h1>
      <p className="sub">{hero.sub}</p>

      <div className="terminal">
        <div className="terminal-bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <pre ref={termRef}></pre>
      </div>
    </section>
  );
}
