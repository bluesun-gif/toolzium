import { Metadata } from "next";
import EnvScannerClient from "@/components/tools/dev/env-scanner-client";

export const metadata: Metadata = {
  title: "Env Variables Security Risk & Secret Leak Scanner | Toolzium",
  description:
    "Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference.",
};

export default function EnvScannerPage() {
  return <EnvScannerClient />;
}
