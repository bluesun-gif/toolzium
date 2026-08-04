import JsonLd from "@/components/seo/json-ld";
import { RegexCheatsheetClient } from "@/components/tools/dev/regex-cheatsheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Regex Cheat Sheet & Tester | Toolzium",
  description: "Comprehensive regex quick reference with interactive testing. Includes common patterns, character classes, anchors, and quantifiers.",
  path: "/tools/dev/regex-cheatsheet",
  keywords: ["regex", "regular expressions", "regex tester", "regex cheat sheet", "developer tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/regex-cheatsheet`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Cheat Sheet", url: toolUrl, description: "Comprehensive regex quick reference with interactive testing.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "Regex Cheat Sheet", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is regex?", acceptedAnswer: { "@type": "Answer", text: "Regex, or regular expressions, is a sequence of characters that specifies a search pattern in text." } }, { "@type": "Question", name: "How do I test my regex?", acceptedAnswer: { "@type": "Answer", text: "Use the interactive tester on this page to enter your regex pattern and a test string to see matches highlighted in real-time." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><RegexCheatsheetClient /></div>);
}
