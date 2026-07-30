import os

base_dir = r'C:\Users\LOQ\toolzium\text'
os.makedirs(base_dir, exist_ok=True)

header_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} — Free Online Tool | Toolzium</title>
    <meta name="description" content="{desc}">
    <link rel="stylesheet" href="/css/style.css">
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "{title}",
      "applicationCategory": "UtilitiesApplication",
      "offers": {{
        "@type": "Offer",
        "price": "0"
      }}
    }}
    </script>
</head>
<body>
    <!-- ══════ NAVBAR ══════ -->
    <header class="navbar-wrap">
      <div class="navbar">
        <a href="/" class="logo">
          <svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#FF5252"/><path d="M7 8h14v2H7zm3 4h8v2h-8zm2 4h4v2h-4z" fill="#fff"/></svg>
          Toolzium
        </a>
        <nav class="nav-links" id="navLinks">
          <a href="/index.html#pdf-tools" class="nav-item">PDF Tools</a>
          <a href="/index.html#text-tools" class="nav-item">Text Tools</a>
          <a href="/index.html#dev-tools" class="nav-item">Developer</a>
          <div class="nav-item has-mega">All Tools
            <div class="mega-dropdown" style="min-width:720px; grid-template-columns: repeat(4, 1fr);">
              <div>
                <div class="mega-col-title">PDF Page & Files</div>
                <a href="/pdf/merge.html" class="mega-link">Merge PDF</a>
                <a href="/pdf/split.html" class="mega-link">Split PDF</a>
                <a href="/pdf/compress.html" class="mega-link">Compress PDF</a>
                <a href="/pdf/rotate.html" class="mega-link">Rotate PDF</a>
              </div>
              <div>
                <div class="mega-col-title">Convert to PDF</div>
                <a href="/pdf/word-to-pdf.html" class="mega-link">Word to PDF</a>
                <a href="/pdf/excel-to-pdf.html" class="mega-link">Excel to PDF</a>
                <a href="/pdf/ppt-to-pdf.html" class="mega-link">PowerPoint to PDF</a>
                <a href="/pdf/image-to-pdf.html" class="mega-link">Image to PDF</a>
              </div>
              <div>
                <div class="mega-col-title">Convert from PDF</div>
                <a href="/pdf/pdf-to-word.html" class="mega-link">PDF to Word</a>
                <a href="/pdf/pdf-to-excel.html" class="mega-link">PDF to Excel</a>
                <a href="/pdf/pdf-to-ppt.html" class="mega-link">PDF to PPT</a>
                <a href="/pdf/pdf-to-image.html" class="mega-link">PDF to Image</a>
              </div>
              <div>
                <div class="mega-col-title">Text & More</div>
                <a href="/text/word-counter.html" class="mega-link">Word Counter</a>
                <a href="/text/case-converter.html" class="mega-link">Case Converter</a>
                <a href="/developer/json-formatter.html" class="mega-link">JSON Formatter</a>
                <a href="/security/password-generator.html" class="mega-link">Password Gen</a>
              </div>
            </div>
          </div>
        </nav>
        <div class="nav-right">
          <button class="nav-toggle" onclick="document.getElementById('navLinks').classList.toggle('open')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- ══════ BREADCRUMB ══════ -->
    <div class="breadcrumb">
      <a href="/">Home</a> <span>&gt;</span> <a href="/index.html#text-tools">Text</a> <span>&gt;</span> {title}
    </div>

    <!-- ══════ MAIN WORKSPACE ══════ -->
    <main class="tool-page">
      <div class="tool-hero" style="border-bottom:none; margin-bottom: 20px; padding: 24px 0 12px;">
        <h1>{title} <span class="badge">FREE</span></h1>
        <p>{desc}</p>
      </div>

      <div class="tool-container">
        {content}
      </div>
    </main>

    <!-- ══════ FEATURES ══════ -->
    <div class="features-row">
      <div class="feature-item">
        <div class="f-icon">🔒</div>
        <h4>100% Private</h4>
        <p>Your content is processed entirely locally inside your browser. No files or texts are sent to our servers.</p>
      </div>
      <div class="feature-item">
        <div class="f-icon">⚡</div>
        <h4>Instant Output</h4>
        <p>Get results in real-time as you type or upload. Fast browser performance.</p>
      </div>
      <div class="feature-item">
        <div class="f-icon">🆓</div>
        <h4>Always Free</h4>
        <p>No subscriptions, no hidden limits. Use all our formatting and analysis tools without constraints.</p>
      </div>
    </div>

    <!-- ══════ RELATED TOOLS ══════ -->
    <div class="related-section">
      <h3 style="text-align:center; font-size:18px;">Other Text Tools You Might Like</h3>
      <div class="grid" style="margin-top: 20px;">
        <a href="/text/word-counter.html" class="card"><div class="ic ic-blue"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" fill="#dbeafe"/><path d="M7 8h8M7 11h6" stroke="#2563eb" stroke-width="1.5"/></svg></div><h3>Word Counter</h3><p>Words & reading time</p></a>
        <a href="/text/case-converter.html" class="card"><div class="ic ic-purple"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" fill="#ede9fe"/><text x="6" y="15" font-size="10" font-weight="700" fill="#7c3aed">Aa</text></svg></div><h3>Case Converter</h3><p>UPPER, lower, Title</p></a>
        <a href="/text/fancy-text.html" class="card"><div class="ic ic-pink"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" fill="#fce7f3"/><text x="6" y="15" font-family="serif" font-size="12" font-weight="700" fill="#db2777">𝓕</text></svg></div><h3>Fancy Text</h3><p>Stylish fonts</p></a>
      </div>
    </div>

    <!-- ══════ FOOTER ══════ -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="/" class="logo"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#FF5252"/><path d="M7 8h14v2H7zm3 4h8v2h-8zm2 4h4v2h-4z" fill="#fff"/></svg>Toolzium</a>
          <p>50+ free browser-based tools. No signup, no uploads — 100% private.</p>
        </div>
        <div class="footer-col">
          <h4>Popular</h4>
          <a href="/text/word-counter.html">Word Counter</a>
          <a href="/security/password-generator.html">Password Generator</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about.html">About</a>
          <a href="/privacy.html">Privacy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Toolzium. All rights reserved.</p>
        <div class="privacy-badge">🔒 Files never leave your browser</div>
      </div>
    </footer>

    <script>
{script}
    </script>
