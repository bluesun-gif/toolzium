const fs = require('fs');
const path = require('path');

const appToolsDir = path.join(__dirname, '..', 'app', 'tools');

function findPageFiles(dir) {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      pages = pages.concat(findPageFiles(full));
    } else if (e.name === 'page.tsx') {
      const rel = path.relative(appToolsDir, full).replace(/\\/g, '/');
      const parts = rel.split('/');
      if (parts.length >= 2) {
        pages.push({
          full,
          category: parts[0],
          slug: parts[1],
        });
      }
    }
  }
  return pages;
}

const toolPages = findPageFiles(appToolsDir);
const toolRegistryEntriesMap = new Map();

toolPages.forEach(p => {
  const content = fs.readFileSync(p.full, 'utf8');
  const m = content.match(/import\s+([a-zA-Z0-9_{}\s,]+)\s+from\s+["'](@\/components\/tools\/[^"']+)["']/);
  if (m) {
    const importName = m[1].trim();
    const importPath = m[2];
    const key = `${p.category}/${p.slug}`;
    
    // Check if named import like { QrClient } or default import like WordCounterClient
    const isNamed = importName.startsWith('{') && importName.endsWith('}');
    const cleanName = isNamed ? importName.replace(/[{}]/g, '').trim() : importName;

    if (!toolRegistryEntriesMap.has(key)) {
      toolRegistryEntriesMap.set(key, {
        key,
        importPath,
        isNamed,
        cleanName,
      });
    }
  }
});

const toolRegistryEntries = Array.from(toolRegistryEntriesMap.values());

console.log(`Generating registry with ${toolRegistryEntries.length} tools...`);

const registryCode = `"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[300px] p-8">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);

export const EMBED_REGISTRY: Record<
  string,
  React.ComponentType<any>
> = {
${toolRegistryEntries.map(e => {
  if (e.isNamed) {
    return `  "${e.key}": dynamic(
    () => import("${e.importPath}").then((mod) => mod.${e.cleanName}),
    { loading: LoadingSpinner, ssr: false }
  ),`;
  } else {
    return `  "${e.key}": dynamic(
    () => import("${e.importPath}"),
    { loading: LoadingSpinner, ssr: false }
  ),`;
  }
}).join('\n')}
};

export function getEmbedComponent(category: string, slug: string) {
  const key = \`\${category}/\${slug}\`;
  return EMBED_REGISTRY[key] || null;
}
`;

const outPath = path.join(__dirname, '..', 'components', 'embed', 'embed-registry.tsx');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, registryCode, 'utf8');

console.log(`✅ Generated: ${outPath}`);
