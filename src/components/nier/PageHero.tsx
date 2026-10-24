const corners = [
  { pos: "top-0 left-0 border-t border-l", delay: 0.2 },
  { pos: "top-0 right-0 border-t border-r", delay: 0.35 },
  { pos: "bottom-0 left-0 border-b border-l", delay: 0.5 },
  { pos: "bottom-0 right-0 border-b border-r", delay: 0.65 },
];

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

/** Full-width banner that opens every inner page: "01 // ABOUT" style. */
export function PageHero({ label, title, subtitle }: PageHeroProps) {
  const letters = title.split("");
  const settle = 0.6 + letters.length * 0.02;

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-8 md:inset-16" aria-hidden="true">
        {corners.map((c) => (
          <span
            key={c.pos}
            className={`nier-enter animate-nier-fade absolute h-12 w-12 border-foreground/15 ${c.pos}`}
            style={{ animationDelay: `${c.delay}s` }}
          />
        ))}
      </div>

      <span
        className="nier-enter animate-nier-blur mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-foreground/65"
        style={{ animationDelay: "0.2s" }}
      >
        {label}
      </span>

      <h1
        aria-label={title}
        className="text-center font-sans text-5xl font-bold tracking-[0.2em] text-foreground/90 md:text-7xl lg:text-8xl"
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="nier-enter animate-nier-letter inline-block"
            style={{ animationDelay: `${0.4 + i * 0.03}s`, minWidth: ch === " " ? "0.3em" : undefined }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </h1>

      <div
        className="nier-enter animate-nier-line mt-8 h-px w-32 bg-foreground/20"
        style={{ animationDelay: `${settle}s` }}
      />

      {subtitle && (
        <p
          className="nier-enter animate-nier-blur mt-6 max-w-md text-center font-mono text-xs leading-relaxed tracking-wide text-foreground/70"
          style={{ animationDelay: `${settle + 0.2}s` }}
        >
          {subtitle}
        </p>
      )}

      <div
        className="nier-enter animate-nier-fade absolute bottom-8 flex flex-col items-center gap-2"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
          Scroll
        </span>
        <div className="animate-nier-drift h-8 w-px bg-foreground/20" />
      </div>
    </section>
  );
}
