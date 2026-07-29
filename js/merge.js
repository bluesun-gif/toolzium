let selectedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', mergePdfs);
});

function handleFiles(files) {
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    selectedFiles = [...selectedFiles, ...pdfFiles];
    renderFileList();
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderFileList();
}

function renderFileList() {
    const fileList = document.getElementById('fileList');
    const actionBtn = document.getElementById('actionBtn');
    
    fileList.innerHTML = '';
    
    if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = 'file-item';
            div.innerHTML = `
                <span>📄 ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                <button class="remove-btn" onclick="removeFile(${index})">✖</button>
            `;
            fileList.appendChild(div);
        });
        
        if (selectedFiles.length > 1) {
            actionBtn.style.display = 'inline-block';
        } else {
            actionBtn.style.display = 'none';
        }
    } else {
        actionBtn.style.display = 'none';
    }
}

async function mergePdfs() {
    if (selectedFiles.length < 2) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(10, 'Preparing files...');
    
    try {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();
        
        for (let i = 0; i < selectedFiles.length; i++) {
            updateProgress(10 + (80 * (i / selectedFiles.length)), `Processing file ${i + 1} of ${selectedFiles.length}...`);
            
            const file = selectedFiles[i];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }
        
        updateProgress(95, 'Generating merged PDF...');
        const mergedPdfFile = await mergedPdf.save();
        const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        downloadFile(blob, 'merged-document.pdf');
        
    } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('An error occurred while merging the PDFs.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
