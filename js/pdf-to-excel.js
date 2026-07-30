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
    updateProgress(15, 'Scanning PDF text columns...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        let workbookData = [];
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(15 + (75 * (i / totalPages)), `Reading sheet page ${i}...`);
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Group text items by their vertical y coordinate (transform[5])
            let rows = {};
            for (const item of textContent.items) {
                // Round coordinate slightly to group items on same line
                const y = Math.round(item.transform[5] * 10) / 10;
                if (!rows[y]) rows[y] = [];
                rows[y].push(item);
            }
            
            // Sort keys descending (top of page has highest Y coordinate in PDF coordinates)
            const sortedY = Object.keys(rows).sort((a,b) => parseFloat(b) - parseFloat(a));
            
            for (const y of sortedY) {
                // Sort items on same row by horizontal x coordinate (transform[4])
                const lineItems = rows[y].sort((a,b) => a.transform[4] - b.transform[4]);
                
                // Construct cells: if items are far apart, they represent separate spreadsheet columns
                let rowCells = [];
                let currentCell = "";
                let lastX = null;
                
                for (const item of lineItems) {
                    if (lastX !== null && (item.transform[4] - lastX > 14)) {
                        rowCells.push(currentCell.trim());
                        currentCell = "";
                    }
                    currentCell += item.str + " ";
                    lastX = item.transform[4] + (item.width || 0);
                }
                if (currentCell) {
                    rowCells.push(currentCell.trim());
                }
                
                workbookData.push(rowCells);
            }
            
            if (i < totalPages) {
                // Add an empty spacer row to mark page breaks
                workbookData.push([]);
            }
        }
        
        updateProgress(95, 'Generating Microsoft Excel (.xlsx) file...');
        
        // Write real XLSX output using SheetJS
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(workbookData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.xlsx';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('PDF to Excel conversion error:', error);
        alert('Could not convert PDF to Excel format.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
