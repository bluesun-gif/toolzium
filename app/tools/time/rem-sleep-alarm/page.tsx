import JsonLd from "@/components/seo/json-ld";
import { RemSleepAlarmClient } from "@/components/tools/time/rem-sleep-alarm-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "REM Sleep Cycle & Wakeup Alarm Calculator | Toolzium",
  description: "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.",
  path: "/tools/time/rem-sleep-alarm",
  keywords: ["rem sleep", "sleep cycle", "alarm calculator", "wakeup time", "time tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/rem-sleep-alarm";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "REM Sleep Cycle Calculator", url: toolUrl, description: "Calculate optimal bedtime and wake-up alarm times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "REM Sleep Cycle Calculator", item: toolUrl }] };
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><RemSleepAlarmClient />
      <RelatedTools currentToolUrl="/tools/time/rem-sleep-alarm" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the REM Sleep Cycle & Wakeup Alarm Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's REM Sleep Cycle & Wakeup Alarm Calculator runs instantly in your browser. Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the REM Sleep Cycle & Wakeup Alarm Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the REM Sleep Cycle & Wakeup Alarm Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the REM Sleep Cycle & Wakeup Alarm Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><RemSleepAlarmClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