</body>
</html>"""

tools = [
    {
        'filename': 'word-counter.html',
        'title': 'Word Counter',
        'desc': 'Count words, characters, sentences, paragraphs, and reading time instantly.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Type or paste text..."></textarea>
            <div class="stats-grid">
                <div class="stat-card"><h3>Words</h3><p id="words">0</p></div>
                <div class="stat-card"><h3>Chars</h3><p id="chars">0</p></div>
                <div class="stat-card"><h3>Chars (no space)</h3><p id="chars-no-space">0</p></div>
                <div class="stat-card"><h3>Sentences</h3><p id="sentences">0</p></div>
                <div class="stat-card"><h3>Paragraphs</h3><p id="paragraphs">0</p></div>
                <div class="stat-card"><h3>Reading Time</h3><p id="reading-time">0 min</p></div>
            </div>
        ''',
        'script': '''
            document.getElementById('input').addEventListener('input', function() {
                const text = this.value;
                document.getElementById('chars').innerText = text.length;
                document.getElementById('chars-no-space').innerText = text.replace(/\\s/g, '').length;
                document.getElementById('words').innerText = text.trim() ? text.trim().split(/\\s+/).length : 0;
                document.getElementById('sentences').innerText = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
                document.getElementById('paragraphs').innerText = text.trim() ? text.split(/\\n+/).filter(Boolean).length : 0;
                const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
                document.getElementById('reading-time').innerText = Math.ceil(words / 200) + ' min';
            });
        '''
    },
    {
        'filename': 'character-counter.html',
        'title': 'Character Counter',
        'desc': 'Character count with/without spaces, word count. Show Twitter/Instagram character limits.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Type or paste text..."></textarea>
            <div class="stats-grid">
                <div class="stat-card"><h3>Chars</h3><p id="chars">0</p></div>
                <div class="stat-card"><h3>Chars (no space)</h3><p id="chars-no-space">0</p></div>
                <div class="stat-card"><h3>Words</h3><p id="words">0</p></div>
            </div>
            <div class="badge-row" style="margin-top:20px; font-size:18px;">
                <div style="margin-right:20px;">Twitter: <span id="twitter">0</span> / 280</div>
                <div>Instagram: <span id="instagram">0</span> / 2200</div>
            </div>
        ''',
        'script': '''
            document.getElementById('input').addEventListener('input', function() {
                const text = this.value;
                const len = text.length;
                document.getElementById('chars').innerText = len;
                document.getElementById('chars-no-space').innerText = text.replace(/\\s/g, '').length;
                document.getElementById('words').innerText = text.trim() ? text.trim().split(/\\s+/).length : 0;
                document.getElementById('twitter').innerText = len;
                document.getElementById('instagram').innerText = len;
                document.getElementById('twitter').style.color = len > 280 ? '#ff4444' : 'inherit';
                document.getElementById('instagram').style.color = len > 2200 ? '#ff4444' : 'inherit';
            });
        '''
    },
    {
        'filename': 'case-converter.html',
        'title': 'Case Converter',
        'desc': 'Convert text to UPPERCASE, lowercase, Title Case, and more.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Type or paste text..."></textarea>
            <div style="margin-bottom:15px; display:flex; flex-wrap:wrap; gap:10px;">
                <button class="btn-primary" onclick="convert('upper')">UPPERCASE</button>
                <button class="btn-primary" onclick="convert('lower')">lowercase</button>
                <button class="btn-primary" onclick="convert('title')">Title Case</button>
                <button class="btn-primary" onclick="convert('sentence')">Sentence case</button>
                <button class="btn-primary" onclick="convert('alternate')">aLtErNaTe</button>
                <button class="btn-primary" onclick="convert('camel')">camelCase</button>
                <button class="btn-primary" onclick="convert('snake')">snake_case</button>
            </div>
            <textarea id="output" class="output-area" readonly placeholder="Result..."></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            function convert(type) {
                let text = document.getElementById('input').value;
                if(type === 'upper') text = text.toUpperCase();
                else if(type === 'lower') text = text.toLowerCase();
                else if(type === 'title') text = text.replace(/\\w\\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
                else if(type === 'sentence') text = text.replace(/(^|\\. *)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
                else if(type === 'alternate') text = text.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join('');
                else if(type === 'camel') text = text.replace(/(?:^\\w|[A-Z]|\\b\\w|\\s+)/g, (m, i) => i === 0 ? m.toLowerCase() : m.toUpperCase()).replace(/\\s+/g, '');
                else if(type === 'snake') text = text.replace(/\\W+/g, ' ').trim().replace(/\\s+/g, '_').toLowerCase();
                document.getElementById('output').value = text;
            }
        '''
    },
    {
        'filename': 'lorem-ipsum.html',
        'title': 'Lorem Ipsum Generator',
        'desc': 'Generate paragraphs, words, or sentences of Lorem Ipsum placeholder text.',
        'content': '''
            <div style="display:flex; gap:10px; margin-bottom:15px; align-items:center;">
                <input type="number" id="count" class="tool-input" value="3" min="1" style="width:80px; min-height:auto; margin:0;">
                <select id="type" class="tool-input" style="width:150px; min-height:auto; margin:0;">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                </select>
                <button class="btn-primary" onclick="generate()" style="margin:0;">Generate</button>
            </div>
            <textarea id="output" class="output-area" readonly></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"];
            function getSentence() { return new Array(8 + Math.floor(Math.random() * 10)).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ') + '.'; }
            function generate() {
                const c = parseInt(document.getElementById('count').value);
                const t = document.getElementById('type').value;
                let res = '';
                if(t === 'paragraphs') {
                    res = new Array(c).fill(0).map(() => new Array(5).fill(0).map(getSentence).join(' ')).join('\\n\\n');
                } else if(t === 'sentences') {
                    res = new Array(c).fill(0).map(getSentence).join(' ');
                } else {
                    res = new Array(c).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
                }
                document.getElementById('output').value = res.charAt(0).toUpperCase() + res.slice(1);
            }
            generate();
        '''
    },
    {
        'filename': 'duplicate-remover.html',
        'title': 'Duplicate Line Remover',
        'desc': 'Remove duplicate lines from text automatically.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Paste text with duplicate lines..."></textarea>
            <div style="margin-bottom:15px; display:flex; gap:20px; align-items:center;">
                <button class="btn-primary" onclick="removeDups()" style="margin:0;">Remove Duplicates</button>
                <span style="font-size:18px;">Removed: <b id="removed-count">0</b></span>
            </div>
            <textarea id="output" class="output-area" readonly placeholder="Result..."></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            function removeDups() {
                const text = document.getElementById('input').value;
                if(!text) return;
                const lines = text.split('\\n');
                const unique = [...new Set(lines)];
                document.getElementById('output').value = unique.join('\\n');
                document.getElementById('removed-count').innerText = lines.length - unique.length;
            }
        '''
    },
    {
        'filename': 'text-diff.html',
        'title': 'Text Diff Checker',
        'desc': 'Compare two texts side by side to see the differences.',
        'content': '''
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:15px;">
                <div>
                    <h3>Original Text</h3>
                    <textarea id="input1" class="tool-input"></textarea>
                </div>
                <div>
                    <h3>Modified Text</h3>
                    <textarea id="input2" class="tool-input"></textarea>
                </div>
            </div>
            <button class="btn-primary" onclick="compare()">Compare Texts</button>
            <div id="output" class="output-area" style="background:var(--bg); border:1.5px solid var(--border); border-radius:12px; color:var(--text); min-height:160px; overflow-y:auto; padding:18px; line-height:1.6; font-family:monospace; font-size:13.5px; margin-top:15px;"></div>
        ''',
        'script': '''
            function compare() {
                const t1 = document.getElementById('input1').value.split('\\n');
                const t2 = document.getElementById('input2').value.split('\\n');
                let html = '';
                const max = Math.max(t1.length, t2.length);
                for(let i=0; i<max; i++) {
                    if(t1[i] !== t2[i]) {
                        if(t1[i] !== undefined) html += `<div style="background:rgba(239,68,68,0.12); color:#dc2626; padding:4px 8px; margin-bottom:4px; border-radius:4px; text-decoration:line-through;">- ${t1[i] || ''}</div>`;
                        if(t2[i] !== undefined) html += `<div style="background:rgba(34,197,94,0.12); color:#16a34a; padding:4px 8px; margin-bottom:4px; border-radius:4px;">+ ${t2[i] || ''}</div>`;
                    } else {
                        html += `<div style="color:var(--text-2); padding:4px 8px; margin-bottom:4px;">  ${t1[i] || ''}</div>`;
                    }
                }
                document.getElementById('output').innerHTML = html || 'No differences found.';
            }
        '''
    },
    {
        'filename': 'fancy-text.html',
        'title': 'Fancy Text Generator',
        'desc': 'Convert normal text into fancy Unicode fonts.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Type text to convert..." style="min-height:100px;"></textarea>
            <div id="output-list" style="display:flex; flex-direction:column; gap:10px;"></div>
        ''',
        'script': '''
            const fonts = [
                {n: 'Math Bold', base: 0x1D400},
                {n: 'Math Italic', base: 0x1D434},
                {n: 'Script', base: 0x1D49C},
                {n: 'Double Struck', base: 0x1D538},
                {n: 'Fraktur', base: 0x1D504},
                {n: 'Sans-Serif', base: 0x1D5A0},
                {n: 'Monospace', base: 0x1D670}
            ];
            document.getElementById('input').addEventListener('input', function() {
                const text = this.value;
                let html = '';
                if(!text) { document.getElementById('output-list').innerHTML = ''; return; }
                for(let f of fonts) {
                    let res = '';
                    for(let c of text) {
                        let code = c.charCodeAt(0);
                        if(code >= 65 && code <= 90) res += String.fromCodePoint(f.base + code - 65);
                        else if(code >= 97 && code <= 122) res += String.fromCodePoint(f.base + 26 + code - 97);
                        else res += c;
                    }
                    html += `
                        <div style="background:var(--bg); border:1.5px solid var(--border); padding:16px 20px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; gap:12px; transition:0.2s;">
                            <span style="font-size:18px; font-weight:600; color:var(--text);">${res}</span>
                            <button class="copy-btn" style="margin:0;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); const b=this; b.innerText='Copied!'; setTimeout(()=>b.innerText='Copy',1200)">Copy</button>
                        </div>
                    `;
                }
                document.getElementById('output-list').innerHTML = html;
            });
        '''
    },
    {
        'filename': 'find-replace.html',
        'title': 'Find and Replace',
        'desc': 'Find and replace text online.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Text to process..."></textarea>
            <div style="display:flex; gap:15px; margin-bottom:15px; align-items:center;">
                <input type="text" id="find" class="tool-input" placeholder="Find..." style="min-height:auto; margin:0; flex:1;">
                <input type="text" id="replace" class="tool-input" placeholder="Replace with..." style="min-height:auto; margin:0; flex:1;">
            </div>
            <div style="margin-bottom:15px; display:flex; gap:20px;">
                <label><input type="checkbox" id="case"> Case sensitive</label>
                <label><input type="checkbox" id="regex"> Regex</label>
                <label><input type="checkbox" id="whole"> Whole word</label>
            </div>
            <div style="display:flex; gap:20px; align-items:center; margin-bottom:15px;">
                <button class="btn-primary" onclick="doReplace()" style="margin:0;">Replace All</button>
                <span style="font-size:18px;">Matches replaced: <b id="count">0</b></span>
            </div>
            <textarea id="output" class="output-area" readonly placeholder="Result..."></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            function doReplace() {
                const txt = document.getElementById('input').value;
                let f = document.getElementById('find').value;
                const r = document.getElementById('replace').value;
                const cs = document.getElementById('case').checked;
                const isRe = document.getElementById('regex').checked;
                const whole = document.getElementById('whole').checked;
                
                if(!f) return;
                
                let flags = 'g' + (cs ? '' : 'i');
                let re;
                if(!isRe) {
                    f = f.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&');
                }
                if(whole) {
                    f = '\\\\b' + f + '\\\\b';
                }
                try {
                    re = new RegExp(f, flags);
                } catch(e) {
                    alert('Invalid regular expression');
                    return;
                }
                
                const matches = txt.match(re);
                document.getElementById('count').innerText = matches ? matches.length : 0;
                document.getElementById('output').value = txt.replace(re, r);
            }
        '''
    },
    {
        'filename': 'text-reverser.html',
        'title': 'Text Reverser',
        'desc': 'Reverse text, words, or letters online.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Enter text to reverse..."></textarea>
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <button class="btn-primary" onclick="rev('full')">Reverse Entire Text</button>
                <button class="btn-primary" onclick="rev('words')">Reverse Words Order</button>
                <button class="btn-primary" onclick="rev('each')">Reverse Each Word</button>
            </div>
            <textarea id="output" class="output-area" readonly placeholder="Result..."></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            function rev(mode) {
                const t = document.getElementById('input').value;
                let r = '';
                if(mode === 'full') r = t.split('').reverse().join('');
                else if(mode === 'words') r = t.split(' ').reverse().join(' ');
                else if(mode === 'each') r = t.split(' ').map(w => w.split('').reverse().join('')).join(' ');
                document.getElementById('output').value = r;
            }
        '''
    },
    {
        'filename': 'slug-generator.html',
        'title': 'URL Slug Generator',
        'desc': 'Convert any string to a URL-friendly slug.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Enter text to convert to slug..."></textarea>
            <div style="margin-bottom:15px; display:flex; gap:20px; align-items:center;">
                <label>Separator: 
                    <select id="sep" class="tool-input" style="min-height:auto; width:auto; display:inline-block; margin:0 0 0 10px; padding:5px;">
                        <option value="-">Dash (-)</option>
                        <option value="_">Underscore (_)</option>
                    </select>
                </label>
                <label><input type="checkbox" id="lowercase" checked> Lowercase</label>
            </div>
            <button class="btn-primary" onclick="gen()">Generate Slug</button>
            <textarea id="output" class="output-area" readonly placeholder="your-slug-here"></textarea>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').value)">Copy Result</button>
        ''',
        'script': '''
            function gen() {
                let t = document.getElementById('input').value;
                const sep = document.getElementById('sep').value;
                if(document.getElementById('lowercase').checked) t = t.toLowerCase();
                document.getElementById('output').value = t.replace(/[^a-zA-Z0-9]+/g, sep).replace(new RegExp('^' + sep + '|' + sep + '$', 'g'), '');
            }
        '''
    },
    {
        'filename': 'hashtag-generator.html',
        'title': 'Hashtag Generator',
        'desc': 'Generate relevant hashtags for your topic.',
        'content': '''
            <input type="text" id="input" class="tool-input" placeholder="Enter topic/keywords (e.g., fitness, code)" style="min-height:auto;">
            <div style="margin-bottom:15px; display:flex; gap:10px;">
                <button class="btn-primary" onclick="gen('trending')">Trending</button>
                <button class="btn-primary" onclick="gen('niche')">Niche</button>
                <button class="btn-primary" onclick="gen('branded')">Branded</button>
            </div>
            <div id="output" class="output-area" style="white-space: pre-wrap; background:#222;"></div>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('output').innerText)">Copy Hashtags</button>
        ''',
        'script': '''
            function gen(type) {
                const t = document.getElementById('input').value.trim().replace(/\\s+/g, '');
                if(!t) return;
                let out = '';
                if(type==='trending') out = `#${t} #${t}life #${t}goals #${t}tips #${t}oftheday #${t}community #love${t} #instatrend #viral #explore`;
                else if(type==='niche') out = `#${t}expert #${t}hacks #${t}pro #${t}secrets #${t}journey #${t}addict #${t}world`;
                else if(type==='branded') out = `#${t}official #${t}brand #${t}team #${t}squad #madeby${t} #the${t}way`;
                document.getElementById('output').innerText = out;
            }
        '''
    },
    {
        'filename': 'morse-code.html',
        'title': 'Morse Code Translator',
        'desc': 'Translate text to Morse code and vice versa.',
        'content': '''
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:15px;">
                <div>
                    <h3>Text</h3>
                    <textarea id="text-in" class="tool-input" placeholder="Type text..."></textarea>
                </div>
                <div>
                    <h3>Morse Code</h3>
                    <textarea id="morse-in" class="tool-input" placeholder="Type morse..."></textarea>
                </div>
            </div>
            <button class="btn-primary" onclick="play()">🔊 Play Audio Beeps</button>
        ''',
        'script': '''
            const map = { 'A':'.-', 'B':'-...', 'C':'-.-.', 'D':'-..', 'E':'.', 'F':'..-.', 'G':'--.', 'H':'....', 'I':'..', 'J':'.---', 'K':'-.-', 'L':'.-..', 'M':'--', 'N':'-.', 'O':'---', 'P':'.--.', 'Q':'--.-', 'R':'.-.', 'S':'...', 'T':'-', 'U':'..-', 'V':'...-', 'W':'.--', 'X':'-..-', 'Y':'-.--', 'Z':'--..', '1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----', ' ':'/' };
            const revMap = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
            
            document.getElementById('text-in').addEventListener('input', function() {
                document.getElementById('morse-in').value = this.value.toUpperCase().split('').map(c => map[c] || c).join(' ');
            });
            document.getElementById('morse-in').addEventListener('input', function() {
                document.getElementById('text-in').value = this.value.split(' ').map(c => revMap[c] || c).join('');
            });
            function play() {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const morse = document.getElementById('morse-in').value;
                let t = ctx.currentTime;
                for(let c of morse) {
                    if(c === '.') { beep(ctx, t, 0.1); t += 0.2; }
                    else if(c === '-') { beep(ctx, t, 0.3); t += 0.4; }
                    else if(c === ' ') { t += 0.2; }
                    else if(c === '/') { t += 0.4; }
                }
            }
            function beep(ctx, time, dur) {
                const osc = ctx.createOscillator();
                osc.type = 'sine'; osc.frequency.value = 600;
                osc.connect(ctx.destination);
                osc.start(time); osc.stop(time + dur);
            }
        '''
    },
    {
        'filename': 'text-to-binary.html',
        'title': 'Text to Binary Converter',
        'desc': 'Convert text to binary and binary to text. Also show Hex and Octal.',
        'content': '''
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:15px;">
                <div>
                    <h3>Text Input</h3>
                    <textarea id="text" class="tool-input" placeholder="Type text..."></textarea>
                </div>
                <div>
                    <h3>Binary Output</h3>
                    <textarea id="bin" class="tool-input" placeholder="Type binary to convert back..."></textarea>
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div>
                    <h3>Hexadecimal</h3>
                    <textarea id="hex" class="output-area" readonly></textarea>
                </div>
                <div>
                    <h3>Octal</h3>
                    <textarea id="oct" class="output-area" readonly></textarea>
                </div>
            </div>
        ''',
        'script': '''
            document.getElementById('text').addEventListener('input', function() {
                const t = this.value;
                let b = [], h = [], o = [];
                for(let i=0; i<t.length; i++) {
                    const c = t.charCodeAt(i);
                    b.push(c.toString(2).padStart(8, '0'));
                    h.push(c.toString(16).padStart(2, '0'));
                    o.push(c.toString(8));
                }
                document.getElementById('bin').value = b.join(' ');
                document.getElementById('hex').value = h.join(' ');
                document.getElementById('oct').value = o.join(' ');
            });
            document.getElementById('bin').addEventListener('input', function() {
                const b = this.value.trim().split(/\\s+/);
                try {
                    document.getElementById('text').value = b.map(c => String.fromCharCode(parseInt(c, 2))).join('');
                } catch(e) {}
            });
        '''
    },
    {
        'filename': 'emoji-picker.html',
        'title': 'Emoji Picker',
        'desc': 'Searchable emoji grid. Click to copy.',
        'content': '''
            <input type="text" id="search" class="tool-input" placeholder="Search emojis (e.g., smile, animal)..." style="min-height:auto;">
            <div style="margin-bottom:15px; display:flex; gap:10px;">
                <button class="btn-secondary" onclick="render('smile')">Smileys</button>
                <button class="btn-secondary" onclick="render('animal')">Animals</button>
                <button class="btn-secondary" onclick="render('food')">Food</button>
                <button class="btn-secondary" onclick="render('')">All</button>
            </div>
            <div id="grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(55px, 1fr)); gap:12px; max-height:400px; overflow-y:auto; background:var(--bg); border:1.5px solid var(--border); padding:20px; border-radius:12px; font-size:32px; text-align:center;"></div>
            <div id="msg" style="margin-top:10px; color:#16a34a; font-weight:bold;"></div>
        ''',
        'script': '''
            const emojis = [
                {c:'😀', tags:['smile','happy']}, {c:'😃', tags:['smile']}, {c:'😄', tags:['smile','laugh']}, {c:'😁', tags:['smile']}, {c:'😆', tags:['smile','laugh']}, {c:'😅', tags:['smile','sweat']}, {c:'😂', tags:['laugh','cry']}, {c:'🤣', tags:['laugh']}, {c:'🥲', tags:['smile','tear']}, {c:'☺️', tags:['smile']},
                {c:'🐶', tags:['animal','dog']}, {c:'🐱', tags:['animal','cat']}, {c:'🐭', tags:['animal','mouse']}, {c:'🐹', tags:['animal','hamster']}, {c:'🐰', tags:['animal','rabbit']}, {c:'🦊', tags:['animal','fox']}, {c:'🐻', tags:['animal','bear']}, {c:'🐼', tags:['animal','panda']},
                {c:'🍎', tags:['food','apple']}, {c:'🍐', tags:['food','pear']}, {c:'🍊', tags:['food','orange']}, {c:'🍋', tags:['food','lemon']}, {c:'🍌', tags:['food','banana']}, {c:'🍉', tags:['food','watermelon']}, {c:'🍇', tags:['food','grape']}, {c:'🍓', tags:['food','strawberry']}
            ];
            function render(filter = '') {
                const g = document.getElementById('grid');
                g.innerHTML = '';
                filter = filter.toLowerCase();
                for(let e of emojis) {
                    if(!filter || e.tags.some(t => t.includes(filter))) {
                        const d = document.createElement('div');
                        d.innerText = e.c;
                        d.style.cursor = 'pointer';
                        d.style.borderRadius = '8px';
                        d.onmouseover = () => d.style.background = 'var(--border)';
                        d.onmouseout = () => d.style.background = 'transparent';
                        d.onclick = () => {
                            navigator.clipboard.writeText(e.c);
                            document.getElementById('msg').innerText = 'Copied: ' + e.c;
                            setTimeout(()=>document.getElementById('msg').innerText='', 2000);
                        };
                        g.appendChild(d);
                    }
                }
            }
            render();
            document.getElementById('search').addEventListener('input', (e) => render(e.target.value));
        '''
    },
    {
        'filename': 'small-text.html',
        'title': 'Small Text Generator',
        'desc': 'Convert text to superscript (ˢᵐᵃˡˡ), subscript, and other small Unicode variants.',
        'content': '''
            <textarea id="input" class="tool-input" placeholder="Type text to convert..."></textarea>
            <h3>Superscript</h3>
            <div id="super" class="output-area" style="min-height:50px;"></div>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('super').innerText)">Copy Superscript</button>
            <h3 style="margin-top:20px;">Subscript</h3>
            <div id="sub" class="output-area" style="min-height:50px;"></div>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('sub').innerText)">Copy Subscript</button>
        ''',
        'script': '''
            const supMap = {'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','q':'ᵠ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ', '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
            const subMap = {'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ','p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ', '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
            document.getElementById('input').addEventListener('input', function() {
                const t = this.value.toLowerCase();
                document.getElementById('super').innerText = t.split('').map(c => supMap[c] || c).join('');
                document.getElementById('sub').innerText = t.split('').map(c => subMap[c] || c).join('');
            });
        '''
    }
]

for tool in tools:
    filepath = os.path.join(base_dir, tool['filename'])
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(header_template.format(
            title=tool['title'],
            desc=tool['desc'],
            content=tool['content'],
            script=tool['script']
        ))
    print(f'Created {filepath}')
