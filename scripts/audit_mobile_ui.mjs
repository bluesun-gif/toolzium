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
console.log(`Total tool client files: ${toolFiles.length}`);

const issues = [];

for (const file of toolFiles) {
  const content = fs.readFileSync(file, "utf8");
  const fileIssues = [];

  // 1. Actions unwrapped flex
  const actionMatch = content.match(/actions\s*=\s*\{\s*<div className="([^"]+)"/);
  if (actionMatch) {
    const cls = actionMatch[1];
    if (cls.includes("flex") && !cls.includes("flex-wrap")) {
      fileIssues.push({ type: "actions_no_wrap", current: cls });
    }
  }

  // 2. Fixed pixel widths > 320px without responsive prefix
  const fixedWidthMatches = content.match(/\b(w-\[(3[5-9]\d|[4-9]\d\d|\d{4,})px\])/g);
  if (fixedWidthMatches) {
    fileIssues.push({ type: "fixed_width", items: [...new Set(fixedWidthMatches)] });
  }

  // 3. Min width > 320px
  const minWidthMatches = content.match(/\b(min-w-\[(3[5-9]\d|[4-9]\d\d|\d{4,})px\])/g);
  if (minWidthMatches) {
    fileIssues.push({ type: "min_width", items: [...new Set(minWidthMatches)] });
  }

  if (fileIssues.length > 0) {
    issues.push({
      file,
      relPath: path.relative("c:/Users/LOQ/toolflux", file).replace(/\\/g, "/"),
      issues: fileIssues,
    });
  }
}

console.log(`\nFound ${issues.length} tools with potential mobile UI constraints:\n`);
for (const item of issues) {
  console.log(`- ${item.relPath}: ${JSON.stringify(item.issues)}`);
}
