import { useEffect, useRef } from "react";
import { reducedMotion } from "../lib/gsap";

// Hero backdrop: drifting nodes linked into a mesh, with small "packets"
// travelling along the links — a nod to distributed systems. Nodes near the
// cursor get pushed aside and their links brighten.
const LINK_DIST = 150;
const MOUSE_RADIUS = 160;
const MAX_PACKETS = 10;

export default function NetworkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = reducedMotion();
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let nodes = [];
    let packets = [];
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(95, Math.max(30, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }));
      packets = [];
      if (still) draw();
    };

    const update = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_RADIUS && d > 0) {
          const f = (1 - d / MOUSE_RADIUS) * 1.2;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;

          const md = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
          const boost = md < MOUSE_RADIUS ? (1 - md / MOUSE_RADIUS) * 0.5 : 0;
          const alpha = (1 - d / LINK_DIST) * 0.28 + boost;
          ctx.strokeStyle = `rgba(124, 151, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          if (!still && packets.length < MAX_PACKETS && Math.random() < 0.0006) {
            packets.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.012 });
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(233, 237, 242, 0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      packets = packets.filter((p) => {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK_DIST) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.shadowColor = "#3ECF8E";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#3ECF8E";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });
    };

    const loop = () => {
      update();
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Stop burning frames once the hero has scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    if (!still) {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />;
}
