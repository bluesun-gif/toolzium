const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'components', 'tools');
const categories = fs.readdirSync(toolsDir, { withFileTypes: true }).filter(d => d.isDirectory());

console.log(`Found ${categories.length} category folders in components/tools:`);
categories.forEach(cat => {
  const files = fs.readdirSync(path.join(toolsDir, cat.name)).filter(f => f.endsWith('.tsx'));
  console.log(`  ${cat.name}: ${files.length} client files (e.g. ${files.slice(0, 2).join(', ')})`);
});
