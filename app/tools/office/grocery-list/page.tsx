import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GroceryListClient from "@/components/tools/office/grocery-list-client";

const TITLE = "Grocery List Manager | Toolzium";
const DESCRIPTION = "Smart grocery list with categories, quantities, and price estimation. Organize your shopping and share lists easily.";
const PATH = "/tools/office/grocery-list";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Grocery List Manager",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GroceryListClient />
    </>
  );
}
