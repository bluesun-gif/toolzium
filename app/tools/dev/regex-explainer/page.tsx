import JsonLd from "@/components/seo/json-ld";
import { RegexExplainerClient } from "@/components/tools/dev/regex-explainer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Regex Visualizer & Explainer | Toolzium",
  description: "Breakdown and explain regular expressions in plain English. Test regex patterns with match highlights and presets.",
  path: "/tools/dev/regex-explainer",
  keywords: ["regex explainer", "regular expression visualizer", "regex tester", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/regex-explainer";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Visualizer & Explainer", url: toolUrl, description: "Breakdown and explain regular expressions in plain English.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "Regex Visualizer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does this tool do?", acceptedAnswer: { "@type": "Answer", text: "It explains regular expressions and tests them against strings." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RegexExplainerClient />
    </div>
  );
}
