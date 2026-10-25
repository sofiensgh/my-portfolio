import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: restores the saved theme and marks the
 * document as booting so intro animations wait for the boot sequence. The
 * class is force-cleared after 9s in case the app's JavaScript never runs.
 */
export const themeInitScript = `(function(){var r=document.documentElement;r.classList.add("booting");setTimeout(function(){r.classList.remove("booting")},9000);try{if(localStorage.getItem("${STORAGE_KEY}")==="light")r.classList.add("light");}catch(e){}})();`;

const readTheme = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(readTheme());
    // Keep every toggle on the page in sync with the <html> class.
    const observer = new MutationObserver(() => setThemeState(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode) — theme still applies for this visit
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
