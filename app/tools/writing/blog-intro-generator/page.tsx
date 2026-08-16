import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BlogIntroGeneratorClient from "@/components/tools/writing/blog-intro-generator-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Blog Post Intro & Opening Hook Generator | Toolzium",
  description:
    "Generate captivating opening paragraphs and high-retention hooks for articles, Medium posts, and tech blogs with live AI.",
};

export default function BlogIntroGeneratorPage() {
  return (
    <><BlogIntroGeneratorClient />
      <RelatedTools currentToolUrl="/tools/writing/blog-intro-generator" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Blog Post Intro & Opening Hook Generator",
  description: "Generate captivating opening paragraphs and high-retention hooks for articles, Medium posts, and tech blogs with live AI.",
  path: "/tools/writing/blog-intro-generator",
  keywords: ["hooks", "generate", "captivating", "tech", "blogs", "opening", "medium", "posts", "articles", "paragraphs", "retention", "high"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Blog Post Intro & Opening Hook Generator",
    description: "Generate captivating opening paragraphs and high-retention hooks for articles, Medium posts, and tech blogs with live AI.",
    path: "/tools/writing/blog-intro-generator",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BlogIntroGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
