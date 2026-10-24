import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "[SYSTEM] Initializing YoRHa interface...",
  "[SYSTEM] Loading memory units ................ OK",
  "[SYSTEM] Mounting UI layer ................... OK",
  "[SYSTEM] Calibrating neural link .............. OK",
  "[SYSTEM] Establishing secure uplink ........... OK",
  "[SYSTEM] Boot sequence complete. Welcome, operator.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setShown((s) => Math.max(s, i + 1)), 320 + 320 * i));
    });

    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 2400) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(iv);
    }, 50);

    const skip = () => {
      timers.forEach(clearTimeout);
      setShown(BOOT_LINES.length);
      setProgress(100);
    };
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(iv);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && shown >= BOOT_LINES.length && !doneRef.current) {
      doneRef.current = true;
      const t1 = setTimeout(() => setFading(true), 450);
      const t2 = setTimeout(() => {
        // Release the intro animations held by html.booting.
        document.documentElement.classList.remove("booting");
        onDone();
      }, 1000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, shown, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="grain-overlay animate-grain absolute -inset-[10%]" />
      </div>
      <div className="nier-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative w-full max-w-md px-8">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
          System Boot Sequence
        </p>
        <div className="mb-8 font-mono text-xs leading-relaxed">
          {BOOT_LINES.slice(0, shown).map((l) => (
            <p key={l} className="animate-boot-line text-foreground/90">
              {l}
            </p>
          ))}
        </div>
        <div className="relative h-px w-full overflow-hidden bg-border">
          <div
            className="absolute left-0 top-0 h-full bg-foreground/70"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right font-mono text-xs text-foreground/70">
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
}
