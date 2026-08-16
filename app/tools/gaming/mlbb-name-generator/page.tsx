import { Metadata } from "next";
import MlbbNameClient from "@/components/tools/gaming/mlbb-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Mobile Legends (MLBB) Fancy Name & Symbol Generator | Toolzium",
  description:
    "Generate cool, aesthetic Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang.",
};

export default function MlbbNamePage() {
  return (
    <><MlbbNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/mlbb-name-generator" />
    </>
  );
}
