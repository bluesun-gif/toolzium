import { Metadata } from "next";
import ValorantCrosshairClient from "@/components/tools/gaming/valorant-crosshair-client";

export const metadata: Metadata = {
  title: "Valorant Pro Crosshair Generator & Import Code Converter | Toolzium",
  description:
    "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.",
};

export default function ValorantCrosshairPage() {
  return <ValorantCrosshairClient />;
}
