import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeshGradientClient from "@/components/tools/dev/mesh-gradient-client";

export const metadata = buildMetadata({
  title: "CSS Mesh & Fluid Gradient Generator Studio | Toolzium",
  description: "Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export.",
  path: "/tools/dev/mesh-gradient",
  keywords: ["preview", "with", "mesh", "time", "fluid", "color", "real", "gradients", "multi", "canvas", "click", "design"],
});

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
  );
}
