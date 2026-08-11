// lib/utils/sql-parser.ts
export function parseSqlToPrisma(sqlInput: string): string {
  let sql = sqlInput.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const enums: { name: string; values: string[] }[] = [];
  const models: any[] = [];

  const enumRegex = /CREATE\s+TYPE\s+([a-zA-Z0-9_]+)\s+AS\s+ENUM\s*\(([^)]+)\)/gi;
  let match;
  while ((match = enumRegex.exec(sql)) !== null) {
    enums.push({ name: match[1], values: match[2].split(",").map(v => v.trim().replace(/^['"]|['"]$/g, "")) });
  }

  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"']?([a-zA-Z0-9_]+)[`"']?\s*\(/gi;
  let tableMatch;
  
  while ((tableMatch = tableRegex.exec(sql)) !== null) {
    const originalTableName = tableMatch[1];
    const modelName = toPascalCase(originalTableName);
    let depth = 1;
    let startIndex = tableMatch.index + tableMatch[0].length;
    let endIndex = startIndex;
    
    for (let i = startIndex; i < sql.length; i++) {
      if (sql[i] === "(") depth++;
      else if (sql[i] === ")") { depth--; if (depth === 0) { endIndex = i; break; } }
    }
    
    const lines = splitByComma(sql.substring(startIndex, endIndex));
    const fields: any[] = [];
    const tableRelations: any[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      const upper = trimmed.toUpperCase();
      if (!trimmed || upper.startsWith("PRIMARY KEY") || upper.startsWith("UNIQUE") || upper.startsWith("CHECK") || upper.startsWith("INDEX")) continue;
      
      if (upper.startsWith("FOREIGN KEY") || upper.startsWith("CONSTRAINT")) {
        const fkMatch = trimmed.match(/FOREIGN\s+KEY\s*\([`"']?([a-zA-Z0-9_]+)[`"']?\)\s*REFERENCES\s+[`"']?([a-zA-Z0-9_]+)[`"']?\s*\([`"']?([a-zA-Z0-9_]+)[`"']?\)(?:\s+ON\s+DELETE\s+([a-zA-Z\s]+))?(?:\s+ON\s+UPDATE\s+([a-zA-Z\s]+))?/i);
        if (fkMatch) tableRelations.push({ field: fkMatch[1], refTable: fkMatch[2], refField: fkMatch[3], onDelete: fkMatch[4]?.trim(), onUpdate: fkMatch[5]?.trim() });
        continue;
      }
      
      const parts = trimmed.match(/^[`"']?([a-zA-Z0-9_]+)[`"']?\s+([a-zA-Z0-9_]+(?:\s*\([^)]*\))?(?:\[\])?)\s*(.*)$/i);
      if (parts) {
        const originalName = parts[1];
        const sqlTypeRaw = parts[2];
        const constraints = parts[3];
        let fieldName = toCamelCase(originalName);
        let prismaType = mapSqlType(sqlTypeRaw);
        
        if (sqlTypeRaw.toUpperCase().startsWith("ENUM")) {
           const enumValsMatch = sqlTypeRaw.match(/ENUM\s*\(([^)]+)\)/i);
           if (enumValsMatch) {
             const enumName = `${modelName}_${fieldName}_enum`;
             enums.push({ name: enumName, values: enumValsMatch[1].split(",").map(v => v.trim().replace(/^['"]|['"]$/g, "")) });
             prismaType = enumName;
           }
        } else if (enums.find(e => e.name.toLowerCase() === sqlTypeRaw.toLowerCase())) {
           prismaType = enums.find(e => e.name.toLowerCase() === sqlTypeRaw.toLowerCase())!.name;
        }
        
        const upperConstraints = constraints.toUpperCase();
        const isId = upperConstraints.includes("PRIMARY KEY");
        const isUnique = upperConstraints.includes("UNIQUE");
        const isOptional = !(upperConstraints.includes("NOT NULL") || isId);
        
        let defaultVal = "";
        const defaultMatch = constraints.match(/DEFAULT\s+([^,]+)/i);
        if (defaultMatch) {
          let val = defaultMatch[1].trim();
          if (["CURRENT_TIMESTAMP", "NOW()"].includes(val.toUpperCase())) defaultVal = "@default(now())";
          else if (["TRUE", "FALSE"].includes(val.toUpperCase())) defaultVal = `@default(${val.toLowerCase()})`;
          else if (!isNaN(Number(val))) defaultVal = `@default(${val})`;
          else defaultVal = `@default("${val.replace(/^['"]|['"]$/g, "")}")`;
        }
        if (upperConstraints.includes("AUTO_INCREMENT") || sqlTypeRaw.toUpperCase().includes("SERIAL")) defaultVal = "@default(autoincrement())";

        const inlineRefMatch = constraints.match(/REFERENCES\s+[`"']?([a-zA-Z0-9_]+)[`"']?\s*\([`"']?([a-zA-Z0-9_]+)[`"']?\)/i);
        if (inlineRefMatch) tableRelations.push({ field: originalName, refTable: inlineRefMatch[1], refField: inlineRefMatch[2] });

        fields.push({ name: fieldName, originalName, type: prismaType, isId, isUnique, isOptional, defaultVal });
      }
    }
    models.push({ name: modelName, originalName: originalTableName, fields, relations: tableRelations });
  }

  let output = "";
  for (const en of enums) output += `enum ${en.name} {\n${en.values.map(v => `  ${v.replace(/[^a-zA-Z0-9_]/g, "_")}`).join("\n")}\n}\n\n`;
  
  for (const model of models) {
    output += `model ${model.name} {\n`;
    for (const field of model.fields) {
      let line = `  ${field.name} ${field.type}`;
      if (field.isOptional && !field.isId) line += "?";
      if (field.isId) line += " @id";
      if (field.isUnique && !field.isId) line += " @unique";
      if (field.defaultVal) line += ` ${field.defaultVal}`;
      if (field.name !== field.originalName) line += ` @map("${field.originalName}")`;
      output += line + "\n";
    }
    for (const rel of model.relations) {
       const fieldName = toCamelCase(rel.field);
       const refModel = toPascalCase(rel.refTable);
       const refField = toCamelCase(rel.refField);
       let relLine = `  ${refModel.toLowerCase()} ${refModel} @relation(fields: [${fieldName}], references: [${refField}]`;
       if (rel.onDelete) relLine += `, onDelete: ${rel.onDelete.replace(/\s+/g, "")}`;
       relLine += `)`;
       output += relLine + "\n";
    }
    output += `\n  @@map("${model.originalName}")\n}\n\n`;
  }
  return output.trim();
}

const toCamelCase = (str: string): string => str.replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());
const toPascalCase = (str: string): string => { const c = toCamelCase(str); return c.charAt(0).toUpperCase() + c.slice(1); };

function splitByComma(str: string): string[] {
  const result: string[] = []; let current = ""; let depth = 0; let inQuote = false; let quoteChar = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (inQuote) { current += char; if (char === quoteChar && str[i-1] !== "\\") inQuote = false; }
    else {
      if (char === "'" || char === '"') { inQuote = true; quoteChar = char; current += char; }
      else if (char === "(") { depth++; current += char; }
      else if (char === ")") { depth--; current += char; }
      else if (char === "," && depth === 0) { result.push(current.trim()); current = ""; }
      else current += char;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function mapSqlType(sqlType: string): string {
  if (sqlType.includes("[]")) return mapSqlType(sqlType.replace("[]", "")) + "[]";
  const type = sqlType.toUpperCase().replace(/\(.*\)/, "").trim();
  if (["INT", "INTEGER", "SERIAL", "SMALLINT"].includes(type)) return "Int";
  if (["BIGINT", "BIGSERIAL"].includes(type)) return "BigInt";
  if (["BOOLEAN", "BOOL"].includes(type)) return "Boolean";
  if (["VARCHAR", "CHAR", "TEXT", "CITEXT", "UUID", "INET", "MACADDR", "XML"].includes(type)) return "String";
  if (["TIMESTAMP", "DATETIME", "DATE", "TIME"].includes(type)) return "DateTime";
  if (["FLOAT", "REAL", "DOUBLE PRECISION"].includes(type)) return "Float";
  if (["DECIMAL", "NUMERIC", "MONEY"].includes(type)) return "Decimal";
  if (["JSON", "JSONB"].includes(type)) return "Json";
  if (["BYTEA", "BLOB", "BINARY"].includes(type)) return "Bytes";
  return "String";
}
