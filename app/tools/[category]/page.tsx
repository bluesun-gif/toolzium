import React from "react";
import { notFound } from "next/navigation";
import { ToolsData } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import CategoryHubClient from "./category-hub-client";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const categoryPath = `/tools/${category}`;
  
  const categoryObj = ToolsData.find(
    (c) => c.url.toLowerCase() === categoryPath.toLowerCase()
  );

  if (!categoryObj) {
    return buildMetadata({
      title: "Tools Category | Toolzium",
      description: "Explore free online tools on Toolzium.",
      path: categoryPath,
    });
  }

  const name = categoryObj.title;

  return buildMetadata({
    title: `Free Online ${name} — 100% Free Utilities & Generators | Toolzium`,
    description: `Explore all ${categoryObj.items.length} free online ${name} on Toolzium. Fast, privacy-friendly, browser-based utilities with no signup required.`,
    path: categoryPath,
    keywords: [name.toLowerCase(), `${category} tools`, "online tools", "free utilities", "toolzium"],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryPath = `/tools/${category}`;

  const categoryObj = ToolsData.find(
    (c) => c.url.toLowerCase() === categoryPath.toLowerCase()
  );

  if (!categoryObj) {
    notFound();
  }

  return (
    <>
      <CategoryHubClient categoryObj={categoryObj} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${categoryObj.title} Collection`,
          description: `Explore all free ${categoryObj.title} on Toolzium.`,
          url: `${siteURL}${categoryPath}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: categoryObj.items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteURL}${item.url}`,
              name: item.title,
            })),
          },
        }}
      />
    </>
  );
}
