import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Sidebar from "./components/Sidebar";
import ProgressBar from "./components/ProgressBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { nav } from "./data/content";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeId, setActiveId] = useState(nav[0].id);

  useGSAP(() => {
    const triggers = nav.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveId(id),
        onEnterBack: () => setActiveId(id),
      });
    });

    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  return (
    <>
      <ProgressBar />
      <div className="shell">
        <Sidebar activeId={activeId} />
        <main>
          <Hero />
          <About />
          <Work />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
