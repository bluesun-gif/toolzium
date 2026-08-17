import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";

const TITLE = "AI X / Twitter Viral Thread Generator";
const DESCRIPTION = "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.";
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
