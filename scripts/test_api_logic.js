const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

async function testApiLogic() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage();
  page.drawText('CV MOHAMMAD NAHIDUL ISLAM\nDhaka, Bangladesh | +8801911310843\nSenior leadership professional with 25+ years of cross-functional experience in Telecom, Healthcare, FMCG.', {
    x: 50,
    y: 700,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();

  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(pdfBytes),
    useSystemFonts: true,
    disableFontFace: false,
  });
  const pdf = await loadingTask.promise;
  console.log("PDF parsed successfully, pages:", pdf.numPages);
  const p1 = await pdf.getPage(1);
  const tc = await p1.getTextContent();
  const str = tc.items.map(i => i.str).join(" ");
  console.log("Extracted text:", str);
}

testApiLogic().catch(console.error);
