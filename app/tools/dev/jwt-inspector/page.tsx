import { Metadata } from "next";
import JwtInspectorClient from "@/components/tools/dev/jwt-inspector-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "JWT Security Audit & Payload Inspector Studio | Toolzium",
  description:
    "Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks.",
};

export default function JwtInspectorPage() {
  return (
    <><JwtInspectorClient />
      <RelatedTools currentToolUrl="/tools/dev/jwt-inspector" />
    </>
  );
}
