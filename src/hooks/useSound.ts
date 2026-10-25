import { useEffect, useState } from "react";
import { sound } from "@/lib/sound";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

export function useSound() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(sound.enabled);
    return sound.subscribe(setEnabled);
  }, []);

  return { enabled, toggle: () => sound.toggle() };
}

/**
 * Mount once at the root: plays a blip on every click, and resumes the
 * soundscape on the first interaction if the visitor turned it on last time
 * (browsers refuse to start audio before a user gesture).
 */
export function useGlobalSoundEffects() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      // The sound toggle handles itself.
      if (el?.closest?.("[data-sound-toggle]")) return;
      if (!sound.enabled && sound.preferred) {
        void sound.setEnabled(true);
        return;
      }
      sound.click(!!el?.closest?.(INTERACTIVE));
    };

    const onKeyDown = () => {
      if (!sound.enabled && sound.preferred) void sound.setEnabled(true);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
