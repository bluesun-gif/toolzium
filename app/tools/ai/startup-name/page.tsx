import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupNameClient from "@/components/tools/ai/startup-name-client";
export const metadata = {
  title: "AI Startup & Business Name Generator Studio | Toolzium",
  description: "Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches with 1-click tone controls.",
};

export default function StartupNamePage() {
  return (
    <><StartupNameClient />
      <RelatedTools currentToolUrl="/tools/ai/startup-name" />
    </>
  );
}
