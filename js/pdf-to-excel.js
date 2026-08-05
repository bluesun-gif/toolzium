let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', () => convertPdfToExcel());
});

function handleFiles(files) {
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    if (pdfFiles.length > 0) {
        currentFile = pdfFiles[0];
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

async function convertPdfToExcel() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(10, 'Scanning PDF text layout...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        // Process each page into sheets
        let allSheetData = [];
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(10 + (70 * (i / totalPages)), `Analyzing page ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const viewport = page.getViewport({ scale: 1.0 });
            
            // Group text items by Y coordinate (rows)
            let rowMap = {};
            for (const item of textContent.items) {
                if (!item.str.trim()) continue;
                // Round Y to nearest 3 units to group text on same line
                const y = Math.round(item.transform[5] / 3) * 3;
                if (!rowMap[y]) rowMap[y] = [];
                rowMap[y].push({
                    text: item.str,
                    x: item.transform[4],
                    width: item.width || 0,
                    fontSize: Math.round(item.transform[0])
                });
            }
            
            // Sort rows top to bottom (descending Y in PDF coords)
            const sortedYKeys = Object.keys(rowMap).sort((a, b) => parseFloat(b) - parseFloat(a));
            
            if (sortedYKeys.length === 0) continue;
            
            // Detect column boundaries using X-position clustering
            let allXPositions = [];
            for (const y of sortedYKeys) {
                const items = rowMap[y].sort((a, b) => a.x - b.x);
                for (const item of items) {
                    allXPositions.push(Math.round(item.x / 5) * 5);
                }
            }
            
            // Find unique column start positions
            let colBoundaries = [...new Set(allXPositions)].sort((a, b) => a - b);
            
            // Merge boundaries that are too close together (< 20 units)
            let mergedBoundaries = [colBoundaries[0]];
            for (let b = 1; b < colBoundaries.length; b++) {
                if (colBoundaries[b] - mergedBoundaries[mergedBoundaries.length - 1] > 20) {
                    mergedBoundaries.push(colBoundaries[b]);
                }
            }
            
            // Build rows using column boundaries
            let pageRows = [];
            for (const y of sortedYKeys) {
                const items = rowMap[y].sort((a, b) => a.x - b.x);
                let row = new Array(mergedBoundaries.length).fill('');
                
                for (const item of items) {
                    // Find which column this item belongs to
                    let colIdx = 0;
                    let minDist = Infinity;
                    for (let c = 0; c < mergedBoundaries.length; c++) {
                        const dist = Math.abs(item.x - mergedBoundaries[c]);
                        if (dist < minDist) {
                            minDist = dist;
                            colIdx = c;
                        }
                    }
                    
                    // Append text to the cell (space separated if multiple items in same cell)
                    row[colIdx] = row[colIdx] ? row[colIdx] + ' ' + item.text : item.text;
                }
                
                // Skip completely empty rows
                if (row.some(cell => cell.trim())) {
                    pageRows.push(row);
                }
            }
            
            allSheetData.push({
                name: totalPages > 1 ? `Page ${i}` : 'Sheet1',
                rows: pageRows
            });
        }
        
        updateProgress(85, 'Generating Excel file...');
        
        // Build XLSX workbook using SheetJS
        const wb = XLSX.utils.book_new();
        
        if (allSheetData.length === 0) {
            throw new Error('No text content found in PDF.');
        }
        
        // If single page, just create one sheet
        if (allSheetData.length === 1) {
            const ws = XLSX.utils.aoa_to_sheet(allSheetData[0].rows);
            
            // Auto-size columns
            const colWidths = [];
            for (const row of allSheetData[0].rows) {
                for (let j = 0; j < row.length; j++) {
                    const len = String(row[j] || '').length;
                    colWidths[j] = Math.max(colWidths[j] || 8, Math.min(len + 2, 50));
                }
            }
            ws['!cols'] = colWidths.map(w => ({ wch: w }));
            
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        } else {
            // Multiple pages -> separate sheets
            for (const sheet of allSheetData) {
                const ws = XLSX.utils.aoa_to_sheet(sheet.rows);
                
                const colWidths = [];
                for (const row of sheet.rows) {
                    for (let j = 0; j < row.length; j++) {
                        const len = String(row[j] || '').length;
                        colWidths[j] = Math.max(colWidths[j] || 8, Math.min(len + 2, 50));
                    }
                }
                ws['!cols'] = colWidths.map(w => ({ wch: w }));
                
                XLSX.utils.book_append_sheet(wb, ws, sheet.name.substring(0, 31));
            }
        }
        
        updateProgress(95, 'Saving .xlsx file...');
        
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        
        const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.xlsx';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('PDF to Excel conversion error:', error);
        alert('Could not convert PDF to Excel format. ' + (error.message || ''));
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
