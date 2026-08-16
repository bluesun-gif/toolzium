import { Metadata } from "next";
import AiElevatorPitchClient from "@/components/tools/writing/ai-elevator-pitch-client";
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
  );
}
