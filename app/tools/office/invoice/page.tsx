import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SimpleInvoiceClient from "@/components/tools/office/simple-invoice-client";

export const metadata = buildMetadata({
  title: "Invoice Generator",
  description: "Create professional invoices online for free. Simple invoice generator with customizable templates. Add items, calculate totals, and download as PDF. No signup required.",
  path: "/tools/office/invoice",
  keywords: ["with", "professional", "items", "simple", "create", "invoice", "invoices", "online", "free", "generator", "customizable", "templates"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Invoice Generator",
    description: "Create professional invoices online for free. Simple invoice generator with customizable templates. Add items, calculate totals, and download as PDF. No signup required.",
    path: "/tools/office/invoice",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SimpleInvoiceClient />
    </div>
  );
}
