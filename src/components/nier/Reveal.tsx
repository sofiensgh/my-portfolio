import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Preset = "up" | "left" | "right" | "scale" | "glitch" | "fade";

export function useInView<T extends Element>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

interface RevealProps {
  children: React.ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string;
}

/** Fades its children in once they scroll into view. */
export function Reveal({ children, preset = "up", delay = 0, className }: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-preset={preset}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
