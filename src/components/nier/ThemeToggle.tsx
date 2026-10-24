import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

/** "LGT / DRK" switch in the YoRHa HUD style. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "nier-interactive flex items-center gap-1 border border-foreground/15 bg-background/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-sm transition-all hover:border-foreground/30 hover:text-foreground/90",
        className,
      )}
    >
      <span className={theme === "light" ? "text-foreground" : "text-foreground/55"}>LGT</span>
      <span className="text-foreground/40">/</span>
      <span className={theme === "dark" ? "text-foreground" : "text-foreground/55"}>DRK</span>
    </button>
  );
}
