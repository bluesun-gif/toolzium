"use client";
import { useEffect } from "react";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          reg.update();
          console.log("[SW] Registered & Updated:", reg.scope);
        })
        .catch((err) => console.warn("[SW] Registration failed:", err));
    }
  }, []);
  return null;
}
