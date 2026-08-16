import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AsciiArtClient from "@/components/tools/fun/ascii-art-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "ASCII Art Generator",
  description: "Convert text to ASCII art with multiple font styles: Banner, Block, Standard. Preview in monospace, copy to clipboard. Fun text art for social media, comments, and messages.",
  path: "/tools/fun/ascii-art",
  keywords: ["preview", "standard", "with", "monospace", "convert", "font", "block", "styles", "text", "ascii", "banner", "multiple"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/ascii-art`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "ASCII Art Generator", url: toolUrl, description: "Convert text to ASCII art.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "ASCII Art Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this?", acceptedAnswer: { "@type": "Answer", text: "A tool to convert text into ASCII art." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AsciiArtClient />
      <RelatedTools currentToolUrl="/tools/fun/ascii-art" />
</div>);
}
