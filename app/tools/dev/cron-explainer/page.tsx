import JsonLd from "@/components/seo/json-ld";
import { CronExplainerClient } from "@/components/tools/dev/cron-explainer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Cron Explainer | Toolzium",
  description: "Translate cron expressions into human-readable text and view upcoming scheduled run times.",
  path: "/tools/dev/cron-explainer",
  keywords: ["cron", "crontab", "explainer", "generator", "schedule"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/cron-explainer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Cron Explainer", url: toolUrl, description: "Cron expression translator", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "Cron Explainer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a cron expression?", acceptedAnswer: { "@type": "Answer", text: "A cron expression is a string representing a schedule to execute a command or script." } }] };
  return (<div className="max-w-6xl mx-auto space-y-8"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CronExplainerClient />
      <RelatedTools currentToolUrl="/tools/dev/cron-explainer" />
</div>);
}
