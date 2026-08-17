import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BlogIntroGeneratorClient from "@/components/tools/writing/blog-intro-generator-client";

const TITLE = "Blog Intro Generator | Toolzium";
const DESCRIPTION = "Free online blog intro generator generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/blog-intro-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Blog Intro Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogIntroGeneratorClient />
    </>
  );
}
