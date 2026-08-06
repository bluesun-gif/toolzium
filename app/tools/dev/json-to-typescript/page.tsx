import JsonToTypescriptClient from "@/components/tools/dev/json-to-typescript-client";

export const metadata = {
  title: "JSON to TypeScript Interface & Zod Schema Studio | Toolzium",
  description: "Convert raw JSON objects into strict TypeScript interfaces, type aliases, and Zod validation schemas instantly.",
};

export default function JsonToTypescriptPage() {
  return <JsonToTypescriptClient />;
}
