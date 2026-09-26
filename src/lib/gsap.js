// Single place to register GSAP plugins. Import gsap and friends from here
// so every component shares the same registered instance.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () => window.matchMedia("(pointer: fine)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
