import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupNameClient from "@/components/tools/ai/startup-name-client";

export const metadata = buildMetadata({
  title: "AI Startup & Business Name Generator — Free Brand Name Ideas Studio",
  description:
    "Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches with 1-click tone controls.",
  path: "/tools/ai/startup-name",
  keywords: [
    "ai startup name generator",
    "business name generator ai",
    "brand name ideas",
    "domain name generator",
    "company name generator",
    "free business naming tool",
  ],
});

export default function StartupNamePage() {
  const jsonLd = buildToolJsonLd({
    name: "AI Startup Name Generator",
    description:
      "Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches with 1-click tone controls.",
    path: "/tools/ai/startup-name",
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "How does the AI Startup Name Generator work?",
        answer:
          "Enter your core business keywords or industry description. The AI generates brandable name ideas categorized by tech, modern, compound, and abstract styles.",
      },
      {
        question: "Does it check domain extensions?",
        answer:
          "Yes, it suggests top domain extensions like .com, .io, .ai, and .app for each generated name idea.",
      },
      {
        question: "Is this tool free?",
        answer:
          "Yes, Toolzium's AI Startup Name Generator is 100% free with unlimited name generations.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StartupNameClient />
    </>
  );
}
