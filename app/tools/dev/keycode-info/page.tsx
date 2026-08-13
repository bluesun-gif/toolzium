import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import KeycodeInfoClient from "@/components/tools/dev/keycode-info-client";

export const metadata = buildMetadata({
  title: "Keycode & Event Viewer",
  description: "Inspect JavaScript keyboard event properties: key, code, keyCode, location, modifiers. Interactive virtual keyboard. Event history log.",
  path: "/tools/dev/keycode-info",
  keywords: ["interactive", "virtual", "javascript", "code", "properties", "location", "inspect", "event", "modifiers", "keycode", "keyboard"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Keycode & Event Viewer",
    description: "Inspect JavaScript keyboard event properties: key, code, keyCode, location, modifiers. Interactive virtual keyboard. Event history log.",
    path: "/tools/dev/keycode-info",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <KeycodeInfoClient />
    </div>
  );
}
