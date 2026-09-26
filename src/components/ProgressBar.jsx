import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

export default function ProgressBar() {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  return <div id="progress" ref={barRef}></div>;
}
