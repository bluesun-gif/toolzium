import JsonLd from "@/components/seo/json-ld";
import { CodeMinifierClient } from "@/components/tools/dev/code-minifier-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Code Minifier | Toolzium",
  description: "Minify HTML, CSS, and JavaScript code to reduce file size and improve load times.",
  path: "/tools/dev/code-minifier",
  keywords: ["code minifier", "html minifier", "css minifier", "js minifier", "javascript minify"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/code-minifier`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Code Minifier", url: toolUrl, description: "Minify HTML, CSS, and JavaScript code.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "Code Minifier", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does minifying code mean?", acceptedAnswer: { "@type": "Answer", text: "Minifying code is the process of removing unnecessary characters from source code without changing its functionality, such as whitespace, line breaks, and comments." } }, { "@type": "Question", name: "Which languages are supported?", acceptedAnswer: { "@type": "Answer", text: "This tool currently supports basic minification for HTML, CSS, and JavaScript." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CodeMinifierClient /></div>);
}
