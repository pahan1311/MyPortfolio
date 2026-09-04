// Edit this file to update every piece of text on the site.

export const profile = {
  name: "Alex Rivera",
  role: "Backend & infrastructure engineer",
  status: "open to select projects",
  location: "Colombo, LK",
  github: "https://github.com/alexrivera",
  linkedin: "https://linkedin.com/in/alexrivera",
  email: "hello@alexrivera.dev",
};

export const nav = [
  { id: "intro", label: "intro", idx: "00" },
  { id: "about", label: "about", idx: "01" },
  { id: "work", label: "work", idx: "02" },
  { id: "skills", label: "skills", idx: "03" },
  { id: "experience", label: "experience", idx: "04" },
  { id: "contact", label: "contact", idx: "05" },
];

export const hero = {
  headline: "I build systems that stay up at 3am so you don't have to",
  sub: "Six years designing distributed backends and developer tooling — from payment infrastructure handling millions of daily transactions to internal platforms that cut deploy time from hours to minutes.",
  terminalLines: [
    { text: '<span class="c">$</span> whoami', delay: 0 },
    { text: '<span class="k">const</span> engineer = {', delay: 400 },
    { text: '&nbsp;&nbsp;name: <span class="s">"Alex Rivera"</span>,', delay: 250 },
    { text: '&nbsp;&nbsp;stack: [<span class="s">"Go"</span>, <span class="s">"TypeScript"</span>, <span class="s">"Rust"</span>],', delay: 250 },
    { text: '&nbsp;&nbsp;focus: <span class="s">"distributed systems"</span>,', delay: 250 },
    { text: '&nbsp;&nbsp;status: <span class="s">"shipping"</span>', delay: 250 },
    { text: "};", delay: 250 },
  ],
};

export const about = {
  paragraphs: [
    "I'm a backend-leaning software engineer based in Colombo, working mostly in Go and TypeScript. I care most about the unglamorous middle of a system — the queues, the retries, the migrations at 2am that go unnoticed because they were built right the first time.",
    "Before engineering full-time, I spent two years doing SRE work, which is the reason every service I build now ships with dashboards, alerts, and a runbook before it ships with a feature flag.",
    "Outside of work I contribute to a couple of open-source CLI tools and mentor junior engineers through a local bootcamp.",
  ],
  stats: [
    { label: "Experience", val: "6 years" },
    { label: "Based in", val: "Colombo, LK" },
    { label: "Focus", val: "Backend / Infra" },
    { label: "Currently at", val: "Meridian Systems" },
    { label: "Available", val: "Q4 2026" },
  ],
};

export const projects = [
  {
    year: "2025",
    title: "Ledger — real-time payment reconciliation engine",
    desc: "Rebuilt a legacy batch-reconciliation job into an event-driven pipeline processing 4M+ transactions a day, cutting reconciliation lag from 6 hours to under 90 seconds.",
    stack: ["Go", "Kafka", "PostgreSQL", "Terraform"],
    caseStudyUrl: "#",
    repoUrl: "#",
  },
  {
    year: "2024",
    title: "Forge — internal deploy platform",
    desc: "Designed and shipped a self-service deployment tool used by 40+ engineers, replacing a manual Jenkins process. Average deploy time dropped from 45 minutes to 6.",
    stack: ["TypeScript", "Docker", "Kubernetes"],
    caseStudyUrl: "#",
    repoUrl: "#",
  },
  {
    year: "2023",
    title: "Waypoint — API gateway & rate limiter",
    desc: "Open-source rate-limiting proxy built on a sliding-window algorithm; adopted by three external teams and now handles auth for the company's public API.",
    stack: ["Rust", "Redis", "gRPC"],
    caseStudyUrl: "#",
    repoUrl: "#",
  },
];

export const skills = [
  { title: "Languages", items: "Go · TypeScript · Rust · Python" },
  { title: "Infrastructure", items: "Kubernetes · Terraform · AWS · Docker" },
  { title: "Data", items: "PostgreSQL · Redis · Kafka · ClickHouse" },
  { title: "Practices", items: "On-call design · Load testing · CI/CD · Observability" },
];

export const experience = [
  {
    when: "2023 — now",
    role: "Senior Backend Engineer",
    org: "Meridian Systems",
    note: "Own the payments infrastructure team; led the Ledger rebuild and the migration off a monolithic billing service.",
  },
  {
    when: "2021 — 2023",
    role: "Software Engineer",
    org: "Northline Cloud",
    note: "Built Forge and three other internal developer-productivity tools from scratch.",
  },
  {
    when: "2019 — 2021",
    role: "Site Reliability Engineer",
    org: "Kestrel Data",
    note: "Managed on-call rotation and incident response for a 200+ service fleet.",
  },
];

export const contact = {
  heading: "Got something worth building? Let's talk.",
  sub: "I'm currently taking on a small number of consulting engagements starting Q4 2026, and always open to hearing about interesting backend problems.",
};
