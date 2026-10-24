import { Reveal } from "./Reveal";

/** Quote break between sections, framed by lines and a diamond. */
export function SectionDivider({ quote, author }: { quote: string; author?: string }) {
  return (
    <Reveal preset="fade" className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-center font-sans text-sm italic leading-relaxed text-foreground/60">
        "{quote}"
      </p>
      {author && (
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">
          — {author}
        </p>
      )}
      <div className="mt-8 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-foreground/20" />
        <span className="h-2 w-2 rotate-45 border border-foreground/40" />
        <span className="h-px flex-1 bg-foreground/20" />
      </div>
    </Reveal>
  );
}
