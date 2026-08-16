const testLines = [
  'const x = "hello" + (cond ? "world" : "");',  // should match
  'className={`pb-2 ${active ? "a" : "b"}`}',     // should NOT match (template literal)
  'const y = cardClass + "lg:col-span-2";',       // should match (literal +)
  'const z = "rounded-md" + (cond ? "bg-red" : "bg-blue");', // should match
  'const w = `text-${color}`;',                    // should NOT match
];

const pattern = /"[^"]*"\s*\+\s*(?:\(|[^"'][^;]*\?)/g;
testLines.forEach(l => {
  const m = l.match(pattern);
  console.log((m ? 'MATCH  ' : 'no-match') + ' | ' + l);
});
