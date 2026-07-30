let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', () => rotatePdf());
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

async function rotatePdf() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    const degrees = parseInt(document.getElementById('rotationAngle').value, 10);
    
    actionBtn.disabled = true;
    updateProgress(20, 'Loading PDF...');
    
    try {
        const { PDFDocument, degrees: degreesFn } = PDFLib;
        const arrayBuffer = await currentFile.arrayBuffer();
        
        updateProgress(50, 'Applying rotation...');
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = pdf.getPages();
        
        pages.forEach(page => {
            const currentRotation = page.getRotation().angle;
            page.setRotation(degreesFn(currentRotation + degrees));
        });
        
        updateProgress(80, 'Generating new PDF...');
        const newPdfFile = await pdf.save();
        
        const blob = new Blob([newPdfFile], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        
        downloadFile(blob, 'rotated-' + currentFile.name);
        
    } catch (error) {
        console.error('Error rotating PDF:', error);
        alert('An error occurred while rotating the PDF.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
