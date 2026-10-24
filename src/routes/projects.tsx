import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/nier/PageHero";
import { NierCorners } from "@/components/nier/NierCorners";
import { Reveal } from "@/components/nier/Reveal";
import { useState } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sofien Essghaier" },
      {
        name: "description",
        content: "A selection of full-stack, AI, and mobile projects built by Sofien Essghaier.",
      },
      { property: "og:title", content: "Projects — Sofien Essghaier" },
      {
        property: "og:description",
        content: "Full-stack, AI, and mobile projects.",
      },
    ],
  }),
  component: ProjectsPage,
});

/* ─── data ──────────────────────────────────────────────────────────────── */

type Category = "All" | "Full-Stack" | "AI" | "Mobile" | "Internship";

interface Project {
  year: string;
  title: string;
  role: string;
  desc: string;
  tags: string[];
  category: Exclude<Category, "All">;
  status: string;
  github: string | null;
  demo: string | null;
}

const categories: Category[] = ["All", "Full-Stack", "AI", "Mobile", "Internship"];

const categoryDot: Record<Exclude<Category, "All">, string> = {
  "Full-Stack": "bg-foreground",
  AI: "bg-success",
  Mobile: "bg-warning",
  Internship: "bg-danger",
};

const projects: Project[] = [
  {
    year: "2024",
    title: "PriceCompare Hub",
    role: "Full-Stack Developer",
    desc: "Full-stack price comparison platform scraping real-time product data from 5+ e-commerce sites with Puppeteer. Node.js + Express backend caches results and reduces API latency by 40%.",
    tags: ["MERN", "Puppeteer", "Tailwind CSS"],
    category: "Full-Stack",
    status: "DEPLOYED",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
  {
    year: "2024",
    title: "Web Scraper CLI",
    role: "Automation Engineer",
    desc: "TypeScript CLI for headless content extraction with typed selectors, rate limiting, retries and structured JSON output pipelines.",
    tags: ["TypeScript", "Puppeteer", "CLI"],
    category: "AI",
    status: "ONLINE",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
  {
    year: "2025",
    title: "Vapi Voice Agent",
    role: "AI Integration",
    desc: "Conversational AI assistant handling inbound calls with natural-language flows, live transcription and webhook integration into a booking system.",
    tags: ["Vapi AI", "Webhooks", "React"],
    category: "AI",
    status: "ONLINE",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
  {
    year: "2023",
    title: "Health Tracker App",
    role: "Mobile Developer",
    desc: "Mobile health tracking prototype with Firebase auth, realtime sync and offline-first storage for daily metrics.",
    tags: ["React Native", "Firebase", "Expo"],
    category: "Mobile",
    status: "PROTOTYPE",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
  {
    year: "2022",
    title: "Mutual Insurance System",
    role: "Full-Stack Trainee",
    desc: "Dual platform (web + desktop) mutual insurance management system for Compagnie des Phosphates de Gafsa. PHP + C# with MySQL.",
    tags: ["PHP", "C#", "MySQL"],
    category: "Internship",
    status: "ARCHIVED",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
  {
    year: "2021",
    title: "Employee Analytics Dashboard",
    role: "Front-End Trainee",
    desc: "HR analytics dashboard visualizing workforce data with interactive charts and reporting for Compagnie des Phosphates de Gafsa.",
    tags: ["JavaScript", "Bootstrap", "Charts"],
    category: "Internship",
    status: "ARCHIVED",
    github: "https://github.com/sofiensgh",
    demo: null,
  },
];

/* ─── component ─────────────────────────────────────────────────────────── */

function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <SiteHeader />

      <PageHero
        label="02 // Projects"
        title="PROJECTS"
        subtitle="Archive of completed missions. Each project represents a challenge solved, a solution deployed."
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal preset="fade">
          <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            // Archive.index — {String(projects.length).padStart(2, "0")} records
          </span>
        </Reveal>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                active === c
                  ? "border-foreground/60 bg-foreground/10 text-foreground"
                  : "border-foreground/15 text-foreground/60 hover:border-foreground/35 hover:text-foreground"
              }`}
            >
              [ {c} ]
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="nier-interactive animate-nier-letter group relative flex flex-col border border-foreground/10 bg-card/60 p-6 transition-colors duration-300 hover:border-foreground/25 md:p-8"
            >
              <NierCorners />
              {/* HUD bar */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  <span className={`h-1.5 w-1.5 rounded-full ${categoryDot[p.category]}`} />
                  {p.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h2>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-success">
                ● {p.status} · {p.role}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:border-ring group-hover:text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-5 border-t border-border pt-4">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                )}
                <span className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Open record <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
