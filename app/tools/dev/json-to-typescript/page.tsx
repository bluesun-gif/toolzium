import { Metadata } from "next";
import JsonToTypescriptClient from "@/components/tools/dev/json-to-typescript-client";

export const metadata: Metadata = {
  title: "JSON to TypeScript Type & Interface Converter Studio | Toolzium",
  description:
    "Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions.",
};

export default function JsonToTypescriptPage() {
  return <JsonToTypescriptClient />;
}
