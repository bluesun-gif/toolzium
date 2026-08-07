import { Metadata } from "next";
import SqlToPrismaClient from "@/components/tools/dev/sql-to-prisma-client";

export const metadata: Metadata = {
  title: "SQL Table to Prisma Schema Converter Studio | Toolzium",
  description:
    "Translate raw SQL CREATE TABLE statements into clean Prisma ORM models and schema definitions.",
};

export default function SqlToPrismaPage() {
  return <SqlToPrismaClient />;
}
