import { useState, useEffect } from "react";

interface Options {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter(words: string[], options: Options = {}) {
  const { typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2200 } = options;

  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (displayText === current) {
        const id = setTimeout(() => setPhase("pausing"), pauseDuration);
        return () => clearTimeout(id);
      }
      const id = setTimeout(
        () => setDisplayText(current.slice(0, displayText.length + 1)),
        typingSpeed,
      );
      return () => clearTimeout(id);
    }

    if (phase === "pausing") {
      const id = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(id);
    }

    // deleting
    if (displayText === "") {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
      return;
    }
    const id = setTimeout(
      () => setDisplayText((t) => t.slice(0, -1)),
      deletingSpeed,
    );
    return () => clearTimeout(id);
  }, [displayText, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
