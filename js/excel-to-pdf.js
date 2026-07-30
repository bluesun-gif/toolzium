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
        
        let rows = [];
        if (ext === '.csv') {
            const text = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
            rows = parseCSV(text);
        } else {
            // Use SheetJS to read binary Excel file
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        }
        
        updateProgress(50, 'Building PDF table grid...');
        
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.Helvetica_Bold);
        
        // Define page dimensions
        let page = pdfDoc.addPage([612, 792]);
        let y = 740;
        
        // Render rows
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            
            // Check if page needs to break
            if (y < 60) {
                page = pdfDoc.addPage([612, 792]);
                y = 740;
            }
            
            // Draw table grid horizontal borders
            page.drawLine({
                start: { x: 40, y: y + 10 },
                end: { x: 572, y: y + 10 },
                thickness: 0.5,
                color: rgb(0.8, 0.8, 0.8)
            });
            
            // Render cells
            const colWidth = 532 / Math.max(row.length, 1);
            for (let j = 0; j < row.length; j++) {
                const cellVal = String(row[j]).substring(0, 30); // Truncate cell text if long
                const x = 46 + (j * colWidth);
                
                page.drawText(cellVal, {
                    x: x,
                    y: y - 2,
                    size: 9,
                    font: i === 0 ? boldFont : font,
                    color: i === 0 ? rgb(0.1, 0.3, 0.1) : rgb(0.2, 0.2, 0.2)
                });
            }
            
            y -= 22;
        }
        
        // Bottom border
        page.drawLine({
            start: { x: 40, y: y + 10 },
            end: { x: 572, y: y + 10 },
            thickness: 0.5,
            color: rgb(0.8, 0.8, 0.8)
        });
        
        updateProgress(85, 'Compiling output PDF file...');
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
    let p = '', r = [];
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
