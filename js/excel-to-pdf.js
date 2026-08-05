let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', () => convertExcelToPdf());
});

function handleFiles(files) {
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const excelFiles = files.filter(f => {
        const ext = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
        return validTypes.includes(ext) || f.type.includes('csv') || f.type.includes('excel') || f.type.includes('spreadsheet');
    });
    if (excelFiles.length > 0) {
        currentFile = excelFiles[0];
        renderFileList();
    }
}

function renderFileList() {
    const fileList = document.getElementById('fileList');
    const actionBtn = document.getElementById('actionBtn');
    
    fileList.innerHTML = '';
    
    if (currentFile) {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
            <span>📄 ${currentFile.name} (${(currentFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button class="remove-btn" onclick="currentFile=null; renderFileList();">✖</button>
        `;
        fileList.appendChild(div);
        actionBtn.style.display = 'inline-block';
    } else {
        actionBtn.style.display = 'none';
    }
}

async function convertExcelToPdf() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(20, 'Reading spreadsheet content...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const ext = currentFile.name.substring(currentFile.name.lastIndexOf('.')).toLowerCase();
        
        let allSheets = [];
        
        if (ext === '.csv') {
            const text = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
            allSheets.push({ name: 'Sheet1', rows: parseCSV(text) });
        } else {
            // Use SheetJS to read binary Excel file
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Process all sheets
            for (const sheetName of workbook.SheetNames) {
                const worksheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                allSheets.push({ name: sheetName, rows: rows });
            }
        }
        
        updateProgress(45, 'Building PDF tables...');
        
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        const pageWidth = 842;  // A4 landscape width
        const pageHeight = 595; // A4 landscape height
        const margin = 40;
        const tableWidth = pageWidth - (margin * 2);
        const rowHeight = 20;
        const headerRowHeight = 24;
        const fontSize = 8;
        const headerFontSize = 9;
        
        for (let s = 0; s < allSheets.length; s++) {
            const sheet = allSheets[s];
            const rows = sheet.rows;
            if (!rows || rows.length === 0) continue;
            
            updateProgress(45 + (50 * (s / allSheets.length)), `Rendering sheet: ${sheet.name}...`);
            
            // Calculate max columns
            let maxCols = 0;
            for (const row of rows) {
                if (row && row.length > maxCols) maxCols = row.length;
            }
            if (maxCols === 0) continue;
            
            // Calculate column widths based on content
            let colWidths = new Array(maxCols).fill(0);
            for (const row of rows) {
                for (let j = 0; j < maxCols; j++) {
                    const cellText = row[j] !== undefined ? String(row[j]) : '';
                    const textWidth = font.widthOfTextAtSize(cellText.substring(0, 40), fontSize);
                    colWidths[j] = Math.max(colWidths[j], textWidth + 12);
                }
            }
            
            // Normalize column widths to fit table
            const totalContentWidth = colWidths.reduce((a, b) => a + b, 0);
            if (totalContentWidth > 0) {
                const scale = tableWidth / totalContentWidth;
                colWidths = colWidths.map(w => Math.max(w * scale, 30));
            }
            
            let page = pdfDoc.addPage([pageWidth, pageHeight]);
            let y = pageHeight - margin;
            
            // Sheet title
            if (allSheets.length > 1) {
                page.drawText(`Sheet: ${sheet.name}`, {
                    x: margin, y: y, size: 12,
                    font: boldFont, color: rgb(0.1, 0.1, 0.4)
                });
                y -= 24;
            }
            
            // Draw table
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i] || [];
                const isHeader = (i === 0);
                const currentRowHeight = isHeader ? headerRowHeight : rowHeight;
                
                // Check page break
                if (y - currentRowHeight < margin) {
                    page = pdfDoc.addPage([pageWidth, pageHeight]);
                    y = pageHeight - margin;
                }
                
                let x = margin;
                
                // Draw row background
                if (isHeader) {
                    page.drawRectangle({
                        x: margin, y: y - currentRowHeight,
                        width: tableWidth, height: currentRowHeight,
                        color: rgb(0.15, 0.3, 0.55)
                    });
                } else if (i % 2 === 0) {
                    page.drawRectangle({
                        x: margin, y: y - currentRowHeight,
                        width: tableWidth, height: currentRowHeight,
                        color: rgb(0.95, 0.96, 0.98)
                    });
                }
                
                // Draw cells
                for (let j = 0; j < maxCols; j++) {
                    const cellVal = row[j] !== undefined ? String(row[j]).substring(0, 40) : '';
                    
                    // Draw cell border
                    page.drawRectangle({
                        x: x, y: y - currentRowHeight,
                        width: colWidths[j], height: currentRowHeight,
                        borderColor: rgb(0.78, 0.8, 0.83),
                        borderWidth: 0.5,
                        opacity: 0
                    });
                    
                    // Draw text
                    const textY = y - currentRowHeight + (currentRowHeight - (isHeader ? headerFontSize : fontSize)) / 2 + 1;
                    try {
                        page.drawText(cellVal, {
                            x: x + 4,
                            y: textY,
                            size: isHeader ? headerFontSize : fontSize,
                            font: isHeader ? boldFont : font,
                            color: isHeader ? rgb(1, 1, 1) : rgb(0.15, 0.15, 0.15),
                            maxWidth: colWidths[j] - 8
                        });
                    } catch(e) {
                        // Skip if text can't be drawn (encoding issues)
                    }
                    
                    x += colWidths[j];
                }
                
                y -= currentRowHeight;
            }
        }
        
        updateProgress(92, 'Compiling output PDF...');
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.pdf';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('Excel to PDF conversion error:', error);
        alert('Could not convert Spreadsheet file to PDF.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}

// Custom CSV Parser supporting quotes and commas
function parseCSV(text) {
    let r = [];
    let q = false;
    let row = [''];
    
    for (let i = 0; i < text.length; i++) {
        let cc = text[i], nc = text[i+1];
        
        if (cc === '"') {
            if (q && nc === '"') { row[row.length - 1] += cc; i++; }
            else { q = !q; }
            continue;
        }
        if (cc === ',' && !q) {
            row.push('');
            continue;
        }
        if (cc === '\n' && !q) {
            r.push(row);
            row = [''];
            continue;
        }
        if (cc === '\r') continue;
        
        row[row.length - 1] += cc;
    }
    if (row.length > 1 || row[0] !== '') r.push(row);
    return r;
}
