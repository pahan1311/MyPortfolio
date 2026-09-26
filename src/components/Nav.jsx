import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "../lib/gsap";
import { onAnchorClick, lockScroll, unlockScroll } from "../lib/scroll";
import { profile, nav } from "../data/content";
import Magnetic from "./Magnetic";

const links = nav.filter((n) => n.id !== "intro");
const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2);

export default function Nav({ activeId, ready }) {
  const [open, setOpen] = useState(false);
  const scope = useRef(null);
  const header = useRef(null);
  const pill = useRef(null);
  const indicator = useRef(null);
  const nameRef = useRef(null);
  const menu = useRef(null);
  const wasOpen = useRef(false);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Slide in once the preloader clears, then hide on scroll-down / show on scroll-up.
  useGSAP(
    () => {
      if (!ready) return;
      if (!reducedMotion()) {
        gsap.from(header.current, { yPercent: -150, duration: 1, ease: "expo.out", delay: 0.4 });
      }

      const hide = gsap.to(header.current, {
        yPercent: -180,
        duration: 0.45,
        ease: "power3.inOut",
        paused: true,
      });
      ScrollTrigger.create({
        start: "top top-=200",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && !openRef.current) hide.play();
          else hide.reverse();
        },
        onLeaveBack: () => hide.reverse(),
      });
    },
    { dependencies: [ready], scope }
  );

  // Glide the pill highlight to the active section's link.
  useGSAP(
    () => {
      const link = pill.current?.querySelector(`[data-id="${activeId}"]`);
      gsap.to(indicator.current, {
        x: link ? link.offsetLeft : 0,
        width: link ? link.offsetWidth : 0,
        autoAlpha: link ? 1 : 0,
        duration: 0.55,
        ease: "power3.out",
      });
    },
    { dependencies: [activeId], scope }
  );

  // Full-screen mobile menu: circular reveal from the menu button.
  useGSAP(
    () => {
      const items = menu.current.querySelectorAll(".mm-link span, .mm-foot");
      if (open) {
        lockScroll();
        gsap
          .timeline()
          .to(menu.current, { clipPath: "circle(150% at calc(100% - 44px) 40px)", duration: 0.8, ease: "expo.inOut" })
          .fromTo(items, { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.7, ease: "expo.out" }, "-=0.35");
      } else if (wasOpen.current) {
        // Only unlock when closing — on mount the preloader owns the lock.
        unlockScroll();
        gsap.to(menu.current, { clipPath: "circle(0% at calc(100% - 44px) 40px)", duration: 0.6, ease: "expo.inOut" });
      }
    },
    { dependencies: [open], scope }
  );
  useEffect(() => {
    wasOpen.current = open;
  }, [open]);

  const scramble = () => {
    if (reducedMotion()) return;
    gsap.to(nameRef.current, {
      duration: 0.7,
      scrambleText: { text: profile.name, chars: "01<>/{}#_", speed: 0.6 },
    });
  };

  const go = (e) => {
    // Lenis ignores scrollTo while stopped, so release the menu's lock first.
    if (open) unlockScroll();
    setOpen(false);
    onAnchorClick(e);
  };

  return (
    <div ref={scope}>
      <header className="site-header" ref={header}>
        <a href="#intro" className="brand" onClick={go} onMouseEnter={scramble}>
          <span className="brand-mark">{initials}</span>
          <span className="brand-name" ref={nameRef}>{profile.name}</span>
        </a>

        <nav className="nav-pill" ref={pill} aria-label="Sections">
          <span className="nav-indicator" ref={indicator} />
          {links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              className={activeId === item.id ? "active" : ""}
              onClick={go}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <Magnetic>
            <a className="btn btn-sm" href="/resume.pdf" target="_blank" rel="noreferrer">
              <span>Resume</span>
            </a>
          </Magnetic>
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} ref={menu} aria-hidden={!open}>
        <nav>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="mm-link" onClick={go} tabIndex={open ? 0 : -1}>
              <span>
                <em>{item.idx}</em>
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="mm-foot-wrap">
          <div className="mm-foot">
            <a href={profile.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
            <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}
