import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NierLink } from "@/components/nier/NierButton";
import { ThemeToggle } from "@/components/nier/ThemeToggle";
import { SoundToggle } from "@/components/nier/SoundToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sofien Essghaier — Software Engineering Student & Full-Stack Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Sofien Essghaier, a software engineering student in Tunis building full-stack web applications with the MERN stack.",
      },
      {
        property: "og:title",
        content: "Sofien Essghaier — Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Software engineering student building full-stack web apps with React, Node.js & TypeScript.",
      },
    ],
  }),
  component: HomePage,
});

/* ─── data ─────────────────────────────────────────────────────────────── */

const FIRST = "SOFIEN";
const LAST = "ESSGHAIER";

const nameClass = "text-5xl font-medium tracking-[0.14em] text-foreground md:text-7xl lg:text-8xl";

const frameCorners = [
  "top-8 left-8 border-l border-t",
  "top-8 right-8 border-r border-t",
  "bottom-8 left-8 border-l border-b",
  "bottom-8 right-8 border-r border-b",
];

/* ─── component ────────────────────────────────────────────────────────── */

function Letters({ word, baseDelay }: { word: string; baseDelay: number }) {
  return word.split("").map((ch, i) => (
    <span
      key={`${word}-${i}`}
      className="nier-enter animate-nier-letter inline-block"
      style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
    >
      {ch}
    </span>
  ));
}

/** Flickers the name with a short glitch every 5–11 seconds. */
function useGlitch() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = () => {
      timers.push(
        setTimeout(
          () => {
            setOn(true);
            timers.push(setTimeout(() => setOn(false), 200));
            schedule();
          },
          5000 + Math.random() * 6000,
        ),
      );
    };
    schedule();
    return () => timers.forEach(clearTimeout);
  }, []);
  return on;
}

function HomePage() {
  const glitch = useGlitch();

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Diamond frames + horizon */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="nier-enter animate-nier-scale absolute h-[72vmin] w-[72vmin] rotate-45 border border-foreground/10"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="nier-enter animate-nier-scale absolute h-[48vmin] w-[48vmin] rotate-45 border border-foreground/15"
          style={{ animationDelay: "0.45s" }}
        />
        <div
          className="nier-enter animate-nier-line absolute left-0 right-0 h-px bg-foreground/10"
          style={{ animationDelay: "0.6s", animationDuration: "2s" }}
        />
      </div>

      {/* Screen corners */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {frameCorners.map((pos, i) => (
          <span
            key={pos}
            className={`nier-enter animate-nier-fade absolute h-16 w-16 border-foreground/15 ${pos}`}
            style={{ animationDelay: `${0.5 + i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Sound + theme switches */}
      <div
        className="nier-enter animate-nier-blur absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2"
        style={{ animationDelay: "0.8s" }}
      >
        <SoundToggle />
        <ThemeToggle />
      </div>

      {/* Identity */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <div
          className="nier-enter animate-nier-fade mb-8 flex w-full items-center gap-5"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="h-px flex-1 bg-foreground/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground/70">
            Full-Stack Developer
          </span>
          <span className="h-px flex-1 bg-foreground/20" />
        </div>

        <div className="relative mb-6">
          <h1 aria-label={`${FIRST} ${LAST}`} className={nameClass}>
            <span aria-hidden="true" className="block leading-[1.05]">
              <Letters word={FIRST} baseDelay={0.9} />
            </span>
            <span aria-hidden="true" className="block leading-[1.05]">
              <Letters word={LAST} baseDelay={1.15} />
            </span>
          </h1>
          {glitch && (
            <>
              <div
                className={`animate-glitch-1 pointer-events-none absolute inset-0 ${nameClass} text-foreground/70`}
                aria-hidden="true"
              >
                <div className="leading-[1.05]">{FIRST}</div>
                <div className="leading-[1.05]">{LAST}</div>
              </div>
              <div
                className={`animate-glitch-2 pointer-events-none absolute inset-0 ${nameClass} text-foreground/60`}
                aria-hidden="true"
              >
                <div className="leading-[1.05]">{FIRST}</div>
                <div className="leading-[1.05]">{LAST}</div>
              </div>
            </>
          )}
        </div>

        <div
          className="nier-enter animate-nier-line mb-8 h-px w-48 bg-foreground/25"
          style={{ animationDelay: "1.5s" }}
        />

        <p
          className="nier-enter animate-nier-fade mb-12 max-w-sm font-sans text-sm italic leading-relaxed text-foreground/70"
          style={{ animationDelay: "1.8s" }}
        >
          "Everything that lives is designed to end."
        </p>

        <div className="nier-enter animate-nier-letter" style={{ animationDelay: "2.1s" }}>
          <NierLink to="/about" variant="outline">
            Enter System
          </NierLink>
        </div>
      </div>

      {/* Status line */}
      <div
        className="nier-enter animate-nier-fade absolute bottom-8 left-0 right-0 flex items-center justify-center"
        style={{ animationDelay: "2.4s" }}
      >
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-foreground/60">
          <span>SYS.VER 1.0.0</span>
          <span className="animate-nier-pulse-line h-px w-4 bg-foreground/20" />
          <span>UNIT: SE-194</span>
          <span
            className="animate-nier-pulse-line h-px w-4 bg-foreground/20"
            style={{ animationDelay: "0.5s" }}
          />
          <span>STATUS: ONLINE</span>
        </div>
      </div>
    </section>
  );
}
