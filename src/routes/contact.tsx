import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Alex Rivera" },
      { name: "description", content: "Get in touch with Alex Rivera for engineering work, consulting, or collaboration." },
      { property: "og:title", content: "Contact — Alex Rivera" },
      { property: "og:description", content: "Let's build something together." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { label: "Email", value: "hello@alexrivera.dev", href: "mailto:hello@alexrivera.dev" },
  { label: "GitHub", value: "@alexrivera", href: "https://github.com" },
  { label: "LinkedIn", value: "in/alexrivera", href: "https://linkedin.com" },
  { label: "Calendar", value: "Book a 30-min intro call", href: "https://cal.com" },
];

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 pt-40 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/// contact</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
          Let&apos;s build <span className="text-gradient">something.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Whether it&apos;s a freelance gig, a consulting call, or just to say hi — my inbox is
          open.
        </p>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{c.label}</p>
                <p className="mt-2 text-lg font-medium">{c.value}</p>
              </div>
              <span className="text-2xl text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface/60 p-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary">Response time</h2>
          <p className="mt-3 text-muted-foreground">
            I usually reply within 24 hours on weekdays. For project enquiries, please include a
            short brief, timeline, and budget range — it helps me give you a thoughtful response.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
