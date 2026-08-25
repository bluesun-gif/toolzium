async function checkLiveChunks() {
  const res = await fetch("https://toolzium.com/tools/audio/cutter");
  const html = await res.text();
  const scriptMatches = html.match(/\/(_next\/static\/chunks\/[^"]+\.js)/g) || [];
  console.log(`Found ${scriptMatches.length} script tags in HTML.`);

  for (const src of scriptMatches) {
    const scriptRes = await fetch("https://toolzium.com" + src);
    const js = await scriptRes.text();
    if (js.includes("WAV (Master Lossless)") || js.includes("Download Trimmed Audio")) {
      console.log(`\n=== FOUND IN CHUNK: ${src} ===`);
      const idx = js.indexOf("WAV (Master Lossless)");
      const start = Math.max(0, idx - 200);
      const end = Math.min(js.length, idx + 400);
      console.log(js.substring(start, end));
    }
  }
}

checkLiveChunks().catch(console.error);
