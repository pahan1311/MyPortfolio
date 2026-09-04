# Portfolio — React + GSAP

A content-heavy, motion-driven developer portfolio built with React, Vite, and GSAP (ScrollTrigger).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to Vercel, Netlify, GitHub Pages, or any static host.

## Structure

```
src/
  data/content.js        <- edit this ONE file to change all the text
  components/
    Sidebar.jsx           <- name, nav, social links
    Hero.jsx               <- headline + typed-terminal intro (the load animation)
    Reveal.jsx               <- reusable scroll-reveal wrapper (GSAP + ScrollTrigger)
    About.jsx, Work.jsx, Skills.jsx, Experience.jsx, Contact.jsx
    ProgressBar.jsx        <- top scroll-progress line
  App.jsx                 <- page shell, active-nav scroll-spy
  App.css                 <- component styles
  index.css               <- design tokens (colors, fonts) - change the palette here
```

## Customizing content

Open `src/data/content.js` - it exports plain objects/arrays for your name, bio,
projects, skills, experience, and contact info. Nothing else needs to change to
update the words on the page.

## Customizing design

Color and spacing tokens live at the top of `src/index.css` as CSS variables
(`--ink`, `--paper`, `--accent`, etc). Change those to reskin the whole site.

## How the GSAP integration works

- Uses `@gsap/react`'s `useGSAP()` hook instead of raw `useEffect`, which
  automatically cleans up tweens/ScrollTriggers on unmount - important in
  React so you don't leak ScrollTrigger instances on re-renders or HMR.
- `Reveal.jsx` is the one reusable animation primitive: wrap any section in
  `<Reveal>` and it fades/slides in once, the first time it scrolls into view.
- `Hero.jsx` runs the one deliberate "load moment" - a typed terminal
  animation - kept separate from the scroll reveals so there's a single
  orchestrated entrance rather than motion firing everywhere at once.
- `App.jsx` uses `ScrollTrigger.create()` per section to drive the active
  state in the sidebar nav as you scroll (no extra library needed for that).

## Adding a resume PDF

Drop a file at `public/resume.pdf` - the sidebar already links to `/resume.pdf`.
