import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Screen Recorder",
  description: "Record your screen online for free. Capture entire screen, application window, or browser tab with optional microphone audio. Download as WebM video. 100% browser-based, no software to install.",
  path: "/tools/util/screen-recorder",
  keywords: ["record", "your", "application", "entire", "with", "browser", "online", "free", "screen", "capture", "window"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Screen Recorder",
    description: "Record your screen online for free. Capture entire screen, application window, or browser tab with optional microphone audio. Download as WebM video. 100% browser-based, no software to install.",
    path: "/tools/util/screen-recorder",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClientComponent />
    
      <RelatedTools currentToolUrl="/tools/util/screen-recorder" />
</>
  );
}
