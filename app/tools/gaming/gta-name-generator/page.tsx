import { Metadata } from "next";
import GtaNameClient from "@/components/tools/gaming/gta-name-client";

export const metadata: Metadata = {
  title: "GTA V License Plate & Crew Name Studio | Toolzium",
  description:
    "Generate badass GTA Online crew names, NoPixel RP gang tags, and custom vanity license plates with live AI inference.",
};

export default function GtaNamePage() {
  return <GtaNameClient />;
}
