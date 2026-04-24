import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sofien Essghaier" },
      { name: "description", content: "About Sofien Essghaier, a software engineering student and full-stack developer based in Tunis, Tunisia." },
      { property: "og:title", content: "About — Sofien Essghaier" },
      { property: "og:description", content: "Software engineering student, full-stack developer based in Tunis." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "Feb 2024",
    role: "Web Data & Scraping Trainee · Société Electro Tounes",
    desc: "Final year project — built a web scraping platform with JavaScript, TypeScript & Tailwind CSS for real-time price comparison.",
  },
  {
    year: "Jan 2022",
    role: "Full-Stack Trainee · Compagnie des Phosphates de Gafsa",
    desc: "Developed a dual-platform (web + desktop) mutual insurance management system using PHP and C#.",
  },
  {
    year: "Jan 2021",
    role: "Junior Front-End Trainee · Compagnie des Phosphates de Gafsa",
    desc: "Built an employee analytics dashboard using HTML, CSS, JavaScript, and Bootstrap for workforce visualization.",
  },
];

const education = [
  {
    year: "2024 — 2027",
    role: "Bachelor of Software Engineering (GLSI) · TekUp University",
    desc: "Licence en informatique — Développement des systèmes d'information. Coursework: OOP in Java, Algorithms, Operating Systems, Data Structures.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto grid max-w-5xl gap-16 px-6 pt-40 pb-24 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/// about</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Hey — I&apos;m <span className="text-gradient">Sofien.</span>
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a third-year Software Engineering student at TekUp University in Tunis who
              enjoys building web applications and solving real-world problems with code.
            </p>
            <p>
              I focus on full-stack development — from front-end interfaces to backend logic and
              databases. I&apos;ve completed multiple internships in front-end, full-stack, and web
              scraping, and I&apos;m always learning and improving.
            </p>
            <p>
              I&apos;m based in Tunis, speak Arabic, English, and French, and I&apos;m always happy
              to chat about web development, AI, or new project ideas.
            </p>
          </div>
        </div>
        <aside className="md:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary">Currently</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>📍 Tunis, Tunisia</li>
              <li>🎓 Software Engineering @ TekUp</li>
              <li>💻 Building MERN-stack projects</li>
              <li>🌐 Arabic · English · French</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-3xl font-bold md:text-4xl">Education</h2>
        <ol className="mt-10 space-y-6 border-l border-border pl-6">
          {education.map((t) => (
            <li key={t.role} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-primary glow" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.year}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{t.role}</h3>
              <p className="mt-1 text-muted-foreground">{t.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-3xl font-bold md:text-4xl">Experience</h2>
        <ol className="mt-10 space-y-6 border-l border-border pl-6">
          {timeline.map((t) => (
            <li key={t.role} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-primary glow" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.year}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{t.role}</h3>
              <p className="mt-1 text-muted-foreground">{t.desc}</p>
            </li>
          ))}
        </ol>
      </section>
      <SiteFooter />
    </div>
  );
}
