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
    updateProgress(5, 'Initializing PPTX generation...');
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        const zip = new JSZip();
        
        // 1. [Content_Types].xml
        let contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`;
        
        for (let i = 1; i <= totalPages; i++) {
            contentTypesXml += `\n  <Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`;
        }
        contentTypesXml += `\n</Types>`;
        zip.file('[Content_Types].xml', contentTypesXml);
        
        // 2. _rels/.rels
        zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`);

        // 3. ppt/presentation.xml
        let presentationXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst>`;
        for (let i = 1; i <= totalPages; i++) {
            presentationXml += `\n    <p:sldId id="${255 + i}" r:id="rId${i}"/>`;
        }
        presentationXml += `\n  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
</p:presentation>`;
        zip.file('ppt/presentation.xml', presentationXml);

        // 4. ppt/_rels/presentation.xml.rels
        let presentationRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`;
        for (let i = 1; i <= totalPages; i++) {
            presentationRelsXml += `\n  <Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`;
        }
        presentationRelsXml += `\n</Relationships>`;
        zip.file('ppt/_rels/presentation.xml.rels', presentationRelsXml);

        // 5. ppt/slideLayouts/slideLayout1.xml
        zip.file('ppt/slideLayouts/slideLayout1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
</p:sldLayout>`);

        // 6. ppt/slideMasters/slideMaster1.xml
        zip.file('ppt/slideMasters/slideMaster1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
</p:sldMaster>`);

        for (let i = 1; i <= totalPages; i++) {
            updateProgress(5 + (85 * (i / totalPages)), `Rendering slide ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            
            // Render at high quality
            const viewport = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.width = 1920;
            canvas.height = 1080;
            
            // Paint background white
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Scale and center PDF viewport inside 16:9 slide
            const scaleX = canvas.width / viewport.width;
            const scaleY = canvas.height / viewport.height;
            const minScale = Math.min(scaleX, scaleY);
            
            const centeredX = (canvas.width - (viewport.width * minScale)) / 2;
            const centeredY = (canvas.height - (viewport.height * minScale)) / 2;
            
            const renderViewport = page.getViewport({ scale: 2.0 * minScale });
            
            context.translate(centeredX, centeredY);
            await page.render({
                canvasContext: context,
                viewport: renderViewport
            }).promise;
            
            // Convert to base64 jpeg
            const base64Img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
            
            // 7. ppt/media/image{n}.jpeg
            zip.file(`ppt/media/image${i}.jpeg`, base64Img, {base64: true});

            // 8. ppt/slides/slide{n}.xml
            const slideXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm>
      </p:grpSpPr>
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="2" name="Slide Image"/>
          <p:cNvPicPr>
            <a:picLocks noChangeAspect="1"/>
          </p:cNvPicPr>
          <p:nvPr/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="rId1"/>
          <a:stretch>
            <a:fillRect/>
          </a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm>
            <a:off x="0" y="0"/>
            <a:ext cx="12192000" cy="6858000"/>
          </a:xfrm>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
        </p:spPr>
      </p:pic>
    </p:spTree>
  </p:cSld>
</p:sld>`;
            zip.file(`ppt/slides/slide${i}.xml`, slideXml);

            // 9. ppt/slides/_rels/slide{n}.xml.rels
            const slideRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image${i}.jpeg"/>
</Relationships>`;
            zip.file(`ppt/slides/_rels/slide${i}.xml.rels`, slideRelsXml);
        }
        
        updateProgress(95, 'Generating PPTX file...');
        
        const content = await zip.generateAsync({ type: 'blob' });
        
        const fileName = currentFile.name.replace('.pdf', '.pptx');
        downloadFile(content, fileName);
        
        updateProgress(100, 'Done!');
        
    } catch (error) {
        console.error('PDF to PPT conversion error:', error);
        alert('Could not convert PDF to PPT slides.');
    } finally {
        actionBtn.disabled = false;
        setTimeout(hideProgress, 3000);
    }
}
