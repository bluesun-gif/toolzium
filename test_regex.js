const test = 'className={`pb-2 border-b-2 transition-colors capitalize ${activeTab === tab ? \'border-primary text-primary\' : \'border-border text-muted-foreground\'}`}';
const m = test.match(/className=\{\`([^`]*)\$\{([^`]*)\}([^`]*)\`\}/);
console.log('Match:', !!m);
if (m) console.log('Groups:', JSON.stringify(m.slice(1)));
