import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";

export function PageTransition() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showAtRef = useRef(0);

  useEffect(() => {
    let iv: ReturnType<typeof setInterval> | null = null;

    const show = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      showAtRef.current = Date.now();
      setProgress(0);
      setFading(false);
      setVisible(true);
      const start = Date.now();
      if (iv) clearInterval(iv);
      iv = setInterval(() => {
        setProgress(Math.min(100, ((Date.now() - start) / 550) * 100));
      }, 32);
    };

    const hide = () => {
      const elapsed = Date.now() - showAtRef.current;
      const wait = Math.max(0, 420 - elapsed);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (iv) {
          clearInterval(iv);
          iv = null;
        }
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          setFading(false);
        }, 450);
      }, wait);
    };

    const unsubNav = router.subscribe("onBeforeNavigate", (e) => {
      if (e.pathChanged) show();
    });
    const unsubRendered = router.subscribe("onRendered", (e) => {
      if (e.pathChanged) hide();
    });

    return () => {
      unsubNav();
      unsubRendered();
      if (iv) clearInterval(iv);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  if (!visible) return null;

  return (
    <div
      className={`page-transition-overlay flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="page-transition-scan animate-page-scan" aria-hidden="true" />
      <div className="w-full max-w-sm px-6">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
          // Loading interface
        </p>
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
