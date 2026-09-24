import { useEffect } from "react";

export function useAntiInspect() {
  useEffect(() => {
    // 1. Disable Right-Click context menu and mobile tap-hold menus
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // 2. Intercept DevTools keyboard shortcuts
    const handleKeyDown = (e) => {
      // F12 key
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + (I, J, C) or Cmd + Option + (I, J, C)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ["I", "i", "J", "j", "C", "c"].includes(e.key)
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl + U or Cmd + U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }

      // Ctrl + S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Debugger check if opened via browser menu (Settings -> Developer Tools)
    const checkDebugger = setInterval(() => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      // If DevTools is open, the debugger statement causes a noticeable pause
      if (end - start > 100) {
        window.location.reload();
      }
    }, 1000);

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(checkDebugger);
    };
  }, []);
}