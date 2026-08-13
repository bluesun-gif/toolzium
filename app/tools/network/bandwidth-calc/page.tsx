import JsonLd from "@/components/seo/json-ld";
import { BandwidthCalcClient } from "@/components/tools/network/bandwidth-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bandwidth Calculator | Toolzium",
  description: "Calculate download and upload times based on file size and connection speed.",
  path: "/tools/network/bandwidth-calc",
  keywords: ["bandwidth calculator", "download time", "upload time", "network speed", "file transfer"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/bandwidth-calc`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Bandwidth Calculator", url: toolUrl, description: "Calculate download and upload times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "Bandwidth Calculator", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Bandwidth Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Bandwidth Calculator runs instantly in your browser. Calculate download and upload times based on file size and connection speed. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Bandwidth Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Bandwidth Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Bandwidth Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><BandwidthCalcClient /></div>);
}
