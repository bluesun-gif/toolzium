import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeshGradientClient from "@/components/tools/dev/mesh-gradient-client";
<<<<<<< HEAD
export const metadata = {
=======

export const metadata = buildMetadata({
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  title: "CSS Mesh & Fluid Gradient Generator Studio | Toolzium",
  description: "Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export.",
  path: "/tools/dev/mesh-gradient",
  keywords: ["preview", "with", "mesh", "time", "fluid", "color", "real", "gradients", "multi", "canvas", "click", "design"],
});

<<<<<<< HEAD
export default function MeshGradientPage() {
  return (
    <><MeshGradientClient />
      <RelatedTools currentToolUrl="/tools/dev/mesh-gradient" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Mesh & Fluid Gradient Generator Studio",
    description: "Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export.",
    path: "/tools/dev/mesh-gradient",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MeshGradientClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
