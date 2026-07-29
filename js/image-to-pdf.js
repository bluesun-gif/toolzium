let selectedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    
    actionBtn.addEventListener('click', convertImageToPdf);
});

function handleFiles(files) {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    selectedFiles = [...selectedFiles, ...imageFiles];
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
                <span>🖼️ ${file.name}</span>
                <button class="remove-btn" onclick="removeFile(${index})">✖</button>
            `;
            fileList.appendChild(div);
        });
        
        actionBtn.style.display = 'inline-block';
    } else {
        actionBtn.style.display = 'none';
    }
}

async function convertImageToPdf() {
    if (selectedFiles.length === 0) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(10, 'Preparing PDF...');
    
    try {
        const { PDFDocument } = PDFLib;
        const pdf = await PDFDocument.create();
        
        for (let i = 0; i < selectedFiles.length; i++) {
            updateProgress(10 + (80 * (i / selectedFiles.length)), `Processing image ${i + 1} of ${selectedFiles.length}...`);
            
            const file = selectedFiles[i];
            const arrayBuffer = await file.arrayBuffer();
            let image;
            
            if (file.type === 'image/jpeg') {
                image = await pdf.embedJpg(arrayBuffer);
            } else if (file.type === 'image/png') {
                image = await pdf.embedPng(arrayBuffer);
            } else {
                continue; // Skip unsupported format
            }
            
            const page = pdf.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height
            });
        }
        
        updateProgress(95, 'Generating PDF...');
        const pdfFile = await pdf.save();
        const blob = new Blob([pdfFile], { type: 'application/pdf' });
        
        updateProgress(100, 'Complete!');
        downloadFile(blob, 'images-converted.pdf');
        
    } catch (error) {
        console.error('Error converting images to PDF:', error);
        alert('An error occurred during conversion. Ensure you are uploading JPG or PNG files.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
