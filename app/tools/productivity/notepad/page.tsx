import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Online Notepad",
  description: "Free online notepad and text editor. Auto-saves to your browser with multiple tabs, dark mode, word count, and download as .txt. No signup required, works offline. Your notes never leave your device.",
  path: "/tools/productivity/notepad",
  keywords: ["your", "with", "notepad", "browser", "online", "free", "saves", "multiple", "auto", "text", "tabs", "editor"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Online Notepad",
    description: "Free online notepad and text editor. Auto-saves to your browser with multiple tabs, dark mode, word count, and download as .txt. No signup required, works offline. Your notes never leave your device.",
    path: "/tools/productivity/notepad",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <NotepadClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/notepad" />
</>
  );
}
