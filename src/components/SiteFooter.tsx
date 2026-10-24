import { Link } from "@tanstack/react-router";
import { navItems } from "@/components/SiteHeader";
import { Reveal } from "@/components/nier/Reveal";

const socials = [
  { label: "GitHub", href: "https://github.com/sofiensgh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sofien-essghaier-61b5862a2/" },
  { label: "Email", href: "mailto:sofensghaier2@gmail.com" },
];

const heading = "font-mono text-xs uppercase tracking-[0.3em] text-foreground/55";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-foreground/10 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            <span className={heading}>// System identity</span>
            <h3 className="font-sans text-lg font-semibold tracking-wider text-foreground/90">
              SOFIEN ESSGHAIER
            </h3>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-foreground/70">
              Full-stack developer. Building web applications with precision and purpose.
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-4" delay={0.2}>
            <span className={heading}>// Nav map</span>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group w-fit font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground/90"
                >
                  {item.label}
                  <span className="ml-2 inline-block text-foreground/50 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </nav>
          </Reveal>

          <Reveal className="flex flex-col gap-4" delay={0.3}>
            <span className={heading}>// Status</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-avail-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="font-mono text-xs text-foreground/75">Available for work</span>
            </div>
            <p className="font-mono text-xs text-foreground/60">Based in Tunis, Tunisia</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/5 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
            © {new Date().getFullYear()} Sofien Essghaier — All rights reserved
          </p>
          <p className="font-mono text-[10px] italic text-foreground/55">
            "Everything that lives is designed to end."
          </p>
        </div>
      </div>
    </footer>
  );
}
