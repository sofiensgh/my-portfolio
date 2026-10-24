import { createFileRoute } from "@tanstack/react-router";
import { Code2, Server, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/nier/PageHero";
import { SectionDivider } from "@/components/nier/SectionDivider";
import { NierCard } from "@/components/nier/NierCard";
import { Reveal } from "@/components/nier/Reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Sofien Essghaier" },
      {
        name: "description",
        content:
          "Technical capabilities of Sofien Essghaier: React, TypeScript, Node.js, Express, MongoDB and more.",
      },
      { property: "og:title", content: "Skills — Sofien Essghaier" },
      {
        property: "og:description",
        content: "Frontend, backend and integration skills.",
      },
    ],
  }),
  component: SkillsPage,
});

/* ─── data ──────────────────────────────────────────────────────────────── */

const capabilities = [
  {
    icon: Code2,
    title: "Frontend Systems",
    desc: "Responsive, pixel-consistent interfaces built with React & TypeScript — fast, accessible, and animated.",
    techs: ["React", "TypeScript", "Tailwind"],
  },
  {
    icon: Server,
    title: "Backend Engines",
    desc: "REST APIs and data pipelines on Node.js + Express with MongoDB — built to scale and documented to survive.",
    techs: ["Node.js", "Express", "MongoDB"],
  },
  {
    icon: Workflow,
    title: "Integration Ops",
    desc: "Scraping automation, AI voice agents, and third-party systems wired into one coherent stack.",
    techs: ["Puppeteer", "Vapi AI", "Firebase"],
  },
];

const loadout = [
  { label: "Frontend", items: ["React", "TypeScript", "JavaScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { label: "Languages", items: ["Java", "Python", "PHP", "C#"] },
  { label: "Tooling", items: ["Git", "Firebase", "Puppeteer", "Vapi AI"] },
];

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
  "Firebase",
  "Git",
  "REST APIs",
  "Puppeteer",
  "Vapi AI",
];

const spoken = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Professional" },
  { name: "English", level: "Professional" },
];

const label = "mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60";

/* ─── component ─────────────────────────────────────────────────────────── */

function SkillsPage() {
  return (
    <div>
      <SiteHeader />

      <PageHero
        label="03 // Skills"
        title="SKILLS"
        subtitle="Combat capabilities registry. Equipped modules and operational proficiencies."
      />

      {/* Capabilities */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal preset="fade">
            <span className={label}>// Core.modules</span>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} preset="scale" delay={i * 0.1}>
                <NierCard as="article" className="h-full p-8">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50">
                    UNIT-0{i + 1}
                  </p>
                  <c.icon className="mt-8 h-6 w-6 text-foreground/80" />
                  <h3 className="mt-6 font-sans text-lg font-semibold uppercase tracking-wider text-foreground/90">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{c.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {c.techs.map((t) => (
                      <span
                        key={t}
                        className="border border-foreground/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/60 transition-colors group-hover:border-foreground/30 group-hover:text-foreground/85"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </NierCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-foreground/10 py-5">
        <div className="animate-marquee flex w-max items-center gap-8">
          {[...stack, ...stack].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/55"
            >
              {s} <span className="text-foreground/35">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* Loadout */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal preset="fade">
            <span className={label}>// Equipment.loadout</span>
          </Reveal>
          <Reveal>
            <h2 className="mb-12 font-sans text-3xl font-semibold tracking-wider text-foreground/90">
              Tech loadout
            </h2>
          </Reveal>
          <div className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 md:grid-cols-4">
            {loadout.map((g, i) => (
              <Reveal key={g.label} preset="fade" delay={i * 0.08} className="bg-background p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                  {g.label}
                </p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <span className="mr-2 text-foreground/35">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider quote="I'm not exactly sure what it means to be alive. But... I think it's beautiful." />

      {/* Spoken languages */}
      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-3xl">
          <Reveal preset="fade">
            <span className={label}>// Comm.protocols</span>
          </Reveal>
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {spoken.map((l, i) => (
              <Reveal
                key={l.name}
                preset="left"
                delay={i * 0.08}
                className="flex items-center justify-between py-5"
              >
                <span className="font-sans text-base tracking-wide text-foreground/85">{l.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55">
                  {l.level}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
