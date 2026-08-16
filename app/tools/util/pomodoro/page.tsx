import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PomodoroFocusClient from "@/components/tools/util/pomodoro-focus-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Pomodoro Timer",
  description: "Pomodoro technique timer with 25-minute work sessions and 5-minute breaks. Productivity timer with sound notifications to boost focus and prevent burnout.",
  path: "/tools/util/pomodoro",
  keywords: ["productivity", "with", "technique", "sessions", "minute", "work", "breaks", "pomodoro", "timer"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pomodoro Timer",
    description: "Pomodoro technique timer with 25-minute work sessions and 5-minute breaks. Productivity timer with sound notifications to boost focus and prevent burnout.",
    path: "/tools/util/pomodoro",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PomodoroFocusClient />
    
      <RelatedTools currentToolUrl="/tools/util/pomodoro" />
</div>
  );
}
