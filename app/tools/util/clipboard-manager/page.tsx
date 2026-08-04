import JsonLd from "@/components/seo/json-ld";
import { ClipboardManagerClient } from "@/components/tools/util/clipboard-manager-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Clipboard Manager | Toolzium",
  description: "Save, manage, and organize clipboard snippets.",
  path: "/tools/util/clipboard-manager",
  keywords: ["clipboard manager", "snippet manager", "copy paste", "text snippets"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/clipboard-manager`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Clipboard Manager", url: toolUrl, description: "Save and organize clipboard snippets.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utility Tools", item: `${siteURL}/tools#cat-util` }, { "@type": "ListItem", position: 3, name: "Clipboard Manager", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Clipboard Manager?", acceptedAnswer: { "@type": "Answer", text: "A tool to save, manage, and organize text snippets in your browser." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ClipboardManagerClient />
    </div>
  );
}
