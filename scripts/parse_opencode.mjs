import fs from "fs";

const raw = fs.readFileSync("C:/Users/LOQ/.gemini/antigravity/brain/397966db-1b49-47f0-aa9e-4416e24823ff/.system_generated/steps/7284/content.md", "utf8");

const regex = /"type":"text","text":("([^"\\]|\\.)*")/g;
let match;
let i = 0;
while ((match = regex.exec(raw)) !== null) {
  i++;
  try {
    const txt = JSON.parse(match[1]);
    console.log(`\n================ MESSAGE #${i} ================\n`);
    console.log(txt.length > 500 ? txt.slice(0, 500) + "\n...[truncated]" : txt);
  } catch (e) {
    console.log(`Msg ${i}: raw parse error`);
  }
}
