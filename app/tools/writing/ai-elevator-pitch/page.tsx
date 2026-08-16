import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiElevatorPitchClient from "@/components/tools/writing/ai-elevator-pitch-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Elevator Pitch & Value Proposition Studio | Toolzium",
  description:
    "Craft compelling 15 to 30-second elevator pitches and value propositions for investors, clients, and landing pages with live AI.",
};

export default function AiElevatorPitchPage() {
  return (
    <><AiElevatorPitchClient />
      <RelatedTools currentToolUrl="/tools/writing/ai-elevator-pitch" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Elevator Pitch & Value Proposition Studio",
  description: "Craft compelling 15 to 30-second elevator pitches and value propositions for investors, clients, and landing pages with live AI.",
  path: "/tools/writing/ai-elevator-pitch",
  keywords: ["compelling", "value", "pages", "landing", "with", "craft", "propositions", "second", "pitches", "investors", "clients", "elevator"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Elevator Pitch & Value Proposition Studio",
    description: "Craft compelling 15 to 30-second elevator pitches and value propositions for investors, clients, and landing pages with live AI.",
    path: "/tools/writing/ai-elevator-pitch",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiElevatorPitchClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
