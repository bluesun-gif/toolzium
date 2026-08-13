import JsonLd from "@/components/seo/json-ld";
import { ScreenTimeClient } from "@/components/tools/health/screen-time-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Screen Time Calculator | Toolzium",
  description: "Track and analyze your daily screen time across different devices and apps.",
  path: "/tools/health/screen-time",
  keywords: ["screen time", "calculator", "health", "tracker", "digital wellbeing"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/screen-time`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Screen Time Calculator", url: toolUrl, description: "Track and analyze your daily screen time across different devices and apps.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Screen Time Calculator", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Screen Time Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Screen Time Calculator runs instantly in your browser. Track and analyze daily screen time by device and app category. Daily and weekly totals. 20-20-20 rule reminder. Health tips based on usage level. Visual breakdown charts. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Screen Time Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Screen Time Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Screen Time Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ScreenTimeClient />
    </div>
  );
}
