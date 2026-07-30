let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', () => convertPdfToImage());
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

async function convertPdfToImage() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    const format = document.getElementById('imageFormat').value;
    const ext = format === 'image/jpeg' ? '.jpg' : '.png';
    
    actionBtn.disabled = true;
    updateProgress(10, 'Loading PDF...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(10 + (90 * (i / totalPages)), `Processing page ${i} of ${totalPages}...`);
            
            const page = await pdf.getPage(i);
            const scale = 2.0; // Higher scale for better quality
            const viewport = page.getViewport({ scale });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            const dataUrl = canvas.toDataURL(format, 0.9);
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            
            downloadFile(blob, `page-${i}${ext}`);
            
            // Slight delay to avoid browser blocking multiple downloads
            await new Promise(r => setTimeout(r, 200));
        }
        
        updateProgress(100, 'Complete!');
        
    } catch (error) {
        console.error('Error converting PDF to image:', error);
        alert('An error occurred during conversion.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
