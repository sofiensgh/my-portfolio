import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alex Rivera" },
      { name: "description", content: "About Alex Rivera, a full-stack engineer based in Lisbon." },
      { property: "og:title", content: "About — Alex Rivera" },
      { property: "og:description", content: "Engineer, writer, and builder based in Lisbon." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2024 — now", role: "Staff Engineer · Lumen", desc: "Leading platform architecture and DX." },
  { year: "2021 — 2024", role: "Senior Engineer · Atlas", desc: "Owned the payments + onboarding stack." },
  { year: "2019 — 2021", role: "Engineer · Pixel Studio", desc: "Built a headless CMS used by 80+ publishers." },
  { year: "2017 — 2019", role: "Freelance Developer", desc: "Shipped products for clients across Europe." },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto grid max-w-5xl gap-16 px-6 pt-40 pb-24 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/// about</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Hey — I&apos;m <span className="text-gradient">Alex.</span>
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;ve been writing software professionally for nearly a decade. I care about
              craft, clarity, and shipping things that hold up in production.
            </p>
            <p>
              These days I work as a Staff Engineer at a Series B SaaS, helping a small team move
              fast without breaking the world. On weekends I write open-source tools and tinker
              with synthesizers.
            </p>
            <p>
              I&apos;m based in Lisbon, fluent in Portuguese, English, and Spanish, and always
              happy to chat about distributed systems, type systems, or good coffee.
            </p>
          </div>
        </div>
        <aside className="md:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary">Currently</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>📍 Lisbon, Portugal</li>
              <li>💼 Staff Engineer @ Lumen</li>
              <li>🎧 Listening: Tycho, Bonobo</li>
              <li>📚 Reading: Designing Data-Intensive Apps</li>
            </ul>
          </div>
        </aside>
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
