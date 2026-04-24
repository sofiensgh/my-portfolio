import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sofien Essghaier" },
      { name: "description", content: "A selection of full-stack, AI, and mobile projects built by Sofien Essghaier." },
      { property: "og:title", content: "Projects — Sofien Essghaier" },
      { property: "og:description", content: "Full-stack, AI, and mobile projects." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    year: "2024",
    title: "PriceCompare Hub",
    role: "Full-Stack Developer",
    desc: "Full-stack price comparison platform scraping real-time product data from 5+ e-commerce sites with Puppeteer. Node.js + Express backend caches results and reduces API latency by 40%.",
    tags: ["MERN", "Puppeteer", "Tailwind"],
  },
  {
    year: "2024",
    title: "AI Interview Simulator",
    role: "Full-Stack Developer",
    desc: "AI-powered interview simulator with voice interaction, multiple interviewer personalities (friendly, strict, technical) and real-time feedback. Built with Vite, React, Express & MongoDB. Vapi AI as the voice agent.",
    tags: ["MERN", "Vapi AI", "Vite"],
  },
  {
    year: "2024",
    title: "Song Recognition App",
    role: "Mobile Developer",
    desc: "Shazam-like Android app that recognizes songs from short audio samples using audio fingerprinting. Real-time mic capture, local matching, and Firebase Firestore for cloud sync.",
    tags: ["Android", "Java/Kotlin", "Firebase"],
  },
  {
    year: "2022",
    title: "Mutual Insurance System",
    role: "Full-Stack Trainee",
    desc: "Dual-platform (web + desktop) mutual insurance management system built during my internship at Compagnie des Phosphates de Gafsa.",
    tags: ["PHP", "C#", "MySQL"],
  },
  {
    year: "2021",
    title: "Employee Analytics Dashboard",
    role: "Front-End Trainee",
    desc: "Workforce visualization dashboard built for Compagnie des Phosphates de Gafsa using HTML, CSS, JavaScript and Bootstrap.",
    tags: ["JavaScript", "Bootstrap", "HTML/CSS"],
  },
];

function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/// archive</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
          Things I&apos;ve <span className="text-gradient">built.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A selection of full-stack, AI, and mobile projects from my studies and internships.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {projects.map((p) => (
            <li
              key={p.title}
              className="group grid grid-cols-12 items-start gap-4 py-8 transition-colors hover:bg-surface/40"
            >
              <span className="col-span-2 font-mono text-sm text-muted-foreground">{p.year}</span>
              <div className="col-span-10 md:col-span-7">
                <h2 className="text-2xl font-semibold transition-colors group-hover:text-primary md:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {p.role}
                </p>
                <p className="mt-3 max-w-xl text-muted-foreground">{p.desc}</p>
              </div>
              <div className="col-span-12 flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  );
}
