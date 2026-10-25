import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/useSound";

const bars = [0, 0.25, 0.5, 0.15];

/** "SND ON / OFF" switch with a tiny equalizer that dances while sound plays. */
export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      aria-pressed={enabled}
      className={cn(
        "nier-interactive flex items-center gap-2 border border-foreground/15 bg-background/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-sm transition-all hover:border-foreground/30 hover:text-foreground/90",
        className,
      )}
    >
      <span className="flex h-2.5 items-end gap-[2px]" aria-hidden="true">
        {bars.map((delay, i) => (
          <span
            key={i}
            className={cn(
              "w-[2px] origin-bottom bg-current",
              enabled ? "animate-sound-bar h-full" : "h-[2px] opacity-60",
            )}
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </span>
      <span>SND</span>
      <span className={enabled ? "text-foreground" : "text-foreground/55"}>
        {enabled ? "ON" : "OFF"}
      </span>
    </button>
  );
}
