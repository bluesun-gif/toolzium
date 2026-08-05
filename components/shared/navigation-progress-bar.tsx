"use client";

import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

export default function NavigationProgressBar() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor or card link
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

      // Avoid trigger if opening in new tab / window or holding modifier key
      if (link.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Find if clicking inside a tool card or link element
      const card = target.closest<HTMLElement>(".card, [data-tool-card], a");
      if (card) {
        card.classList.add("is-navigating");
        
        // Add instant ripple / feedback pulse
        const rect = card.getBoundingClientRect();
        const circle = document.createElement("span");
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add("click-ripple");

        const existingRipple = card.getElementsByClassName("click-ripple")[0];
        if (existingRipple) {
          existingRipple.remove();
        }

        card.appendChild(circle);

        // Show "Loading..." badge on card if card element
        if (card.classList.contains("card") || card.getAttribute("data-tool-card")) {
          if (!card.querySelector(".card-loader-overlay")) {
            const overlay = document.createElement("div");
            overlay.className = "card-loader-overlay";
            overlay.innerHTML = `
              <div class="card-loader-content">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Opening tool...</span>
              </div>
            `;
            card.appendChild(overlay);
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <NextTopLoader
      color="#FF5252"
      initialPosition={0.08}
      crawlSpeed={150}
      height={4}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 12px #FF5252,0 0 6px #FF5252"
    />
  );
}
