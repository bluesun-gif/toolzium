import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeshGradientClient from "@/components/tools/dev/mesh-gradient-client";
export const metadata = {
  title: "CSS Mesh & Fluid Gradient Generator Studio | Toolzium",
  description: "Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export.",
  path: "/tools/dev/mesh-gradient",
  keywords: ["preview", "with", "mesh", "time", "fluid", "color", "real", "gradients", "multi", "canvas", "click", "design"],
});

export default function MeshGradientPage() {
  return (
    <><MeshGradientClient />
      <RelatedTools currentToolUrl="/tools/dev/mesh-gradient" />
    </>
  );
}
