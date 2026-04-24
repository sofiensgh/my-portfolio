import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sofien Essghaier — Software Engineering Student & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Sofien Essghaier, a software engineering student in Tunis building full-stack web applications with the MERN stack.",
      },
      { property: "og:title", content: "Sofien Essghaier — Full-Stack Developer" },
      {
        property: "og:description",
        content: "Software engineering student building full-stack web apps with React, Node.js & TypeScript.",
      },
    ],
  }),
  component: HomePage,
});

const stack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Java",
  "Python",
];

const featured = [
  {
    title: "PriceCompare Hub",
    blurb: "Full-stack price comparison platform scraping 5+ e-commerce sites in real time.",
    tag: "MERN",
  },
  {
    title: "AI Interview Simulator",
    blurb: "Voice-driven mock interviews powered by Vapi AI with multiple personalities.",
    tag: "AI",
  },
  {
    title: "Song Recognition App",
    blurb: "Shazam-like Android app using audio fingerprinting and Firebase.",
    tag: "Mobile",
  },
];

function HomePage() {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-32">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <img
          src={heroImg}
          alt=""
          width={1536}
          height={1024}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_70%_30%,black,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // available for internships & freelance — 2026
          </p>
          <h1 className="mt-6 animate-fade-up text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Building digital
            <br />
            products that <span className="text-gradient">just work.</span>
          </h1>
          <p
            className="mt-8 max-w-xl animate-fade-up text-lg text-muted-foreground"
            style={{ animationDelay: "0.15s" }}
          >
            I&apos;m Sofien — a third-year Software Engineering student at TekUp University in Tunis.
            I build full-stack web apps end-to-end, from React interfaces to Node.js backends and
            MongoDB databases.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/projects"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-7 font-semibold text-primary-foreground glow transition-all hover:brightness-110"
            >
              View my work →
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg glass px-7 font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stack ticker */}
      <section className="border-y border-border/50 bg-surface/40 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 font-mono text-sm text-muted-foreground">
          <span className="text-primary">stack →</span>
          {stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              /// selected work
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Recent projects</h2>
          </div>
          <Link to="/projects" className="hidden text-sm text-muted-foreground hover:text-primary md:inline">
            See all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <span className="font-mono text-xs text-primary">0{i + 1} · {p.tag}</span>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <span className="mt-6 inline-block text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read case →
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 text-center md:p-20">
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-radial)" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl">Have an idea worth building?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Open to internships, freelance gigs, and collaboration on cool side projects.
              Let&apos;s talk.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 font-semibold text-primary-foreground glow transition-all hover:brightness-110"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
