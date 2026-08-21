import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfCompressClient from "@/components/tools/pdf/pdf-compress-client";

const TITLE = "Free PDF Compressor Online - Reduce PDF File Size (No Limits)";
const DESCRIPTION =
  "Compress PDF files online for free. Reduce PDF file size by up to 80% while preserving visual quality. 100% private, client-side PDF compression with zero file uploads.";
const PATH = "/tools/pdf/compress";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "compress pdf online",
    "shrink pdf",
    "compress pdf free",
    "pdf size reducer",
    "smallpdf alternative",
    "ilovepdf alternative",
    "lossless pdf compressor",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Online PDF Compressor Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfCompressClient />
    </>
  );
}
