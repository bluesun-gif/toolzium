import JsonLd from "@/components/seo/json-ld";
import { AsciiArtClient } from "@/components/tools/fun/ascii-art-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ASCII Art Generator | Toolzium",
  description: "Convert text to ASCII art using simple character maps.",
  path: "/tools/fun/ascii-art",
  keywords: ["ascii art", "text to ascii", "generator", "fun"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/ascii-art`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "ASCII Art Generator", url: toolUrl, description: "Convert text to ASCII art.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "ASCII Art Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this?", acceptedAnswer: { "@type": "Answer", text: "A tool to convert text into ASCII art." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AsciiArtClient /></div>);
}
