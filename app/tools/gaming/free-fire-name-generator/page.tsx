import { Metadata } from "next";
import FreeFireNameClient from "@/components/tools/gaming/free-fire-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Free Fire (FF) Nickname & Boss Squad Tag Studio | Toolzium",
  description:
    "Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire.",
};

export default function FreeFireNamePage() {
  return (
    <><FreeFireNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/free-fire-name-generator" />
    </>
  );
}
