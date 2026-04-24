import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Alex Rivera" },
      { name: "description", content: "A selection of projects, products, and open-source work by Alex Rivera." },
      { property: "og:title", content: "Projects — Alex Rivera" },
      { property: "og:description", content: "Case studies, products, and open-source work." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    year: "2025",
    title: "Lumen Analytics",
    role: "Lead Engineer",
    desc: "Realtime product analytics dashboard built on ClickHouse + React. Reduced query times by 18×.",
    tags: ["React", "ClickHouse", "WebSockets"],
  },
  {
    year: "2024",
    title: "Forge CLI",
    role: "Creator",
    desc: "An opinionated build tool written in Rust. 3.4k GitHub stars, used by 200+ teams in production.",
    tags: ["Rust", "OSS", "DX"],
  },
  {
    year: "2024",
    title: "Atlas Banking",
    role: "Senior Engineer",
    desc: "Designed the onboarding pipeline for a digital bank serving 80k customers across LATAM.",
    tags: ["Node.js", "Postgres", "Fintech"],
  },
  {
    year: "2023",
    title: "Pixel Press",
    role: "Co-founder",
    desc: "A headless CMS for indie magazines with collaborative editing. Acquired in early 2024.",
    tags: ["Next.js", "CRDT", "Stripe"],
  },
  {
    year: "2023",
    title: "Echo Voice",
    role: "Engineer",
    desc: "Voice AI app that transcribes & summarises meetings in 14 languages.",
    tags: ["Whisper", "LLM", "WebRTC"],
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
          A non-exhaustive list of products, tools, and experiments from the past few years.
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
