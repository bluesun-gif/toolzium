let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', () => convertPdfToPpt());
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

async function convertPdfToPpt() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(15, 'Scanning PDF slides...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(15 + (80 * (i / totalPages)), `Rendering slide ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            
            // PPT uses standard widescreen aspect ratio (16:9)
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            // Set slide resolution
            canvas.width = 1280;
            canvas.height = 720;
            
            // Paint background white
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Scale and center PDF viewport inside 16:9 slide
            const scaleX = canvas.width / viewport.width;
            const scaleY = canvas.height / viewport.height;
            const minScale = Math.min(scaleX, scaleY);
            
            const centeredX = (canvas.width - (viewport.width * minScale)) / 2;
            const centeredY = (canvas.height - (viewport.height * minScale)) / 2;
            
            const renderViewport = page.getViewport({ scale: 1.5 * minScale });
            
            context.translate(centeredX, centeredY);
            await page.render({
                canvasContext: context,
                viewport: renderViewport
            }).promise;
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            
            downloadFile(blob, `slide-${i}.jpg`);
            await new Promise(r => setTimeout(r, 200));
        }
        
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('PDF to PPT conversion error:', error);
        alert('Could not convert PDF to PPT slides.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
