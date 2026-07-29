let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', splitPdf);
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
    const optionsContainer = document.getElementById('optionsContainer');
    
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
        optionsContainer.style.display = 'block';
    } else {
        actionBtn.style.display = 'none';
        optionsContainer.style.display = 'none';
    }
}

function parsePageRange(rangeStr, maxPages) {
    if (!rangeStr.trim()) {
        // Return all pages if empty
        return Array.from({length: maxPages}, (_, i) => i);
    }
    
    const pages = new Set();
    const parts = rangeStr.split(',');
    
    for (let part of parts) {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(num => parseInt(num.trim(), 10));
            if (!isNaN(start) && !isNaN(end) && start > 0 && end <= maxPages && start <= end) {
                for (let i = start; i <= end; i++) {
                    pages.add(i - 1); // 0-indexed
                }
            }
        } else {
            const num = parseInt(part, 10);
            if (!isNaN(num) && num > 0 && num <= maxPages) {
                pages.add(num - 1);
            }
        }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
}

async function splitPdf() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    const rangeInput = document.getElementById('pageRange').value;
    actionBtn.disabled = true;
    updateProgress(20, 'Loading PDF...');
    
    try {
        const { PDFDocument } = PDFLib;
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const totalPages = pdf.getPageCount();
        
        const pagesToExtract = parsePageRange(rangeInput, totalPages);
        
        if (pagesToExtract.length === 0) {
            alert('Invalid page range.');
            return;
        }
        
        updateProgress(60, 'Extracting pages...');
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
        
        copiedPages.forEach((page) => {
            newPdf.addPage(page);
        });
        
        updateProgress(90, 'Generating new PDF...');
        const newPdfFile = await newPdf.save();
        const blob = new Blob([newPdfFile], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        downloadFile(blob, 'split-document.pdf');
        
    } catch (error) {
        console.error('Error splitting PDF:', error);
        alert('An error occurred while splitting the PDF.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
