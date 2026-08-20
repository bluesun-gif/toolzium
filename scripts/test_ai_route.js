async function testAiApi() {
  const res = await fetch("https://toolzium.com/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: "Extract the core skills from this text: MOHAMMAD NAHIDUL ISLAM, Head of Supply Chain, Grameenphone. Skills: Strategic sourcing, SAP ERP, PMP.",
      model: "gpt4o",
      type: "text",
    }),
  });
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Response:", JSON.stringify(data, null, 2));
}

testAiApi().catch(console.error);
