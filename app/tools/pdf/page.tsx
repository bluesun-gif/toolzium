import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildCategoryJsonLd } from "@/lib/seo";
import { CategoryHubClient } from "@/components/shared/category-hub-client";
import { ToolsData } from "@/data/tools";

const CATEGORY_ID = "pdf";
const TITLE = "Free Online PDF Tools — Convert, Merge & Extract PDF | Toolzium";
const DESCRIPTION = "Complete suite of free PDF tools. Convert PDF to images, merge PDF documents, extract text, and chat with documents with total privacy.";
const PATH = "/tools/pdf";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CategoryPage() {
  const category = ToolsData.find((c) => c.url === PATH) || {
    title: "PDF",
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
