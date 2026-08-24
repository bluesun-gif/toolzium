import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AppIconGeneratorClient from "@/components/tools/image/app-icon-generator-client";

const TITLE = "Multi-Platform App Icon & Favicon Studio Generator | Toolzium";
const DESCRIPTION = "Generate complete, production-ready app icon asset packs for iOS (Xcode), Android (Google Play), Web (Favicons & PWA), and macOS in 1 click. 100% free with in-browser privacy.";
const PATH = "/tools/image/app-icon-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "app icon generator",
    "ios app icon maker",
    "android icon generator",
    "favicon generator zip",
    "generate app icons for all devices",
    "xcode appiconset generator",
    "pwa favicon generator",
    "free online icon maker",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Multi-Platform App Icon & Favicon Studio Generator",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AppIconGeneratorClient />
    </>
  );
}
