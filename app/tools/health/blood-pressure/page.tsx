import JsonLd from "@/components/seo/json-ld";
import { BloodPressureClient } from "@/components/tools/health/blood-pressure-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blood Pressure Tracker | Toolzium",
  description:
    "Track your blood pressure readings over time. Categorize readings and monitor trends.",
  path: "/tools/health/blood-pressure",
  keywords: [
    "blood pressure tracker",
    "health monitor",
    "systolic",
    "diastolic",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/blood-pressure`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Blood Pressure Tracker",
    url: toolUrl,
    description: "Track your blood pressure readings over time.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Health Tools",
        item: `${siteURL}/tools#cat-health`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blood Pressure Tracker",
        item: toolUrl,
      },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a normal blood pressure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Normal blood pressure is typically considered to be less than 120/80 mm Hg.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BloodPressureClient />
    </div>
  );
}
