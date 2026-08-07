import { Metadata } from "next";
import JwtInspectorClient from "@/components/tools/dev/jwt-inspector-client";

export const metadata: Metadata = {
  title: "JWT Security Audit & Payload Inspector Studio | Toolzium",
  description:
    "Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks.",
};

export default function JwtInspectorPage() {
  return <JwtInspectorClient />;
}
