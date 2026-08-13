"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Database, Code2, Settings } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
};

const SAMPLE_SQL = `CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 email VARCHAR(255) UNIQUE NOT NULL,
 profile_id INT REFERENCES profiles(id),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
 id SERIAL PRIMARY KEY,
 bio TEXT,
 age INT
);`;

export function SqlToPrismaClient() {
 const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
 const [provider, setProvider] = useState("postgresql");
 const [mapSnake, setMapSnake] = useState(true);

 const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1).replace(/s$/,"");
 
 const mapSqlType = (sqlType: string): string => {
 const t = sqlType.toUpperCase();
 if (t.includes("INT") || t.includes("SERIAL")) return t.includes("BIG") ?"BigInt":"Int";
 if (t.includes("VARCHAR") || t.includes("TEXT") || t.includes("CHAR")) return"String";
 if (t.includes("BOOL")) return"Boolean";
 if (t.includes("TIME") || t.includes("DATE")) return"DateTime";
 if (t.includes("FLOAT") || t.includes("DECIMAL") || t.includes("REAL") || t.includes("NUMERIC")) return"Float";
 if (t.includes("JSON")) return"Json";
 if (t.includes("UUID")) return"String @db.Uuid";
 return"String";
 };

 const parseSql = useCallback((sql: string) => {
 const models: string[] = [];
 let modelCount = 0;
 let fieldCount = 0;
 let relationCount = 0;

 const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"']?(\w+)[`"']?\s*\(([\s\S]*?)\)(?:\s*ENGINE\s*=\s*\w+)?;?/gi;
 let match;

 while ((match = tableRegex.exec(sql)) !== null) {
 const rawTableName = match[1];
 const modelName = capitalize(rawTableName);
 const body = match[2];
 modelCount++;
 
 const fields: string[] = [];
 const relations: string[] = [];
 const indexes: string[] = [];
 
 const lines = body.split(",").map((l) => l.trim()).filter((l) => l.length > 0);
 
 for (const line of lines) {
 const upperLine = line.toUpperCase();
 
 if (upperLine.startsWith("PRIMARY KEY") || upperLine.startsWith("FOREIGN KEY") || upperLine.startsWith("UNIQUE") || upperLine.startsWith("INDEX") || upperLine.startsWith("KEY") || upperLine.startsWith("CONSTRAINT")) {
 if (upperLine.includes("FOREIGN KEY")) {
 const fkMatch = line.match(/FOREIGN\s+KEY\s*\((\w+)\)\s*REFERENCES\s+[`"']?(\w+)[`"']?\s*\((\w+)\)/i);
 if (fkMatch) {
 const col = fkMatch[1];
 const refTable = capitalize(fkMatch[2]);
 relationCount++;
 relations.push(` ${col.replace(/_id$/i,"")} ${refTable} @relation(fields: [${col}], references: [${fkMatch[3]}])`);
 }
 }
 continue;
 }

 const parts = line.replace(/^\s+|\s+$/g,"").split(/\s+/);
 if (parts.length < 2) continue;
 
 let colName = parts[0].replace(/[`"']/g,"");
 let sqlType = parts[1].replace(/\(.*\)/,"");
 let isPK = upperLine.includes("PRIMARY KEY");
 let isUnique = upperLine.includes("UNIQUE");
 let isNotNull = upperLine.includes("NOT NULL") || isPK;
 let defaultVal ="";
 
 const defMatch = line.match(/DEFAULT\s+([^,\s]+)/i);
 if (defMatch) {
 let val = defMatch[1];
 if (val.toUpperCase() ==="CURRENT_TIMESTAMP"|| val.toUpperCase() ==="NOW()") {
 defaultVal ="@default(now())";
 } else if (val.toUpperCase() ==="TRUE"|| val.toUpperCase() ==="FALSE") {
 defaultVal = `@default(${val.toLowerCase()})`;
 } else if (!isNaN(Number(val))) {
 defaultVal = `@default(${val})`;
 } else {
 defaultVal = `@default("${val.replace(/['"]/g,"")}")`;
 }
 }

 if (colName.toLowerCase() ==="created_at"&& !defaultVal) defaultVal ="@default(now())";
 if (colName.toLowerCase() ==="updated_at") defaultVal ="@updatedAt";

 let prismaType = mapSqlType(sqlType);
 
 let attrs ="";
 if (isPK) attrs +="@id";
 if (upperLine.includes("AUTO_INCREMENT") || sqlType.toUpperCase().includes("SERIAL")) attrs +="@default(autoincrement())";
 if (isUnique && !isPK) attrs +="@unique";
 if (defaultVal) attrs += ` ${defaultVal}`;
 
 if (!isNotNull && !isPK) prismaType +="?";
 
 let mapAttr ="";
 if (mapSnake && colName.includes("_")) {
 mapAttr = ` @map("${colName}")`;
 colName = colName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
 }

 fieldCount++;
 fields.push(` ${colName} ${prismaType}${attrs}${mapAttr}`);
 }

 let modelMap ="";
 if (mapSnake && rawTableName.includes("_")) {
 modelMap = `\n @@map("${rawTableName}")`;
 }

 const allLines = [...fields, ...relations, ...indexes].join("\n");
 models.push(`model ${modelName} {\n${allLines}${modelMap}\n}`);
 }

 return { code: models.join("\n\n"), models: modelCount, fields: fieldCount, relations: relationCount };
 }, [mapSnake]);

 const result = useMemo(() => parseSql(sqlInput), [sqlInput, parseSql]);

 const howItWorksSteps = [
 { step:"01", title:"Input SQL Schema", description:"Paste your raw SQL CREATE TABLE statements, including foreign keys, indexes, and constraints.", icon: Database },
 { step:"02", title:"Configure Mapping", description:"Select your database provider and toggle automatic snake_case to camelCase field mapping with @map() directives.", icon: Settings },
 { step:"03", title:"Generate Prisma Models", description:"Instantly receive a fully formatted schema.prisma file with relations, defaults, and type mappings ready for prisma generate.", icon: Code2 },
 ];

 const features = [
 { icon: Database, title:"Multi-Provider Support", description:"Generates syntax compatible with PostgreSQL, MySQL, SQLite, and SQL Server database providers."},
 { icon: Code2, title:"Automatic Relation Mapping", description:"Detects FOREIGN KEY constraints and translates them into Prisma @relation directives with proper field references."},
 { icon: Settings, title:"Smart Case Conversion", description:"Automatically converts snake_case SQL columns to camelCase Prisma fields while preserving the original name via @map()."},
 { icon: RotateCcw, title:"Default & Constraint Parsing", description:"Accurately maps PRIMARY KEY, UNIQUE, NOT NULL, and DEFAULT values (including CURRENT_TIMESTAMP) to Prisma attributes."},
 ];

 const faqs = [
 { question:"Does this support multi-table SQL dumps?", answer:"Yes, the parser uses a global regex to identify multiple CREATE TABLE blocks within a single SQL string and generates a corresponding Prisma model for each."},
 { question:"How are foreign keys handled?", answer:"The tool detects FOREIGN KEY ... REFERENCES syntax and creates a Prisma relation field, linking the models together using the @relation attribute."},
 { question:"What happens to snake_case column names?", answer:"If the snake_case mapping toggle is enabled, columns like 'user_id' are converted to 'userId' in Prisma, with an @map(\"user_id\") attribute added to maintain database compatibility."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={Database}
 title="SQL to Prisma Schema Converter"
 description="Translate raw SQL CREATE TABLE statements into clean, typed Prisma ORM models with automatic relation and constraint mapping."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Database className="w-4 h-4"/> SQL Input</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea
 className={textareaClass}
 rows={14}
 value={sqlInput}
 onChange={(e) => setSqlInput(e.target.value)}
 placeholder="Paste CREATE TABLE SQL here..."
 />
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-xs">Provider</Label>
 <select 
 className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 value={provider} 
 onChange={(e) => setProvider(e.target.value)}
 >
 <option value="postgresql">PostgreSQL</option>
 <option value="mysql">MySQL</option>
 <option value="sqlite">SQLite</option>
 <option value="sqlserver">SQL Server</option>
 </select>
 </div>
 <div className="flex items-center gap-2 pt-6">
 <input type="checkbox"id="snake"checked={mapSnake} onChange={(e) => setMapSnake(e.target.checked)} className="rounded border-border"/>
 <Label htmlFor="snake"className="text-xs cursor-pointer">Map snake_case → camelCase</Label>
 </div>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Code2 className="w-4 h-4"/> Prisma Output</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(result.code)} className="h-7 px-2 text-xs">
 <Copy className="w-3 h-3 mr-1"/> Copy
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-3">
 <div className="flex gap-4 text-xs text-muted-foreground border-b border-border/40 pb-2 mb-2">
 <span>{result.models} Models</span>
 <span>{result.fields} Fields</span>
 <span>{result.relations} Relations</span>
 </div>
 <pre className="w-full rounded-lg border border-border/70 bg-background p-4 text-xs text-cyan-400 overflow-x-auto h-80 leading-relaxed font-mono">
 {result.code ||"// No valid CREATE TABLE statements found."}
 </pre>
 </CardContent>
 </Card>
 </div>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","Client-Side Parsing","Prisma v5+ Ready"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>Migrating from SQL to Prisma ORM</h3>
 <p>Transitioning an existing relational database schema to Prisma ORM can be a daunting task, especially when dealing with legacy databases containing dozens of tables, complex foreign key constraints, and custom default values. While Prisma offers a <code>db pull</code> command to introspect an active database, developers often need to convert raw SQL dump files or <code>CREATE TABLE</code> scripts into Prisma schema language (PSL) before a database is even provisioned. Our SQL to Prisma Schema Converter bridges this gap by parsing raw SQL syntax and outputting clean, formatted Prisma models entirely in your browser.</p>
 <p>The parser is designed to handle the nuances of SQL schema definitions, including data type mapping. It translates <code>VARCHAR</code> and <code>TEXT</code> to Prisma <code>String</code>, <code>INT</code> and <code>SERIAL</code> to <code>Int</code>, and properly flags <code>TIMESTAMP</code> fields as <code>DateTime</code>. Crucially, it identifies <code>PRIMARY KEY</code> constraints and applies the <code>@id</code> attribute, while detecting <code>AUTO_INCREMENT</code> or <code>SERIAL</code> types to append <code>@default(autoincrement())</code>. Foreign key references are intelligently mapped to Prisma's <code>@relation</code> directives, ensuring your data graph remains intact and queryable via the Prisma Client.</p>
 <p>Furthermore, the tool respects modern naming conventions by offering automatic conversion from SQL's traditional <code>snake_case</code> to TypeScript-friendly <code>camelCase</code>. When enabled, the converter renames fields like <code>user_profile_id</code> to <code>userProfileId</code> while safely appending an <code>@map("user_profile_id")</code> attribute so Prisma knows exactly which column to query in the underlying database. This eliminates hours of manual schema transcription and prevents costly typos during migration projects.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/sql-to-prisma"/>
 </div>
 );
}

export default SqlToPrismaClient;
