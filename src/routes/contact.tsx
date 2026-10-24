import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/nier/PageHero";
import { NierButton } from "@/components/nier/NierButton";
import { Reveal } from "@/components/nier/Reveal";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sofien Essghaier" },
      {
        name: "description",
        content:
          "Get in touch with Sofien Essghaier for internships, freelance work, or collaboration.",
      },
      { property: "og:title", content: "Contact — Sofien Essghaier" },
      {
        property: "og:description",
        content: "Let's build something together.",
      },
    ],
  }),
  component: ContactPage,
});

/* ─── data ──────────────────────────────────────────────────────────────── */

const channels = [
  {
    label: "Email",
    value: "sofensghaier2@gmail.com",
    href: "mailto:sofensghaier2@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+216 29 659 711",
    href: "tel:+21629659711",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "@sofiensgh",
    href: "https://github.com/sofiensgh",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "in/sofien-essghaier-61b5862a2",
    href: "https://www.linkedin.com/in/sofien-essghaier-61b5862a2/",
    icon: Linkedin,
  },
];

/* ─── component ─────────────────────────────────────────────────────────── */

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: "", email: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transmission received", {
      description: `Thanks ${form.name || "soldier"} — I'll respond within 24 hours.`,
    });
    setForm(empty);
  };

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      <SiteHeader />

      <PageHero
        label="04 // Contact"
        title="CONTACT"
        subtitle="Communication channel open. Establish a connection with the operator — response time under 24 hours."
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal preset="fade">
          <p className="max-w-lg font-sans text-sm leading-relaxed text-foreground/70">
            Internships, freelance work, or just a transmission about something you built — the
            channel is open.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          {/* Channels */}
          <div className="space-y-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              // Direct channels
            </p>
            <div className="divide-y divide-border border border-border bg-card">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="nier-interactive group flex items-center gap-4 p-5 transition-colors hover:bg-surface"
                >
                  <c.icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="truncate font-mono text-xs text-foreground">{c.value}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            <div className="nier-interactive nier-corners border border-border bg-card/70 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                // Signal status
              </p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                <span className="text-success">● UPLINK: STABLE</span>
                <br />
                LOCATION: TUNIS, TN (GMT+1)
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="nier-interactive nier-corners border border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                // New transmission
              </p>
              <span className="font-mono text-[10px] text-muted-foreground">ENC: UTF-8</span>
            </div>

            <div className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your callsign"
                    className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@base.io"
                    className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Subject
                </span>
                <input
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Mission objective"
                  className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Transmission content..."
                  className="mt-2 w-full resize-none border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
                />
              </label>
            </div>

            <NierButton type="submit" variant="primary" className="mt-8 w-full">
              <Send className="h-3.5 w-3.5" /> Transmit message
            </NierButton>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
