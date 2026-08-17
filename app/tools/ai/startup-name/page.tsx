import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupNameClient from "@/components/tools/ai/startup-name-client";

const TITLE = "AI Startup & Business Name Generator Studio | Toolzium";
const DESCRIPTION = "Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches with 1-click tone controls.";
const PATH = "/tools/ai/startup-name";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Startup & Business Name Generator Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StartupNameClient />
    </>
  );
}
