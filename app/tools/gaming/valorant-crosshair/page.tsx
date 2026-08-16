import { Metadata } from "next";
import ValorantCrosshairClient from "@/components/tools/gaming/valorant-crosshair-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Valorant Pro Crosshair Generator & Import Code Converter | Toolzium",
  description:
    "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.",
};

export default function ValorantCrosshairPage() {
  return (
    <><ValorantCrosshairClient />
      <RelatedTools currentToolUrl="/tools/gaming/valorant-crosshair" />
    </>
  );
}
