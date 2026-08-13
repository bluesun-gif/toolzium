import JsonLd from "@/components/seo/json-ld";
import { BodyFatClient } from "@/components/tools/health/body-fat-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Body Fat Calculator | Toolzium",
  description: "Estimate your body fat percentage, lean mass, and fat mass using the US Navy method.",
  path: "/tools/health/body-fat",
  keywords: ["body fat calculator", "us navy body fat", "body fat percentage", "fitness tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/body-fat`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Body Fat Calculator", url: toolUrl, description: "Estimate your body fat percentage.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Body Fat Calculator", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Body Fat Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Body Fat Calculator runs instantly in your browser. Estimate body fat percentage using the US Navy method. Calculate fat mass, lean mass, and body fat category. Supports both metric and imperial measurements with visual progress indicators. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Body Fat Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Body Fat Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Body Fat Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BodyFatClient />
    </div>
  );
}
