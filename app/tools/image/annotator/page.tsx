import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnnotatorClient from "@/components/tools/image/annotator-client";

const TITLE = "Screenshot Annotator | Toolzium";
const DESCRIPTION = "Annotate screenshots and images with rectangles, circles, arrows, and text right in your browser.";
const PATH = "/tools/image/annotator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Screenshot Annotator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AnnotatorClient />
    </>
  );
}
