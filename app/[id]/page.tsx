import type { Metadata } from "next";
import { recordClickAndRedirect } from "@/lib/actions/shortener.action";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata: Metadata = generateSEOMetadata({
  title: "Redirecting...",
  description: "You are being redirected through Tools Cube's secure URL shortener.",
  noIndex: true,
});

export default async function ShortCatchAll({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const rawSrc = sParams?.src || sParams?.source || sParams?.ref;
  const customSource = Array.isArray(rawSrc) ? rawSrc[0] : rawSrc;
  await recordClickAndRedirect(id, customSource);
  return null;
}
