let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const actionBtn = document.getElementById('actionBtn');
    
    setupDragAndDrop(dropZone, fileInput, handleFiles);
    actionBtn.addEventListener('click', () => convertWordToPdf());
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
    if (typeof updateProgress === 'function') {
        updateProgress(15, 'Reading document content...');
    }
    
    try {
        let blocks = [];
        const ext = currentFile.name.substring(currentFile.name.lastIndexOf('.')).toLowerCase();
        
        if (ext === '.txt' || currentFile.type === 'text/plain') {
            const text = await currentFile.text();
            blocks = text.split('\n').map(line => ({
                type: 'paragraph',
                textParts: [{ text: line.replace(/[\r\t]/g, ' ').trim(), isBold: false }]
            }));
        } else {
            const buffer = await currentFile.arrayBuffer();
            const result = await mammoth.convertToHtml({arrayBuffer: buffer});
            const html = result.value;
            
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const elements = doc.body.children;
            
            for (const el of elements) {
                const tagName = el.tagName.toLowerCase();
                let type = 'paragraph';
                let level = 1;
                
                if (tagName.startsWith('h') && tagName.length === 2) {
                    type = 'heading';
                    level = parseInt(tagName[1], 10) || 1;
                }
                
                const textParts = [];
                const walk = (node, isBold) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (node.textContent) {
                            textParts.push({ text: node.textContent, isBold });
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const isNodeBold = isBold || node.tagName.toLowerCase() === 'strong' || node.tagName.toLowerCase() === 'b';
                        for (const child of node.childNodes) {
                            walk(child, isNodeBold);
                        }
                    }
                };
                walk(el, false);
                
                blocks.push({ type, level, textParts });
            }
        }
        
        if (typeof updateProgress === 'function') {
            updateProgress(50, 'Generating PDF pages...');
        }
        
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        let page = pdfDoc.addPage([612, 792]);
        let y = 740;
        const marginX = 56;
        const maxWidth = 612 - marginX * 2;
        
        for (const block of blocks) {
            let fontSize = 11;
            let lineHeight = 16;
            let spacingBefore = 10;
            let spacingAfter = 10;
            
            if (block.type === 'heading') {
                fontSize = 11 + (6 - block.level) * 2;
                lineHeight = fontSize * 1.3;
                spacingBefore = fontSize;
                spacingAfter = fontSize * 0.5;
            }
            
            const isEmpty = block.textParts.every(p => p.text.trim().length === 0);
            if (isEmpty) {
                y -= spacingAfter;
                continue;
            }
            
            y -= spacingBefore;
            if (y < 60) {
                page = pdfDoc.addPage([612, 792]);
                y = 740;
            }
            
            let currentX = marginX;
            
            for (const part of block.textParts) {
                const words = part.text.split(/(\s+)/);
                const font = part.isBold || block.type === 'heading' ? fontBold : fontReg;
                
                for (const word of words) {
                    if (word === '') continue;
                    
                    const wordWidth = font.widthOfTextAtSize(word, fontSize);
                    
                    if (currentX + wordWidth > marginX + maxWidth && word.trim().length > 0) {
                        y -= lineHeight;
                        currentX = marginX;
                        if (y < 60) {
                            page = pdfDoc.addPage([612, 792]);
                            y = 740;
                        }
                        if (word.trim().length === 0) continue; 
                    }
                    
                    if (word.trim().length > 0 || currentX > marginX) {
                        page.drawText(word, { x: currentX, y: y, size: fontSize, font: font, color: rgb(0.1, 0.1, 0.1) });
                        currentX += wordWidth;
                    }
                }
            }
            y -= spacingAfter;
        }
        
        if (typeof updateProgress === 'function') {
            updateProgress(90, 'Saving PDF...');
        }
        
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.pdf';
        
        downloadFile(blob, outName);
        if (typeof updateProgress === 'function') {
            updateProgress(100, 'Done!');
        }
        
    } catch (error) {
        console.error('Word to PDF conversion error:', error);
        alert('Could not convert Word to PDF. Make sure it contains text.');
    } finally {
        actionBtn.disabled = false;
        if (typeof hideProgress === 'function') {
            setTimeout(hideProgress, 3000);
        }
    }
}
