const report = JSON.parse(require('fs').readFileSync('hermes_audit_report.json','utf8'));
const failing = report.results.filter(r => r.overallStatus === 'FAIL' && r.classConcatBugs.some(b=>b.bugType==='Direct string concat (broken)'));
let simple=0, complex=0;
const pattern = /className[^>]*"(?:bg-|text-|p-|m-|rounded-|border-|flex-|grid-|w-|h-|space-|gap-|justify-|items-|self-)[^"]*"\s*\+/;
failing.forEach(r => {
  const file = r.file;
  const c = require('fs').readFileSync(file, 'utf8');
  c.split('\n').forEach(line=>{
    if(line.includes('className') && line.includes('+') && !line.includes('cn(') && pattern.test(line)) {
      const plusCount = (line.match(/\+/g)||[]).length;
      if(plusCount <= 2) simple++; else complex++;
    }
  });
});
console.log('Simple (1-2 plus):', simple);
console.log('Complex (3+ plus):', complex);
