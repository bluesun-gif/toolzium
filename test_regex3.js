const test = 'className={"flex items-center gap-2"+\n  "w-2 h-2 rounded-full"+\n  "bg-green-500"}';
const regex = /className=\{(["'`][^"'`]*["'`](?:\s*\+\s*["'`][^"'`]*["'`])+)\}/g;
const m = test.match(regex);
console.log('Match:', !!m);
if (m) console.log('Captured:', JSON.stringify(m[1]));

// Also test the simple one
const test2 = 'className={"flex items-center gap-2"+\n  someVar}';
const regex2 = /className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])\}/g;
const m2 = test2.match(regex2);
console.log('Match2:', !!m2);
