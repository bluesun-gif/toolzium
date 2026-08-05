let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', () => compressPdf());
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
    updateProgress(10, 'Loading PDF...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        
        // Load PDF using pdf.js
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        
        // Create new PDF using pdf-lib
        const { PDFDocument } = PDFLib;
        const newPdf = await PDFDocument.create();
        
        const level = document.getElementById('compressLevel').value;
        const quality = level === 'high' ? 0.40 : 0.65;
        
        for (let i = 1; i <= numPages; i++) {
            updateProgress(10 + Math.floor((i / numPages) * 80), `Compressing page ${i} of ${numPages}...`);
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            
            // Re-encode as JPEG
            const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
            const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
            const image = await newPdf.embedJpg(imgBytes);
            
            const newPage = newPdf.addPage([viewport.width, viewport.height]);
            newPage.drawImage(image, {
                x: 0,
                y: 0,
                width: viewport.width,
                height: viewport.height
            });
        }
        
        updateProgress(95, 'Generating compressed PDF...');
        const newPdfBytes = await newPdf.save({ useObjectStreams: true });
        
        let blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        
        const displaySize = blob.size;
        const compressedSize = (displaySize / 1024 / 1024).toFixed(2);
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
