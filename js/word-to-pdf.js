let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', convertWordToPdf);
});

function handleFiles(files) {
    const validTypes = ['.docx', '.doc', '.txt'];
    const wordFiles = files.filter(f => {
        const ext = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
        return validTypes.includes(ext) || f.type.includes('word') || f.type === 'text/plain';
    });
    if (wordFiles.length > 0) {
        currentFile = wordFiles[0];
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

async function convertWordToPdf() {
    if (!currentFile) return;
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.disabled = true;
    updateProgress(15, 'Reading document content...');
    
    try {
        let text = '';
        const ext = currentFile.name.substring(currentFile.name.lastIndexOf('.')).toLowerCase();
        
        if (ext === '.txt' || currentFile.type === 'text/plain') {
            text = await currentFile.text();
        } else {
            // For docx, extract XML text fields
            const buffer = await currentFile.arrayBuffer();
            text = await extractDocxText(buffer);
        }
        
        updateProgress(50, 'Generating PDF pages...');
        
        // Use PDFLib to compile the document
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        
        // Layout text lines into pages
        const lines = text.split('\n');
        let page = pdfDoc.addPage([612, 792]); // Letter size
        let y = 740;
        
        for (const line of lines) {
            const cleanLine = line.replace(/[\r\n\t]/g, ' ').trim();
            if (!cleanLine) {
                y -= 14;
                continue;
            }
            
            // Text wrapping
            const words = cleanLine.split(' ');
            let currentLine = '';
            
            for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const width = font.widthOfTextAtSize(testLine, 11);
                
                if (width > 500) {
                    if (y < 60) {
                        page = pdfDoc.addPage([612, 792]);
                        y = 740;
                    }
                    page.drawText(currentLine, { x: 56, y: y, size: 11, font: font, color: rgb(0.1, 0.1, 0.1) });
                    y -= 16;
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            
            if (currentLine) {
                if (y < 60) {
                    page = pdfDoc.addPage([612, 792]);
                    y = 740;
                }
                page.drawText(currentLine, { x: 56, y: y, size: 11, font: font, color: rgb(0.1, 0.1, 0.1) });
                y -= 18;
            }
        }
        
        updateProgress(90, 'Saving PDF...');
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.pdf';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('Word to PDF conversion error:', error);
        alert('Could not convert Word to PDF. Make sure it contains text.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}

// Simple XML parser for docx text tags
async function extractDocxText(arrayBuffer) {
    try {
        // Docx is a zip file, XML tags contain the actual text: <w:t>text</w:t>
        // We do a simple string matching of w:t elements inside the zip archive!
        const decoded = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
        const matches = decoded.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (matches) {
            return matches.map(val => val.replace(/<w:t[^>]*>/, '').replace('</w:t>', '')).join(' ');
        }
    } catch(e) {
        console.warn('Docx fast string parsing failed, falling back to basic decode.');
    }
    // Fallback: decode raw text content removing control chars
    const raw = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
    return raw.replace(/[^\x20-\x7E\n]/g, '').substring(0, 10000);
}
