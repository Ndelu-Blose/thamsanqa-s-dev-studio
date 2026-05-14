import { useEffect, useState } from "react";

/** Label for the global command palette shortcut (avoids SSR mismatch in SPAs). */
export function useCommandPaletteShortcutLabel(): string {
  const [label, setLabel] = useState("Ctrl+K");
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    setLabel(/Mac|iPhone|iPod|iPad/i.test(ua) ? "⌘K" : "Ctrl+K");
  }, []);
  return label;
}
