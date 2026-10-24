import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/nier/PageHero";
import { SectionDivider } from "@/components/nier/SectionDivider";
import { NierCard } from "@/components/nier/NierCard";
import { NierLink } from "@/components/nier/NierButton";
import { Reveal, useInView } from "@/components/nier/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sofien Essghaier" },
      {
        name: "description",
        content:
          "About Sofien Essghaier, a software engineering student and full-stack developer based in Tunis, Tunisia.",
      },
      { property: "og:title", content: "About — Sofien Essghaier" },
      {
        property: "og:description",
        content: "Software engineering student, full-stack developer based in Tunis.",
      },
    ],
  }),
  component: AboutPage,
});

/* ─── data ──────────────────────────────────────────────────────────────── */

const stats = [
  { value: 3, suffix: "", label: "Internships" },
  { value: 6, suffix: "", label: "Projects shipped" },
  { value: 14, suffix: "+", label: "Technologies" },
  { value: 3, suffix: "", label: "Languages spoken" },
];

const timeline = [
  {
    year: "2024 — 2027",
    kind: "Education",
    role: "Bachelor of Software Engineering",
    org: "TekUp University",
    desc: "Full-time software engineering program covering algorithms, systems design, and full-stack development.",
  },
  {
    year: "Feb 2024",
    kind: "Internship",
    role: "Web Data & Scraping Trainee",
    org: "Société Electro Tounes",
    desc: "Final-year project — built a full-stack web scraping platform with TypeScript, React & Tailwind CSS for real-time price comparison across 5+ e-commerce sites.",
  },
  {
    year: "2023 — 2024",
    kind: "Education",
    role: "Higher Technician in Computer Science",
    org: "ISET Gafsa",
    desc: "Applied computer science with a focus on web and desktop application development.",
  },
  {
    year: "Jan 2022",
    kind: "Internship",
    role: "Full-Stack Trainee",
    org: "Compagnie des Phosphates de Gafsa",
    desc: "Developed a dual-platform (web + desktop) mutual insurance management system using PHP and C#, backed by a MySQL database.",
  },
  {
    year: "Jan 2021",
    kind: "Internship",
    role: "Junior Front-End Trainee",
    org: "Compagnie des Phosphates de Gafsa",
    desc: "Built an employee analytics dashboard using HTML, CSS, JavaScript, and Bootstrap for workforce visualization and HR reporting.",
  },
];

const label = "mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60";

/* ─── component ─────────────────────────────────────────────────────────── */

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1500);
      setN(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function AboutPage() {
  const { ref: lineRef, visible: lineVisible } = useInView<HTMLDivElement>(0.05);

  return (
    <div>
      <SiteHeader />

      <PageHero
        label="01 // About"
        title="ABOUT"
        subtitle="Operator identification system. Access to personal data and career path."
      />

      {/* Profile */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal preset="fade">
            <span className={label}>// Operator.profile</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-8 font-sans text-3xl font-semibold tracking-wider text-foreground/90 md:text-4xl">
              Sofien Essghaier
            </h2>
          </Reveal>
          <Reveal preset="glitch" delay={0.2}>
            <div className="flex flex-col gap-6 font-sans text-sm leading-relaxed text-foreground/75">
              <p>
                Software engineering student at TekUp University in Tunis, building production-grade
                web applications with the MERN stack. I like turning messy requirements into clean,
                measurable systems.
              </p>
              <p>
                Three internships across scraping, full-stack and front-end work taught me to ship
                fast without breaking things — and how to debug whatever breaks anyway.
              </p>
              <p>
                Currently open to internships and full-time roles, remote or on-site. I speak
                Arabic, French and English.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} preset="scale" delay={i * 0.08} className="bg-background p-6 text-center">
              <p className="font-sans text-3xl font-semibold text-foreground/90">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider
        quote="We are perpetually trapped in a never-ending spiral of life and death."
        author="2B"
      />

      {/* Philosophy */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal preset="fade">
            <span className={label}>// Operator.philosophy</span>
          </Reveal>
          <Reveal preset="scale" delay={0.1}>
            <NierCard className="p-8 md:p-12">
              <h3 className="mb-6 font-sans text-xl font-semibold tracking-wider text-foreground/85">
                Code with intent
              </h3>
              <div className="flex flex-col gap-4 font-sans text-sm leading-relaxed text-foreground/70">
                <p>
                  Every feature should earn its place. I start from the problem, measure the result,
                  and keep the system small enough that the next person can understand it.
                </p>
                <p>
                  Performance, accessibility and clear documentation aren't extras — they're how a
                  project survives contact with real users.
                </p>
              </div>
            </NierCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider
        quote="A future is not given to you. It is something you must take for yourself."
        author="9S"
      />

      {/* Timeline */}
      <section className="overflow-x-hidden px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal preset="fade">
            <span className={label}>// Operational.log</span>
          </Reveal>
          <Reveal>
            <h2 className="mb-16 font-sans text-3xl font-semibold tracking-wider text-foreground/90">
              Career path
            </h2>
          </Reveal>

          <div ref={lineRef} className="relative">
            <div
              className="absolute bottom-0 left-4 top-0 w-px origin-top bg-foreground/10 transition-transform duration-[1500ms] md:left-1/2"
              style={{ transform: lineVisible ? "scaleY(1)" : "scaleY(0)" }}
            />
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={t.role + t.year} preset={left ? "left" : "right"} delay={i * 0.05}>
                  <div className="relative mb-16 md:grid md:grid-cols-2">
                    {/* Marker */}
                    <div className="absolute left-4 top-1 -translate-x-1/2 md:left-1/2">
                      <div className="h-2 w-2 rotate-45 border border-foreground/40 bg-background" />
                      <div className="animate-nier-diamond-ping absolute -inset-1 rotate-45 border border-foreground/15" />
                    </div>
                    <div
                      className={`pl-12 md:pl-0 ${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55">
                        {t.year} · {t.kind}
                      </p>
                      <h3 className="mt-2 font-sans text-lg font-semibold tracking-wide text-foreground/90">
                        {t.role}
                      </h3>
                      <p className="font-mono text-xs text-foreground/60">{t.org}</p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8 flex flex-wrap justify-center gap-4">
            <NierLink to="/projects" variant="primary">
              View projects
            </NierLink>
            <NierLink to="/contact">Contact</NierLink>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
