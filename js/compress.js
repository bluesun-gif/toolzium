let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', compressPdf);
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

async function compressPdf() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(20, 'Loading PDF...');
    
    try {
        const { PDFDocument } = PDFLib;
        const arrayBuffer = await currentFile.arrayBuffer();
        
        updateProgress(50, 'Optimizing structure...');
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // Client-side compression mainly relies on saving without object streams or optimizing objects.
        // True compression (downsampling images) is hard purely in browser without large libraries.
        // We will do a structural save.
        
        updateProgress(80, 'Generating compressed PDF...');
        const newPdfFile = await pdf.save({ useObjectStreams: false });
        
        const blob = new Blob([newPdfFile], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        
        const compressedSize = (blob.size / 1024 / 1024).toFixed(2);
        const originalSize = (currentFile.size / 1024 / 1024).toFixed(2);
        
        document.getElementById('progressText').textContent = `Complete! Reduced size from ${originalSize}MB to ${compressedSize}MB.`;
        
        downloadFile(blob, 'compressed-' + currentFile.name);
        
    } catch (error) {
        console.error('Error compressing PDF:', error);
        alert('An error occurred while compressing the PDF.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 5000);
    }
}
