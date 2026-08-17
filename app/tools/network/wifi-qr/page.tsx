import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WifiQrClient from "@/components/tools/network/wifi-qr-client";

const TITLE = "WiFi QR Code Generator | Toolzium";
const DESCRIPTION = "Generate a QR code to share your WiFi network easily. Scan to connect instantly without typing passwords.";
const PATH = "/tools/network/wifi-qr";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "WiFi QR Code Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WifiQrClient />
    </>
  );
}
