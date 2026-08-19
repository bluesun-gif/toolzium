import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";

const TITLE = "Twitter Thread Generator | Toolzium";
const DESCRIPTION = "Generate viral Twitter/X threads using AI. Get complete threads with hook, content tweets, and CTA — all under 280 characters. Free.";
const PATH = "/tools/social/twitter-thread-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI X / Twitter Viral Thread Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TwitterThreadGeneratorClient />
    </>
  );
}
