import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildCategoryJsonLd } from "@/lib/seo";
import { CategoryHubClient } from "@/components/shared/category-hub-client";
import { ToolsData } from "@/data/tools";

const CATEGORY_ID = "time";
const TITLE = "Free Time & Date Tools — World Clock, Countdown & Timezone | Toolzium";
const DESCRIPTION = "Precision time tools for global workflows. World clock, timezone converter, countdown timers, sleep cycle calculators, and date formatters.";
const PATH = "/tools/time";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CategoryPage() {
  const category = ToolsData.find((c) => c.url === PATH) || {
    title: "TIME",
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
