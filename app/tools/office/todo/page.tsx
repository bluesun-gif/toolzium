import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TodoOfflineClient from "@/components/tools/office/todo-offline-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "To-Do List (Offline)",
  description: "Private offline to-do list that works without internet. Local task manager with no signup or cloud sync. Your tasks stay on your device for complete privacy.",
  path: "/tools/office/todo",
  keywords: ["that", "manager", "local", "list", "with", "without", "signup", "private", "internet", "works", "offline", "task"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "To-Do List (Offline)",
    description: "Private offline to-do list that works without internet. Local task manager with no signup or cloud sync. Your tasks stay on your device for complete privacy.",
    path: "/tools/office/todo",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TodoOfflineClient />
    
      <RelatedTools currentToolUrl="/tools/office/todo" />
</div>
  );
}
