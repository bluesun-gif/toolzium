import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TodoOfflineClient from "@/components/tools/office/todo-offline-client";

const TITLE = "Todo | Toolzium";
const DESCRIPTION = "Free online todo tool with instant calculation and privacy.";
const PATH = "/tools/office/todo";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Todo",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TodoOfflineClient />
    </>
  );
}
