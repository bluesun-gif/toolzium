import type { Metadata } from "next";
import { recordClickAndRedirect } from "@/lib/actions/shortener.action";
import { generateSEOMetadata } from "@/lib/seo-config";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  return generateSEOMetadata({
    title: "Redirecting...",
    description: "You are being redirected through Toolzium's secure URL shortener.",
    noIndex: true,
  });
}

export default async function ShortCatchAll({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  await recordClickAndRedirect(id);
  return null;
}
