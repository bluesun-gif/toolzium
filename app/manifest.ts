import type { MetadataRoute } from "next";
import { TOTAL_TOOLS_COUNT } from "@/data/tools";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Toolzium — ${TOTAL_TOOLS_COUNT}+ Free Online Tools`,
    short_name: "Toolzium",
    description:
      `Free online tools for developers and professionals. URL shortener, QR codes, JSON formatter, image converter, calculators, and ${TOTAL_TOOLS_COUNT}+ utilities.`,
    start_url: "/tools",
    display: "minimal-ui",
    background_color: "#09090b",
    theme_color: "#6d28d9",
    orientation: "portrait-primary",
    categories: ["utilities", "developer", "productivity"],
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
