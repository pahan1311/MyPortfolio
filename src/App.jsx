import { useEffect, useState } from "react";
import { ScrollTrigger, useGSAP } from "./lib/gsap";
import { initSmoothScroll } from "./lib/scroll";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ProgressBar from "./components/ProgressBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { nav, skills } from "./data/content";

import "./App.css";

const tickerItems = skills.flatMap((s) => s.items.split(" · ")).slice(0, 12);

export default function App() {
  const [ready, setReady] = useState(false);
  const [activeId, setActiveId] = useState(nav[0].id);

  useEffect(() => initSmoothScroll(), []);

  // Web fonts change text metrics, so re-measure every trigger once they land.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useGSAP(() => {
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveId(id),
        onEnterBack: () => setActiveId(id),
      });
    });
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ProgressBar />
      <div className="grain" aria-hidden="true" />
      <Nav activeId={activeId} ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee items={tickerItems} />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
