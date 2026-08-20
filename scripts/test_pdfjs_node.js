const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

async function testPdfDist() {
  // 1. Create a real test PDF in memory using pdf-lib
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 14;
  page.drawText('MOHAMMAD NAHIDUL ISLAM - Senior Operations Leader', {
    x: 50,
    y: height - 50,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();

  // 2. Test importing pdfjs-dist
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) }).promise;
  console.log("Pages:", doc.numPages);
  const p1 = await doc.getPage(1);
  const tc = await p1.getTextContent();
  const text = tc.items.map(item => item.str).join(" ");
  console.log("Extracted text with legacy pdfjs-dist:", text);
}

testPdfDist().catch(console.error);
