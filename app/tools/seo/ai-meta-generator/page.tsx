import { Metadata } from "next";
import AiMetaGeneratorClient from "@/components/tools/seo/ai-meta-generator-client";

export const metadata: Metadata = {
  title: "AI High-CTR SEO Title & Meta Description Generator | Toolzium",
  description:
    "Generate search-optimized HTML title tags and meta descriptions tailored for maximum organic Google click-through rates with live AI.",
};

export default function AiMetaGeneratorPage() {
  return <AiMetaGeneratorClient />;
}
