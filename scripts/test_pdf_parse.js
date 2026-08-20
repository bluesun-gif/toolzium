const PDFParser = require("pdf2json");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

async function testPdf() {
  // 1. Create a real test PDF in memory using pdf-lib
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 14;
  page.drawText('MOHAMMAD NAHIDUL ISLAM\nSenior Leadership Professional with 25+ years experience in Supply Chain and Operations.', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();

  // 2. Parse using pdf2json
  const parser = new PDFParser(null, 1);
  parser.on("pdfParser_dataError", errData => console.error("Error:", errData.parserError));
  parser.on("pdfParser_dataReady", pdfData => {
    const rawText = parser.getRawTextContent();
    console.log("Extracted text successfully with pdf2json:");
    console.log("-----------------------------------------");
    console.log(rawText.slice(0, 200));
    console.log("-----------------------------------------");
  });

  parser.parseBuffer(Buffer.from(pdfBytes));
}

testPdf();
