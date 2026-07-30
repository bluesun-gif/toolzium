let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', () => convertPdfToWord());
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
        if (optionsContainer) optionsContainer.style.display = 'block';
    } else {
        actionBtn.style.display = 'none';
        if (optionsContainer) optionsContainer.style.display = 'none';
    }
}

async function convertPdfToWord() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(10, 'Extracting text from PDF...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        let wordContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>Converted Document</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            p { margin-bottom: 12px; }
            h1 { color: #1e3a8a; }
          </style>
        </head>
        <body>
        `;
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(10 + (80 * (i / totalPages)), `Reading page ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            let lastY = null;
            let pageText = '';
            
            for (const item of textContent.items) {
                if (lastY !== null && Math.abs(item.transform[5] - lastY) > 8) {
                    pageText += '\n';
                }
                pageText += item.str + ' ';
                lastY = item.transform[5];
            }
            
            const paragraphs = pageText.split('\n').filter(p => p.trim());
            for (const p of paragraphs) {
                wordContent += `<p>${escapeHtml(p)}</p>`;
            }
            
            if (i < totalPages) {
                wordContent += '<br style="page-break-before:always; clear:both; mso-break-type:section-break" />';
            }
        }
        
        wordContent += '</body></html>';
        updateProgress(95, 'Compiling document...');
        
        const blob = new Blob([wordContent], { type: 'application/msword' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.doc';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
    } catch (error) {
        console.error('PDF to Word conversion error:', error);
        alert('Could not convert PDF to Word. Make sure it is not password-protected.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
