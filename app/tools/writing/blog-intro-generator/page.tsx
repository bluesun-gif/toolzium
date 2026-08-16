import { Metadata } from "next";
import BlogIntroGeneratorClient from "@/components/tools/writing/blog-intro-generator-client";
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
  );
}
