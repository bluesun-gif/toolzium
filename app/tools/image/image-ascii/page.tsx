import JsonLd from "@/components/seo/json-ld";
import { ImageAsciiClient } from "@/components/tools/image/image-ascii-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image to ASCII Art Generator | Toolzium",
  description: "Convert your images into amazing ASCII text art with customizable character sets and colors.",
  path: "/tools/image/image-ascii",
  keywords: ["image to ascii", "ascii art", "text art", "image converter", "ascii generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/image-ascii";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image to ASCII Art", url: toolUrl, description: "Convert your images into amazing ASCII text art with customizable character sets and colors.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Image to ASCII", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is ASCII art?", acceptedAnswer: { "@type": "Answer", text: "ASCII art is a graphic design technique that uses computers for presentation and consists of pictures pieced together from the 95 printable characters defined by the ASCII Standard." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ImageAsciiClient />
      <RelatedTools currentToolUrl="/tools/image/image-ascii" />
</div>);
}
