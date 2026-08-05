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
        
        // Extract text from all pages with paragraph grouping
        let allParagraphs = [];
        
        if (totalPages === 0) {
            throw new Error('PDF has no pages.');
        }
        
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(10 + (60 * (i / totalPages)), `Reading page ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Group text items into lines by Y coordinate
            let lines = {};
            for (const item of textContent.items) {
                if (!item.str.trim()) continue;
                const y = Math.round(item.transform[5]);
                if (!lines[y]) lines[y] = [];
                lines[y].push(item);
            }
            
            // Sort by Y descending (top to bottom)
            const sortedY = Object.keys(lines).sort((a, b) => parseFloat(b) - parseFloat(a));
            
            let lastFontSize = 0;
            for (const y of sortedY) {
                const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
                const lineText = lineItems.map(item => item.str).join(' ').trim();
                if (!lineText) continue;
                
                // Detect font size for heading detection
                const fontSize = lineItems[0] ? Math.round(lineItems[0].transform[0]) : 12;
                
                allParagraphs.push({
                    text: lineText,
                    fontSize: fontSize,
                    isHeading: fontSize > 14
                });
            }
            
            // Add page break marker
            if (i < totalPages) {
                allParagraphs.push({ text: '', pageBreak: true });
            }
        }
        
        updateProgress(75, 'Building Word document...');
        
        // Generate real .docx using JSZip (OOXML format)
        const zip = new JSZip();
        
        // [Content_Types].xml
        zip.file('[Content_Types].xml', 
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
            '<Default Extension="xml" ContentType="application/xml"/>' +
            '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
            '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
            '</Types>'
        );
        
        // _rels/.rels
        zip.file('_rels/.rels',
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
            '</Relationships>'
        );
        
        // word/_rels/document.xml.rels
        zip.file('word/_rels/document.xml.rels',
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
            '</Relationships>'
        );
        
        // word/styles.xml - Basic styles
        zip.file('word/styles.xml',
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
            '<w:style w:type="paragraph" w:default="1" w:styleId="Normal">' +
            '<w:name w:val="Normal"/>' +
            '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr>' +
            '</w:style>' +
            '<w:style w:type="paragraph" w:styleId="Heading1">' +
            '<w:name w:val="heading 1"/>' +
            '<w:pPr><w:spacing w:before="240" w:after="120"/></w:pPr>' +
            '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="32"/><w:color w:val="1F3864"/></w:rPr>' +
            '</w:style>' +
            '<w:style w:type="paragraph" w:styleId="Heading2">' +
            '<w:name w:val="heading 2"/>' +
            '<w:pPr><w:spacing w:before="200" w:after="80"/></w:pPr>' +
            '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="28"/><w:color w:val="2E4057"/></w:rPr>' +
            '</w:style>' +
            '</w:styles>'
        );
        
        // word/document.xml - Main document content
        let bodyXml = '';
        for (const para of allParagraphs) {
            if (para.pageBreak) {
                bodyXml += '<w:p><w:pPr><w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:pPr></w:p>';
                continue;
            }
            
            const escapedText = escapeXml(para.text);
            
            if (para.isHeading && para.fontSize > 18) {
                bodyXml += '<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr>' +
                    '<w:r><w:t xml:space="preserve">' + escapedText + '</w:t></w:r></w:p>';
            } else if (para.isHeading) {
                bodyXml += '<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr>' +
                    '<w:r><w:t xml:space="preserve">' + escapedText + '</w:t></w:r></w:p>';
            } else {
                bodyXml += '<w:p><w:r><w:t xml:space="preserve">' + escapedText + '</w:t></w:r></w:p>';
            }
        }
        
        zip.file('word/document.xml',
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
            '<w:body>' + bodyXml +
            '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>' +
            '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>' +
            '</w:sectPr></w:body></w:document>'
        );
        
        updateProgress(90, 'Compiling DOCX file...');
        
        const blob = await zip.generateAsync({ 
            type: 'blob', 
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        });
        const outName = currentFile.name.replace(/\.[^/.]+$/, "") + '.docx';
        
        downloadFile(blob, outName);
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('PDF to Word conversion error:', error);
        alert('Could not convert PDF to Word. ' + (error.message || 'Make sure it is not password-protected.'));
        updateProgress(0, 'Error');
    } finally {
        if (actionBtn) actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}

function escapeXml(text) {
    // First strip control characters that are invalid in XML (everything below 0x20 except tab, newline, carriage return)
    return text
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
