import { Metadata } from "next";
import SloganGeneratorClient from "@/components/tools/marketing/slogan-generator-client";
export const metadata: Metadata = {
  title: "AI Product Slogan & Brand Tagline Generator | Toolzium",
  description:
    "Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference.",
};

export default function SloganGeneratorPage() {
  return (
    <><SloganGeneratorClient />
      <RelatedTools currentToolUrl="/tools/marketing/slogan-generator" />
    </>
  );
}
