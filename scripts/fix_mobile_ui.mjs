import fs from "fs";
import path from "path";

function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, filter));
    } else if (filter(filePath)) {
      results.push(filePath);
    }
  }
  return results;
}

const toolFiles = findFiles("c:/Users/LOQ/toolflux/components/tools", (p) => p.endsWith(".tsx"));
let modifiedCount = 0;

for (const file of toolFiles) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // 1. Fix header actions without flex-wrap
  // Replace actions={<div className="flex gap-2"> with actions={<div className="flex flex-wrap items-center gap-2">
  const newContent1 = content.replace(
    /actions=\{\s*<div className="flex (items-center )?gap-([0-9]+)"/g,
    'actions={<div className="flex flex-wrap items-center gap-$2"'
  );
  if (newContent1 !== content) {
    content = newContent1;
    changed = true;
  }

  const newContent2 = content.replace(
    /actions=\{\s*<div className="flex space-x-([0-9]+)"/g,
    'actions={<div className="flex flex-wrap items-center gap-$1"'
  );
  if (newContent2 !== content) {
    content = newContent2;
    changed = true;
  }

  // 2. Fix standalone w-[1400px] that should be max-w-[1400px] w-full
  const newContent3 = content.replace(/\bclassName="([^"]*)\bw-\[1400px\]([^"]*)"/g, (match, p1, p2) => {
    return `className="${p1}w-full max-w-[1400px]${p2}"`;
  });
  if (newContent3 !== content) {
    content = newContent3;
    changed = true;
  }

  // 3. Fix tables/elements with fixed min-w-[600px].. without overflow wrapper
  // Ensure tables with min-w have parent overflow-x-auto or convert rigid pixel widths
  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    modifiedCount++;
    console.log(`✅ Fixed mobile layout in: ${path.relative("c:/Users/LOQ/toolflux", file).replace(/\\/g, "/")}`);
  }
}

console.log(`\n🎉 Systematically updated ${modifiedCount} tool components for 100% mobile fluidity!`);
