"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CopyButton } from "@/components/shared/action-buttons";
import { Database } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_SQL = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

export default function SqlToPrismaClient() {
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const [prismaOutput, setPrismaOutput] = useState("");

  const convertSqlToPrisma = () => {
    try {
      const lines = sqlInput.split("\n");
      let tableName = "User";
      const fields: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.toUpperCase().startsWith("CREATE TABLE")) {
          const match = trimmed.match(/CREATE TABLE\s+([a-zA-Z0-9_]+)/i);
          if (match && match[1]) {
            const raw = match[1].replace(/[`"']/g, "");
            tableName = raw.charAt(0).toUpperCase() + raw.slice(1).replace(/s$/, "");
          }
        } else if (trimmed.length > 0 && !trimmed.startsWith(")") && !trimmed.startsWith(";")) {
          const parts = trimmed.split(/\s+/);
          if (parts.length >= 2) {
            const fieldName = parts[0].replace(/[`"']/g, "");
            const colType = parts[1].toUpperCase();

            let prismaType = "String";
            if (colType.includes("INT") || colType.includes("SERIAL")) prismaType = "Int";
            else if (colType.includes("BOOL")) prismaType = "Boolean";
            else if (colType.includes("TIME") || colType.includes("DATE")) prismaType = "DateTime";
            else if (colType.includes("FLOAT") || colType.includes("DECIMAL")) prismaType = "Float";

            let attrs = "";
            if (trimmed.toUpperCase().includes("PRIMARY KEY")) attrs += " @id @default(autoincrement())";
            if (trimmed.toUpperCase().includes("UNIQUE")) attrs += " @unique";
            if (trimmed.toUpperCase().includes("CURRENT_TIMESTAMP")) attrs += " @default(now())";

            fields.push(`  ${fieldName} ${prismaType}${attrs}`);
          }
        }
      }

      const model = `model ${tableName} {\n${fields.join("\n")}\n}`;
      setPrismaOutput(model);
      toast.success("Converted SQL to Prisma Model!");
    } catch (err) {
      toast.error("Failed to parse SQL statement.");
    }
  };

  React.useEffect(() => {
    convertSqlToPrisma();
  }, [sqlInput]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <ToolPageHeader
        icon={Database}
        title="SQL Table to Prisma Schema Converter Studio"
        description="Translate raw SQL CREATE TABLE statements into clean Prisma ORM models and schema definitions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-5 space-y-3">
          <h2 className="text-sm font-bold text-foreground border-b pb-2">SQL CREATE TABLE Input</h2>
          <textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            rows={12}
            className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-primary"
            placeholder="Paste CREATE TABLE SQL here..."
          />
        </GlassCard>

        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-foreground">Prisma Model Output</h2>
            <CopyButton getText={() => prismaOutput} label="Copy Prisma Code" />
          </div>

          <pre className="p-4 font-mono text-xs bg-slate-950 text-cyan-400 rounded-xl border overflow-x-auto h-72 leading-relaxed">
            {prismaOutput || "// Prisma model schema will appear here..."}
          </pre>
        </GlassCard>
      </div>
    </div>
  );
}
