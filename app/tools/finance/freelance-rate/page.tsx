import JsonLd from "@/components/seo/json-ld";
import { FreelanceRateClient } from "@/components/tools/finance/freelance-rate-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Freelance Rate & Wage Calculator — Hourly & Annual Salary (2026) | Toolzium",
  description: "Calculate your target hourly, daily, and project rate based on desired annual salary, overhead expenses, taxes, and billable client hours.",
  path: "/tools/finance/freelance-rate",
  keywords: [
    "freelance wage calculator",
    "freelance pay calculator",
    "freelance rate calculator",
    "freelance annual salary calculator",
    "freelancer fees calculator",
    "hourly rate calculator",
    "freelance pricing calculator"
  ],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/freelance-rate";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Freelance Rate & Wage Calculator",
    url: toolUrl,
    description: "Calculate required hourly and project rates for freelancers based on target annual income and expenses.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools/finance" },
      { "@type": "ListItem", position: 3, name: "Freelance Rate Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate my minimum hourly freelance rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Add your desired annual take-home salary + annual business expenses + self-employment taxes, then divide by your estimated annual billable working hours (typically 1,000 to 1,400 billable hours per year)."
        }
      },
      {
        "@type": "Question",
        name: "How many billable hours per week should freelancers calculate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most full-time freelancers log 20 to 25 billable client hours per 40-hour work week. The remaining hours are spent on marketing, admin, pitching, and invoicing."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FreelanceRateClient />
    </div>
  );
}
