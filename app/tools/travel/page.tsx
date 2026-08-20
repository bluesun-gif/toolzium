import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildCategoryJsonLd } from "@/lib/seo";
import { CategoryHubClient } from "@/components/shared/category-hub-client";
import { ToolsData } from "@/data/tools";

const CATEGORY_ID = "travel";
const TITLE = "Free Travel Planning & Currency Tools — Visa, Budget & Flight | Toolzium";
const DESCRIPTION = "Essential tools for travelers and digital nomads. Live currency comparison matrix, visa requirement checker, jet lag planner, baggage fees, and packing lists.";
const PATH = "/tools/travel";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CategoryPage() {
  const category = ToolsData.find((c) => c.url === PATH) || {
    title: "TRAVEL",
    url: PATH,
    items: [],
  };

  const tools = (category.items || []).filter((i) => i.url !== PATH);

  const relatedCategories = ToolsData.filter(
    (c) => c.url !== "/tools" && c.url !== PATH
  )
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      url: c.url,
      count: (c.items || []).length,
    }));

  const jsonLd = buildCategoryJsonLd({
    name: category.title,
    description: DESCRIPTION,
    path: PATH,
    tools: tools.map((t) => ({
      title: t.title,
      description: t.description,
      url: t.url,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CategoryHubClient
        title={category.title}
        description={DESCRIPTION}
        slug={CATEGORY_ID}
        tools={tools}
        relatedCategories={relatedCategories}
      />
    </>
  );
}
