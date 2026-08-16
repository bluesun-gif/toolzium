import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MyIpClient from "@/components/tools/network/my-ip-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "What Is My IP",
  description: "Instantly detect your public IPv4 and IPv6 address. See your location, ISP, time zone, and coordinates. Privacy-first — your IP is detected client-side and never stored.",
  path: "/tools/network/my-ip",
  keywords: ["first", "your", "public", "location", "time", "address", "detect", "zone", "privacy", "instantly", "coordinates"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "What Is My IP",
    description: "Instantly detect your public IPv4 and IPv6 address. See your location, ISP, time zone, and coordinates. Privacy-first — your IP is detected client-side and never stored.",
    path: "/tools/network/my-ip",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MyIpClient />
    
      <RelatedTools currentToolUrl="/tools/network/my-ip" />
</div>
  );
}
