import { Metadata } from "next";
import MlbbNameClient from "@/components/tools/gaming/mlbb-name-client";

export const metadata: Metadata = {
  title: "Mobile Legends (MLBB) Fancy Name & Symbol Generator | Toolzium",
  description:
    "Generate cool, aesthetic Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang.",
};

export default function MlbbNamePage() {
  return <MlbbNameClient />;
}
