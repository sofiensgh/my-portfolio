import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/nier/ThemeToggle";

export const navItems = [
  { id: "01", to: "/about", label: "About" },
  { id: "02", to: "/projects", label: "Projects" },
  { id: "03", to: "/skills", label: "Skills" },
  { id: "04", to: "/contact", label: "Contact" },
] as const;

/** Glitches the logo for a frame every few seconds. */
function useMicroGlitch() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let off: ReturnType<typeof setTimeout>;
    const iv = setInterval(
      () => {
        setOn(true);
        off = setTimeout(() => setOn(false), 200);
      },
      5000 + Math.random() * 3000,
    );
    return () => {
      clearInterval(iv);
      clearTimeout(off);
    };
  }, []);
  return on;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const glitch = useMicroGlitch();

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const logo = (
    <Link
      to="/"
      aria-label="Sofien Essghaier — home"
      onClick={() => setOpen(false)}
      className="relative font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:text-foreground/90"
    >
      <span className={glitch ? "inline-block animate-glitch-1" : "inline-block"}>S.E</span>
    </Link>
  );

  return (
    <>
      {/* Desktop */}
      <nav className="nier-enter animate-nier-blur sticky top-0 z-50 hidden w-full items-center justify-between border-b border-foreground/5 bg-background/50 px-8 py-6 backdrop-blur-sm md:flex">
        {logo}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative font-mono text-xs uppercase tracking-[0.25em] text-foreground/60 transition-colors hover:text-foreground/90 data-[status=active]:text-foreground"
            >
              <span className="mr-1.5 text-foreground/35">{item.id}.</span>
              {item.label}
              <span className="absolute -bottom-1.5 left-0 right-0 h-px origin-left scale-x-0 bg-foreground/50 transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
          <ThemeToggle className="ml-4" />
        </div>
      </nav>

      {/* Mobile bar */}
      <div className="fixed left-4 top-4 z-50 p-3 md:hidden">{logo}</div>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex flex-col items-end gap-1.5 p-3"
        >
          <span
            className={`h-px w-6 bg-foreground/60 transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-4 bg-foreground/60 transition-all duration-200 ${open ? "scale-x-0 opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground/60 transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="animate-nier-fade fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-background/95 py-24 backdrop-blur-md md:hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="animate-nier-scan absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </div>
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-foreground/60">
            [NAV_SYSTEM: ACTIVE]
          </span>
          {navItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="animate-nier-letter font-mono text-sm uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground"
              style={{ animationDelay: `${0.04 + i * 0.05}s` }}
            >
              <span className="mr-2 text-foreground/45">{item.id}.</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
