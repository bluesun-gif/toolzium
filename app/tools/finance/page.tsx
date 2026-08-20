import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildCategoryJsonLd } from "@/lib/seo";
import { CategoryHubClient } from "@/components/shared/category-hub-client";
import { ToolsData } from "@/data/tools";

const CATEGORY_ID = "finance";
const TITLE = "Free Personal Finance & Investment Calculators | Toolzium";
const DESCRIPTION = "Take control of your money with free finance tools. Calculate compound interest, loan repayments, investment growth, and budget breakdowns.";
const PATH = "/tools/finance";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CategoryPage() {
  const category = ToolsData.find((c) => c.url === PATH) || {
    title: "FINANCE",
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
