import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptClient from "@/components/tools/ai/youtube-script-client";

const TITLE = "YouTube Script Generator [Free] — Hooks, Retention, Timestamps";
const DESCRIPTION =
  "✅ Free AI scriptwriter • No signup • Instant draft • Viral hooks, retention structure, B-roll cues, timestamps & SEO tags for faceless or talking-head videos.";
const PATH = "/tools/ai/youtube-script";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "youtube script generator",
    "ai youtube script",
    "youtube video script",
    "faceless youtube script",
    "youtube hooks",
  ],
});

const FAQS = [
  { question: "Is the YouTube script generator free to use?",
    answer: "Yes, completely free with no account required. Generate full-length scripts, hooks, and titles without limits." },
  { question: "Does it keep my script ideas private?",
    answer: "Yes. Your topic, outline, and generated scripts are not stored or shared — the tool never publishes anything to YouTube on your behalf." },
  { question: "What does the generated script include?",
    answer: "A 15-second retention hook, sectioned body with B-roll cues, on-screen text suggestions, timestamps, CTA blocks, plus title/description/tag SEO bundles." },
  { question: "How fast is it and does it beat AI detectors?",
    answer: "Scripts appear in seconds. Edits and human-tone options reduce robotic phrasing, but always review output before publishing for authenticity." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI YouTube Script Generator & Teleprompter Studio",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeScriptClient />
    </>
  );
}
