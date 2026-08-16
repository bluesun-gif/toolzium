import JsonLd from "@/components/seo/json-ld";
import AnimalQuizClient from "@/components/tools/fun/animal-quiz-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Animal Trivia Quiz | Toolzium",
  description: "Test your knowledge with a fun trivia quiz about animals across different categories.",
  path: "/tools/fun/animal-quiz",
  keywords: ["animal quiz", "trivia", "fun quiz", "animal facts"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/animal-quiz`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Animal Trivia Quiz", url: toolUrl, description: "Test your knowledge with a fun trivia quiz about animals.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Animal Trivia Quiz", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><AnimalQuizClient />
      <RelatedTools currentToolUrl="/tools/fun/animal-quiz" />
</div>);
}
