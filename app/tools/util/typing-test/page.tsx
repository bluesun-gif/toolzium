import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TypingTestClient from "@/components/tools/util/typing-test-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Typing Speed Test",
  description: "Test your typing speed and accuracy with real-time WPM tracking. Multiple difficulty levels, character-by-character highlighting, and detailed results. Free online typing test.",
  path: "/tools/util/typing-test",
  keywords: ["your", "with", "time", "typing", "tracking", "levels", "test", "real", "multiple", "speed", "difficulty", "accuracy"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Typing Speed Test",
    description: "Test your typing speed and accuracy with real-time WPM tracking. Multiple difficulty levels, character-by-character highlighting, and detailed results. Free online typing test.",
    path: "/tools/util/typing-test",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TypingTestClient />
    
      <RelatedTools currentToolUrl="/tools/util/typing-test" />
</div>
  );
}
