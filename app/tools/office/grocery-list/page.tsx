import JsonLd from "@/components/seo/json-ld";
import { GroceryListClient } from "@/components/tools/office/grocery-list-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Grocery List Manager | Toolzium",
  description: "Smart grocery list with categories, quantities, and price estimation. Organize your shopping and share lists easily.",
  path: "/tools/office/grocery-list",
  keywords: ["grocery list", "shopping list", "office tools", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/grocery-list`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Grocery List Manager",
    url: toolUrl,
    description: "Smart grocery list with categories, quantities, and price estimation. Organize your shopping and share lists easily.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office & Productivity Tools", item: `${siteURL}/tools#cat-office` },
      { "@type": "ListItem", position: 3, name: "Grocery List Manager", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does this save my grocery lists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your grocery lists are saved locally in your browser so you won't lose them if you refresh the page."
        }
      },
      {
        "@type": "Question",
        name: "Can I share my grocery list?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can copy your entire list as formatted text and share it via any messaging app."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <GroceryListClient />
    
      <RelatedTools currentToolUrl="/tools/office/grocery-list" />
</div>
  );
}
