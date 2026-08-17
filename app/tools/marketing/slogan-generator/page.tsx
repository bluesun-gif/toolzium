import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SloganGeneratorClient from "@/components/tools/marketing/slogan-generator-client";

const TITLE = "AI Product Slogan & Brand Tagline Generator | Toolzium";
const DESCRIPTION = "Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference.";
const PATH = "/tools/marketing/slogan-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Product Slogan & Brand Tagline Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SloganGeneratorClient />
    </>
  );
}
