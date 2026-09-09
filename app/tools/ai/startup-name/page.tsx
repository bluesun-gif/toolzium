import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupNameClient from "@/components/tools/ai/startup-name-client";

const TITLE = "Startup Name Generator [Free] — Brandable Names & Domain Check";
const DESCRIPTION =
  "✅ 100% free • No signup • Instant ideas • Generate brandable startup names with domain availability, taglines, and logo directions for your launch.";
const PATH = "/tools/ai/startup-name";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "startup name generator",
    "business name generator",
    "domain name ideas",
    "brand name generator",
  ],
});

const FAQS = [
  { question: "Is this startup name generator really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited name generation." },
  { question: "Do you store my business ideas?",
    answer: "No. Your prompts and generated names stay private and are never logged or resold." },
  { question: "Does it check if the domain is available?",
    answer: "It surfaces likely .com/.ai/.io availability hints and formats names to improve registration odds — verify at your registrar before buying." },
  { question: "What else comes with each name?",
    answer: "Tagline options, brand positioning notes, and logo-direction suggestions so you can move from name to identity in one pass." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Startup & Business Name Generator Studio",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StartupNameClient />
    </>
  );
}
