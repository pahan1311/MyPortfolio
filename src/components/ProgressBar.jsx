import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: { scrub: 0.3 },
    });
  });

  return <div id="progress" ref={barRef}></div>;
}
