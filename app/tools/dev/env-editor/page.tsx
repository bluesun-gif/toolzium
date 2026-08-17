import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EnvEditorClient from "@/components/tools/dev/env-editor-client";

const TITLE = "Environment Variables Editor | Toolzium";
const DESCRIPTION = "Visual editor for .env files. Parse, edit, validate, and format your environment variables easily.";
const PATH = "/tools/dev/env-editor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Environment Variables Editor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EnvEditorClient />
    </>
  );
}
