import {
  Activity,
  Braces,
  Calculator,
  ClipboardList,
  Clock,
  Globe,
  Heart,
  ImageIcon,
  LayoutDashboard,
  LinkIcon,
  Map as MapIcon,
  Settings2,
  Shield,
  Type,
  Wallet,
  Wrench,
} from "lucide-react";

export const ToolsData = [
  {
    title: "Tools",
    url: "/tools",
    icon: Settings2,
    isActive: true,
    items: [
      {
        title: "All Tools",
        url: "/tools",
        description: "Browse and search all available tools",
        popular: true,
      },
    ],
  },
  {
    title: "URL",
    url: "/tools/url",
    icon: LinkIcon,
    isActive: true,
    items: [
      {
        title: "URL Shortener",
        url: "/tools/url/shortener",
        description:
          "Create short, custom URLs with analytics. Free link shortener with QR codes, click tracking, and custom slugs. Perfect for social media, marketing campaigns, and link management.",
        popular: true,
      },
      {
        title: "UTM Builder",
        url: "/tools/url/utm-builder",
        description:
          "Build campaign tracking URLs with UTM parameters for Google Analytics. Generate utm_source, utm_medium, utm_campaign, utm_term, and utm_content tags to track your marketing performance.",
        popular: false,
      },
      {
        title: "Link Expander",
        url: "/tools/url/expand",
        description:
          "Unshorten URLs and reveal the destination of shortened links safely. Check where bit.ly, tinyurl, and other short links lead before clicking. Preview redirects and inspect link safety.",
        popular: false,
      },
      {
        title: "QR Code Generator",
        url: "/tools/url/qr",
        description:
          "Create custom QR codes from URLs, text, contact info, WiFi credentials, and more. Download as PNG, SVG, or PDF. Customize colors, add logos, and generate high-resolution QR codes for free.",
        popular: true,
      },
      {
        title: "YouTube Thumbnail Downloader",
        url: "/tools/url/youtube-thumbnail",
        description:
          "Download high-resolution YouTube video thumbnails for free online. Support max resolution, standard, and medium qualities. Just paste the YouTube video link and download.",
        popular: true,
      },
    ],
  },
  {
    title: "Text",
    url: "/tools/text",
    icon: Type,
    isActive: true,
    items: [
      {
        title: "Base64 Encoder/Decoder",
        url: "/tools/text/base64",
        description:
          "Encode and decode Base64 strings and files online. Convert text, images, or any file to Base64 encoding. Free Base64 converter with support for UTF-8, ASCII, and binary data.",
        popular: false,
      },
      {
        title: "Case Converter",
        url: "/tools/text/case-converter",
        description:
          "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and more. Transform text formatting instantly for programming, writing, and data processing.",
        popular: false,
      },
      {
        title: "Slugify Text",
        url: "/tools/text/slugify",
        description:
          "Convert text into SEO-friendly URL slugs. Generate clean, lowercase, hyphenated slugs from any text. Perfect for creating blog URLs, file names, and web-safe identifiers.",
        popular: false,
      },
      {
        title: "Word Counter",
        url: "/tools/text/word-counter",
        description:
          "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with character count, keyword density, and readability analysis. Perfect for writers, students, and SEO.",
        popular: true,
      },
      {
        title: "Line Tools",
        url: "/tools/text/line-tools",
        description:
          "Sort, deduplicate, trim, and manipulate text lines. Remove duplicate lines, sort alphabetically, add line numbers, find and replace across multiple lines. Bulk text processing made easy.",
        popular: false,
      },
      {
        title: "Text Cleaner",
        url: "/tools/text/cleaner",
        description:
          "Remove extra spaces, line breaks, HTML tags, emojis, and special characters from text. Clean and format text for databases, CSV files, and data processing. Bulk text cleanup tool.",
        popular: false,
      },
      {
        title: "Text to List",
        url: "/tools/text/to-list",
        description:
          "Convert comma-separated or newline-separated text into formatted lists. Split text by delimiters, clean entries, and export as array, JSON, or CSV. Text to list converter.",
        popular: false,
      },
      {
        title: "Password Strength Checker",
        url: "/tools/text/password-strength",
        description:
          "Check password strength and security score. Analyze password entropy, detect weak passwords, and get suggestions for creating strong, secure passwords. Free password strength tester.",
        popular: false,
      },
      {
        title: "Fancy Text Generator",
        url: "/tools/text/fancy-text",
        description:
          "Generate fancy Unicode text styles — bold, italic, script, fraktur, double-struck, circled, squared, upside-down, strikethrough, underline, and more. Copy stylish text for social media bios, usernames, and posts.",
        popular: true,
      },
      {
        title: "Text to Speech Reader",
        url: "/tools/text/text-to-speech",
        description:
          "Convert text to clear, natural-sounding audio speech online. Select from multiple languages, voices, adjustments for speed and pitch. Completely free and secure.",
        popular: true,
      },
      {
        title: "Speech to Text Transcriber",
        url: "/tools/text/speech-to-text",
        description:
          "Convert speech and spoken voice to text in real-time. Free online voice transcriber with language selections, live editor, and text copy/download actions.",
        popular: true,
      },
      {
        title: "Character Counter",
        url: "/tools/text/character-counter",
        description:
          "Count characters, words, sentences, and paragraphs in real-time. Check social media character limits for Twitter/X, Instagram, LinkedIn, TikTok. Free character counter with keyword density analysis.",
        popular: true,
      },
      {
        title: "Translate Text",
        url: "/tools/text/translate",
        description:
          "Translate text between 100+ languages online for free. Auto-detect source language, swap languages, and listen to translations with text-to-speech. Fast and accurate translation tool.",
        popular: true,
      },
      {
        title: "Morse Code Translator",
        url: "/tools/text/morse-code",
        description:
          "Convert text to Morse code and Morse code to text instantly. Listen to Morse code audio beeps with adjustable speed. Supports letters, numbers, and punctuation. Free online Morse code translator.",
        popular: false,
      },
      {
        title: "Binary/Hex Text Converter",
        url: "/tools/text/binary-text",
        description:
          "Convert text to binary, hexadecimal, octal, and decimal — and back. Supports ASCII and Unicode. Live conversion with configurable separators. Free binary to text converter online.",
        popular: false,
      },
      {
        title: "ROT13 / Caesar Cipher",
        url: "/tools/text/rot13",
        description:
          "Encode and decode ROT13 text instantly. Apply any Caesar cipher shift from 1 to 25. Brute-force mode shows all possible shifts. Free online ROT13 encoder and decoder.",
        popular: false,
      },
      {
        title: "Reading Time Calculator",
        url: "/tools/text/reading-time",
        description:
          "Estimate reading and speaking time for any text. Shows word count, sentence count, paragraph count, and Flesch-Kincaid readability score. Adjustable WPM for slow, average, and fast readers.",
        popular: true,
      },
      {
        title: "Emoji Picker & Search",
        url: "/tools/text/emoji-picker",
        description:
          "Searchable emoji picker with categories: Smileys, People, Animals, Food, Travel, Activities, Objects, Symbols, Flags. Click to copy. Recently used section. Grid layout.",
        popular: true,
      },
      {
        title: "Markdown Table Generator",
        url: "/tools/text/markdown-table",
        description:
          "Create markdown tables visually. Set rows and columns up to 10x10. Edit cells inline. Column alignment options. Live markdown preview. Import from CSV. Copy output.",
        popular: false,
      },
      {
        title: "Text Diff Viewer",
        url: "/tools/text/text-diff",
        description:
          "Compare two texts side-by-side with highlighted additions, deletions, and unchanged lines. Line numbers, stats, swap, and unified diff mode. Copy diff output.",
        popular: true,
      },
      {
        title: "Text Statistics",
        url: "/tools/text/text-stats",
        description:
          "Advanced text analysis: word/sentence/paragraph count, avg word length, reading level (Flesch-Kincaid), lexical density, most frequent words, and more. Real-time.",
        popular: false,
      },
      {
        title: "Resume Builder",
        url: "/tools/text/resume-builder",
        description:
          "Build a resume in markdown format. Sections for contact, summary, experience, education, skills. Live preview. Copy markdown or download as .md file.",
        popular: true,
      },
    ],
  },
  // {
  //   title: "PDF",
  //   url: "/tools/pdf",
  //   icon: FileText,
  //   isActive: true,
  //   items: [
  //     {
  //       title: "PDF Merge",
  //       url: "/tools/pdf/merge",
  //       description: "Combine multiple PDF files into one",
  //       popular: true,
  //     },
  //     {
  //       title: "PDF Split",
  //       url: "/tools/pdf/split",
  //       description: "Split PDFs into individual pages",
  //       popular: false,
  //     },
  //     {
  //       title: "PDF Compress",
  //       url: "/tools/pdf/compress",
  //       description: "Reduce PDF file size while keeping quality",
  //       popular: true,
  //     },
  //     {
  //       title: "PDF to Word",
  //       url: "/tools/pdf/pdf-to-word",
  //       description: "Convert PDF documents into editable Word",
  //       popular: false,
  //     },
  //     {
  //       title: "Image To PDF",
  //       url: "/tools/pdf/image-pdf",
  //       description: "Images to PDF and PDF pages to images",
  //       popular: false,
  //     },
  //     {
  //       title: "Protect / Unlock",
  //       url: "/tools/pdf/protect",
  //       description: "Add/remove password & permissions",
  //       popular: false,
  //     },
  //     {
  //       title: "Sign & Fill",
  //       url: "/tools/pdf/sign-fill",
  //       description: "Fill forms and add signatures",
  //       popular: false,
  //     },
  //     {
  //       title: "PDF Rotate",
  //       url: "/tools/pdf/rotate",
  //       description: "Rotate selected pages & save",
  //       popular: false,
  //     },
  //   ],
  // },
  {
    title: "Image",
    url: "/tools/image",
    icon: ImageIcon,
    isActive: true,
    items: [
      {
        title: "Image Convert",
        url: "/tools/image/convert",
        description: "Convert between JPG, PNG, WebP, AVIF",
        popular: true,
      },
      {
        title: "Image Resize",
        url: "/tools/image/resize",
        description: "Resize, crop, or scale images easily",
        popular: false,
      },
      {
        title: "Image Compressor",
        url: "/tools/image/compress",
        description:
          "Compress and reduce image file size online for free. Adjust quality, supports JPEG, PNG, WebP formats. Batch compression with before/after size comparison. 100% client-side, images never leave your browser.",
        popular: true,
      },
      {
        title: "Background Remover",
        url: "/tools/image/bg-remove",
        description:
          "Remove background from images instantly using AI. Get transparent PNG backgrounds for free online. Client-side processing with before/after comparison. No signup, no upload to servers.",
        popular: true,
      },
      {
        title: "Image to PDF",
        url: "/tools/image/image-to-pdf",
        description:
          "Convert images to PDF online for free. Support JPG, PNG, WebP to PDF conversion. Multiple image upload, drag-and-drop reordering, page size selection, and margin control. Client-side PDF generation.",
        popular: true,
      },
      {
        title: "EXIF Metadata Viewer",
        url: "/tools/image/exif-viewer",
        description:
          "View and extract EXIF metadata from photos — camera make, model, GPS coordinates, date taken, aperture, shutter speed, ISO, and more. 100% client-side, your images never leave your browser.",
        popular: true,
      },
      {
        title: "Meme Generator",
        url: "/tools/image/meme-generator",
        description:
          "Create custom memes online for free. Upload your own image or choose a template, customize text position, font size, and color. Download instant memes to share.",
        popular: true,
      },
      {
        title: "Aspect Ratio Calculator",
        url: "/tools/image/aspect-ratio",
        description:
          "Calculate and convert image aspect ratios. Enter width and height to find the ratio, or a ratio and one dimension to get the other. Social media presets for Instagram, YouTube, Twitter, and more.",
        popular: false,
      },
      {
        title: "Image Color Extractor",
        url: "/tools/image/color-extractor",
        description:
          "Upload an image and extract its dominant colors. Shows top 5-8 prominent colors with hex, RGB, and HSL values. Click to copy. Generate CSS color palettes from any image.",
        popular: true,
      },
      {
        title: "Favicon Generator",
        url: "/tools/image/favicon",
        description:
          "Generate favicons from text, emoji, or uploaded images. Pick colors and font size. Preview at multiple sizes (16, 32, 48, 180, 192, 512px). Download individual sizes as PNG.",
        popular: true,
      },
      {
        title: "SVG to PNG Converter",
        url: "/tools/image/svg-to-png",
        description:
          "Convert SVG files to PNG images. Upload or paste SVG code. Set dimensions, scale (1x-4x), transparent or custom background. Preview and download as PNG.",
        popular: false,
      },
      {
        title: "Pixel Art Creator",
        url: "/tools/image/pixel-art",
        description:
          "Simple pixel art drawing tool. Grid sizes 8x8 to 32x32. Color picker, pencil, eraser, fill tools. Undo/redo. Download as PNG. Preset color palettes.",
        popular: true,
      },
      {
        title: "Color Blind Palette",
        url: "/tools/image/color-blind-palette",
        description:
          "Generate color-blind friendly palettes. Simulate Protanopia, Deuteranopia, Tritanopia. WCAG contrast ratios. Safe color combinations. Copy hex values.",
        popular: false,
      },
    ],
  },
  {
    title: "Developer",
    url: "/tools/dev",
    icon: Braces,
    isActive: true,
    items: [
      {
        title: "JSON Formatter",
        url: "/tools/dev/json-formatter",
        description:
          "Format, validate, and beautify JSON data online. JSON pretty printer with syntax highlighting, error detection, minify/compress options. Free JSON formatter and validator for developers.",
        popular: true,
      },
      {
        title: "JWT Decoder",
        url: "/tools/dev/jwt-decode",
        description:
          "Decode and inspect JWT (JSON Web Tokens) safely in your browser. View header, payload, and signature of JWT tokens. Validate token structure and debug authentication issues without sending data to servers.",
        popular: false,
      },
      {
        title: "Regex Tester",
        url: "/tools/dev/regex-tester",
        description:
          "Test and debug regular expressions online with real-time matching. RegEx tester with syntax highlighting, match groups, and test cases. Support for JavaScript, Python, PHP regex patterns.",
        popular: false,
      },
      {
        title: "Hash Generator",
        url: "/tools/dev/hash-generator",
        description:
          "Generate MD5, SHA1, SHA256, SHA512, and other cryptographic hashes online. Hash text, files, and passwords with multiple algorithms. Free hash calculator and checksum generator.",
        popular: true,
      },
      {
        title: "Lorem Ipsum Generator",
        url: "/tools/dev/lorem-ipsum",
        description:
          "Generate Lorem Ipsum placeholder text for design mockups and testing. Create paragraphs, sentences, or words of dummy text. Lorem Ipsum generator with word count control.",
        popular: false,
      },
      {
        title: "Password Generator",
        url: "/tools/dev/password-generator",
        description:
          "Generate strong, random passwords with custom length and character sets. Secure password generator with uppercase, lowercase, numbers, and special characters. Create cryptographically secure passwords.",
        popular: true,
      },
      {
        title: "UUID / NanoID Generator",
        url: "/tools/dev/uuid-nanoid",
        description:
          "Generate unique UUIDs (v4), NanoIDs, and short IDs online. Create universally unique identifiers for databases, APIs, and distributed systems. Bulk UUID generator with copy-to-clipboard.",
        popular: true,
      },
      {
        title: "Timestamp Converter",
        url: "/tools/dev/timestamp-converter",
        description:
          "Convert UNIX timestamps to human-readable dates and vice versa. Timestamp converter supporting milliseconds, seconds, and ISO 8601 formats. Time zone aware date converter.",
        popular: false,
      },
      {
        title: "Color Converter",
        url: "/tools/dev/color-converter",
        description:
          "Convert between HEX, RGB, HSL, and CMYK color formats. Color picker and converter with live preview. Extract colors from images and generate color palettes for web design.",
        popular: false,
      },
      {
        title: "Diff Checker",
        url: "/tools/dev/diff-checker",
        description:
          "Compare two text files and find differences line-by-line. Text diff tool with syntax highlighting for code comparison. Find changes, additions, and deletions between versions.",
        popular: true,
      },
      {
        title: "Markdown Previewer",
        url: "/tools/dev/markdown-previewer",
        description:
          "Preview Markdown syntax and convert to HTML in real-time. Markdown editor with GitHub-flavored markdown support, syntax highlighting, and export options. Live markdown renderer.",
        popular: false,
      },
      {
        title: "Regex Library",
        url: "/tools/dev/regex-library",
        description:
          "Collection of useful regular expression patterns for email, URL, phone, credit card validation, and more. Ready-to-use regex patterns with explanations and test cases.",
        popular: false,
      },
      {
        title: "API Request Tester",
        url: "/tools/dev/api-tester",
        description:
          "Test REST API endpoints without Postman. Send GET, POST, PUT, DELETE requests with custom headers, body, and authentication. Free online API testing tool for developers.",
        popular: true,
      },
      {
        title: "YAML to JSON Converter",
        url: "/tools/dev/yaml-json",
        description:
          "Convert YAML to JSON and JSON to YAML online. YAML parser and converter with syntax validation and formatting. Perfect for configuration files and data transformation.",
        popular: false,
      },
      {
        title: "CSV to JSON Converter",
        url: "/tools/dev/csv-json",
        description:
          "Convert CSV files to JSON format with automatic header detection. Transform tabular data to JSON arrays or objects. Supports custom delimiters and bulk CSV processing.",
        popular: false,
      },
      {
        title: "Number Base Converter",
        url: "/tools/dev/base-converter",
        description:
          "Convert numbers between binary, octal, decimal, and hexadecimal bases. Base converter with support for negative numbers and fractional values. Programmer's calculator for number systems.",
        popular: false,
      },
      {
        title: "Color Palette Generator",
        url: "/tools/dev/color-palette",
        description:
          "Generate beautiful color palettes and schemes online for free. Create complementary, analogous, triadic, and monochromatic palettes. Extract colors from images. Export as CSS variables, HEX, RGB, or HSL.",
        popular: true,
      },
      {
        title: "Cron Expression Generator",
        url: "/tools/dev/cron-generator",
        description:
          "Build and validate cron expressions visually. Generate cron schedules with a user-friendly UI, see next run times, and get human-readable descriptions. Supports standard 5-field and extended 6-field cron.",
        popular: false,
      },
      {
        title: "HTML to Markdown Converter",
        url: "/tools/dev/html-markdown",
        description:
          "Convert HTML to Markdown and Markdown to HTML instantly. Supports headings, links, images, lists, tables, code blocks, and more. Bidirectional converter with live preview. Free online tool.",
        popular: false,
      },
      {
        title: "Color Blindness Simulator",
        url: "/tools/dev/color-blindness",
        description:
          "Simulate how colors appear to people with color blindness. Test hex colors against Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Essential accessibility tool for designers and developers.",
        popular: true,
      },
      {
        title: "JSON Schema Validator",
        url: "/tools/dev/json-schema",
        description:
          "Validate JSON data against a JSON Schema. Real-time validation with error paths. Preset schemas for users, APIs, and configs. Checks types, required fields, enums, and constraints.",
        popular: false,
      },
      {
        title: "CSS Gradient Generator",
        url: "/tools/dev/gradient-generator",
        description:
          "Create CSS gradients visually. Linear and radial modes with multiple color stops. Adjustable angle. Live preview. Preset gradients. Copy CSS and Tailwind syntax. Random gradient button.",
        popular: true,
      },
      {
        title: "CSS Box Shadow Generator",
        url: "/tools/dev/box-shadow",
        description:
          "Visual CSS box-shadow editor with sliders for offset, blur, spread, and color. Multiple shadows, inset toggle. Preset shadows: subtle, neon glow, layered. Copy CSS and Tailwind output.",
        popular: true,
      },
      {
        title: "Crontab Explainer",
        url: "/tools/dev/cron-explainer",
        description:
          "Paste a cron expression and get a human-readable explanation. Shows next 5 run times. Color-coded fields. Common presets included. Validates syntax.",
        popular: false,
      },
      {
        title: "Env Variables Editor",
        url: "/tools/dev/env-editor",
        description:
          "Visual .env file editor. Paste content or add key-value pairs. Table and raw views. Duplicate key detection. Export as .env or JSON. Syntax validation.",
        popular: false,
      },
      {
        title: "String Escape/Unescape",
        url: "/tools/dev/string-escape",
        description:
          "Escape and unescape strings for HTML, URL, JavaScript, JSON, XML, SQL, CSS, Base64. Bidirectional conversion. Copy output instantly.",
        popular: false,
      },
      {
        title: "API Status Monitor",
        url: "/tools/dev/api-status",
        description:
          "Check if popular APIs and services are reachable. Pre-loaded services: Google, GitHub, AWS, Cloudflare, Vercel, NPM. Custom URL checking. Visual status indicators.",
        popular: true,
      },
    ],
  },
  {
    title: "SEO",
    url: "/tools/seo",
    icon: Globe,
    isActive: true,
    items: [
      {
        title: "OG Image Builder",
        url: "/tools/seo/og-builder",
        description:
          "Create custom Open Graph images for social media sharing. Design OG images for Facebook, Twitter, LinkedIn previews. Free social media card generator with templates and customization.",
        popular: false,
      },
      {
        title: "Open Graph Preview",
        url: "/tools/seo/og-preview",
        description:
          "Preview how URLs appear on Facebook, Twitter, LinkedIn, and Slack. Test Open Graph and Twitter Card meta tags. Check social media link previews before sharing.",
        popular: false,
      },
      {
        title: "robots.txt Generator",
        url: "/tools/seo/robots-generator",
        description:
          "Generate robots.txt files for SEO and search engine crawling control. Create robots.txt with custom user-agent rules, disallow patterns, and sitemap references. Free robots.txt builder.",
        popular: false,
      },
      {
        title: "Meta Tags Generator",
        url: "/tools/seo/meta-generator",
        description:
          "Generate SEO meta tags for HTML head section. Create title, description, Open Graph, Twitter Cards, canonical tags with live preview. Free meta tag generator for better search rankings.",
        popular: true,
      },
      {
        title: "Sitemap.xml Generator",
        url: "/tools/seo/sitemap-generator",
        description:
          "Create XML sitemaps from URL lists for search engines. Generate sitemaps for Google, Bing, and other search engines. Add priority, change frequency, and last modified dates. Free sitemap builder.",
        popular: false,
      },
      {
        title: "Schema Markup Generator",
        url: "/tools/seo/schema-generator",
        description:
          "Generate JSON-LD structured data for rich snippets. Create schema markup for Articles, Products, Organizations, LocalBusiness, FAQ, and more. Improve SEO with structured data.",
        popular: false,
      },
    ],
  },
  {
    title: "Calculators",
    url: "/tools/calc",
    icon: Calculator,
    isActive: true,
    items: [
      {
        title: "BMI Calculator",
        url: "/tools/calc/bmi",
        description:
          "Calculate Body Mass Index (BMI) instantly from height and weight. Free BMI calculator with health category classification. Check if you're underweight, normal, overweight, or obese based on WHO standards.",
        popular: true,
      },
      {
        title: "Unit Converter",
        url: "/tools/calc/unit-converter",
        description:
          "Convert units of length, weight, temperature, volume, area, speed, time, and more. Free online unit converter with support for metric, imperial, and US customary units.",
        popular: false,
      },
      {
        title: "Date Difference Calculator",
        url: "/tools/calc/date-diff",
        description:
          "Calculate days, weeks, months, and years between two dates. Find the exact time difference between dates with business days calculation. Free date calculator for planning and scheduling.",
        popular: false,
      },
      {
        title: "Standard Calculator",
        url: "/tools/calc/standard",
        description:
          "Free online calculator for basic arithmetic operations. Add, subtract, multiply, divide with keyboard support. Simple calculator for everyday math and quick calculations.",
        popular: false,
      },
      {
        title: "Scientific Calculator",
        url: "/tools/calc/scientific",
        description:
          "Advanced scientific calculator with trigonometric, logarithmic, and exponential functions. Calculate sin, cos, tan, log, square root, and more. Free online scientific calculator for students and engineers.",
        popular: false,
      },
      {
        title: "Percentage Calculator",
        url: "/tools/calc/percentage",
        description:
          "Calculate percentages, percentage increase/decrease, and percentage change. Find X% of Y, calculate tips, discounts, and markups. Free percentage calculator with multiple modes.",
        popular: false,
      },
      {
        title: "Loan EMI Calculator",
        url: "/tools/calc/emi",
        description:
          "Calculate monthly EMI payments for home loans, car loans, and personal loans. EMI calculator with interest rate, loan amount, tenure, and amortization schedule. Plan your loan repayment effectively.",
        popular: true,
      },
      {
        title: "Currency Converter",
        url: "/tools/calc/currency",
        description:
          "Convert currencies with live exchange rates. Real-time currency converter for 150+ currencies including USD, EUR, GBP, JPY, INR. Free forex calculator for international money exchange.",
        popular: true,
      },
      {
        title: "Tip Calculator & Bill Splitter",
        url: "/tools/calc/tip-split",
        description:
          "Calculate tips and split bills among friends. Tip calculator with percentage options (10%, 15%, 20%, custom). Free bill splitter for restaurants and group dining.",
        popular: false,
      },
      {
        title: "Discount Calculator",
        url: "/tools/calc/discount",
        description:
          "Calculate discounted prices and savings from original price. Find final price after discount, percentage off, and amount saved. Free discount calculator for shopping and sales.",
        popular: false,
      },
      {
        title: "GPA Calculator",
        url: "/tools/calc/gpa",
        description:
          "Calculate your GPA from courses, grades, and credit hours. Supports A-F grade scale with plus/minus. Add courses dynamically, view color-coded results, and export your GPA.",
        popular: true,
      },
      {
        title: "CGPA Calculator",
        url: "/tools/calc/cgpa",
        description:
          "Calculate Cumulative GPA across multiple semesters. Add semesters with GPA and credits, get CGPA with academic classification. Free CGPA calculator for students.",
        popular: true,
      },
      {
        title: "Video Aspect Ratio Calculator",
        url: "/tools/calc/video-ratio",
        description:
          "Calculate video aspect ratios and resolutions. Presets for 4K, 1080p, 720p, Instagram, TikTok, YouTube Shorts. Scale calculator maintains ratio. Shows pixel count and megapixels.",
        popular: false,
      },
      {
        title: "Aspect Ratio Calculator",
        url: "/tools/calc/aspect-ratio",
        description:
          "Calculate aspect ratios for any resolution. Lock ratio and compute missing dimension. Common presets: 16:9, 4:3, 21:9, 1:1, 9:16. Scale calculator.",
        popular: false,
      },
    ],
  },
  {
    title: "Date & Time",
    url: "/tools/time",
    icon: Clock,
    isActive: true,
    items: [
      {
        title: "Time Zone Converter",
        url: "/tools/time/timezone",
        description:
          "Convert time between different time zones worldwide. World clock and time zone calculator for scheduling international meetings. Compare times across multiple cities and countries.",
        popular: true,
      },
      {
        title: "Age Calculator",
        url: "/tools/time/age",
        description:
          "Calculate exact age in years, months, weeks, days, hours from date of birth. Free age calculator with next birthday countdown. Find your age down to the second.",
        popular: false,
      },
      {
        title: "Countdown Timer",
        url: "/tools/time/countdown",
        description:
          "Online countdown timer for events, meetings, and Pomodoro technique. Customizable timer with alarm sound. Track time remaining for deadlines and important dates.",
        popular: false,
      },
      {
        title: "Week Number Calculator",
        url: "/tools/time/weekno",
        description:
          "Find ISO week number for any date. Week number calculator with date range display. Useful for project planning and scheduling with week-based calendars.",
        popular: false,
      },
      {
        title: "World Clock",
        url: "/tools/time/world-clock",
        description:
          "View current time in multiple cities worldwide. Live-updating world clock with 30+ major timezones, day/night indicators, 12h/24h toggle, and UTC offsets. Save your favorite cities.",
        popular: true,
      },
      {
        title: "Meeting Planner",
        url: "/tools/time/meeting-planner",
        description:
          "Find the best meeting time across time zones. Visual 24-hour grid with working hours highlighted. Overlap detection. Copy invite text with converted times.",
        popular: true,
      },
      {
        title: "Date Formatter",
        url: "/tools/time/date-formatter",
        description:
          "Convert any date to 15+ formats including ISO 8601, RFC 2822, Unix timestamp, and locale-specific formats (US, UK, Japan). Shows day of week, week number, and day of year.",
        popular: false,
      },
      {
        title: "Birthday Countdown",
        url: "/tools/time/birthday-countdown",
        description:
          "Live countdown to your next birthday with days, hours, minutes, seconds. Shows your exact age, zodiac sign, birthstone, birth day of week, and fun facts about your birth year.",
        popular: true,
      },
      {
        title: "Event Countdown",
        url: "/tools/time/event-countdown",
        description:
          "Create custom event countdowns with live days, hours, minutes, seconds display. Multiple simultaneous countdowns. Preset events: New Year, Christmas, Halloween. Color-coded. Saved locally.",
        popular: true,
      },
    ],
  },
  {
    title: "Utilities",
    url: "/tools/util",
    icon: Wrench,
    isActive: true,
    items: [
      {
        title: "Clipboard Cleaner",
        url: "/tools/util/clipboard-cleaner",
        description:
          "Remove formatting from copied text and paste as plain text. Strip HTML, Rich Text formatting, and hidden characters. Clean clipboard content for emails and documents.",
        popular: false,
      },
      {
        title: "Random Picker",
        url: "/tools/util/random-picker",
        description:
          "Pick random winners from a list of names. Random name picker for contests, giveaways, and decision making. Fair and unbiased random selection tool.",
        popular: false,
      },
      {
        title: "ID Generator",
        url: "/tools/util/id-generator",
        description:
          "Generate unique readable order IDs, reference numbers, and short identifiers. Create human-friendly IDs for orders, tickets, and tracking numbers.",
        popular: false,
      },
      {
        title: "Pomodoro Timer",
        url: "/tools/util/pomodoro",
        description:
          "Pomodoro technique timer with 25-minute work sessions and 5-minute breaks. Productivity timer with sound notifications to boost focus and prevent burnout.",
        popular: false,
      },
      {
        title: "Unit Price Comparator",
        url: "/tools/util/unit-price",
        description:
          "Compare unit prices to find the best value. Calculate price per unit, ounce, kilogram, or liter. Smart shopping tool to compare product sizes and save money.",
        popular: false,
      },
      {
        title: "Stopwatch",
        url: "/tools/util/stopwatch",
        description:
          "Online stopwatch with millisecond precision, lap recording, and keyboard shortcuts. Start, stop, reset, and record split times. Free stopwatch timer for workouts, cooking, and productivity.",
        popular: true,
      },
      {
        title: "Flip a Coin",
        url: "/tools/util/coin-flip",
        description:
          "Flip a virtual coin online with realistic 3D animation. Fair and unbiased heads or tails coin flipper using cryptographic randomness. Track flip history and statistics.",
        popular: true,
      },
      {
        title: "Roll a Dice",
        url: "/tools/util/dice-roller",
        description:
          "Roll virtual dice online with realistic animations. Support for 1-6 dice, roll history, and statistics. Fair random dice roller for board games, RPGs, and decision making.",
        popular: true,
      },
      {
        title: "Random Number Generator",
        url: "/tools/util/random-number",
        description:
          "Generate cryptographically secure random numbers with custom range. Bulk generation, no-duplicate mode, sort options, and copy to clipboard. Free random number generator.",
        popular: true,
      },
      {
        title: "Typing Speed Test",
        url: "/tools/util/typing-test",
        description:
          "Test your typing speed and accuracy with real-time WPM tracking. Multiple difficulty levels, character-by-character highlighting, and detailed results. Free online typing test.",
        popular: true,
      },
      {
        title: "Screen Recorder",
        url: "/tools/util/screen-recorder",
        description:
          "Record your screen online for free. Capture entire screen, application window, or browser tab with optional microphone audio. Download as WebM video. 100% browser-based, no software to install.",
        popular: true,
      },
      {
        title: "Decision Maker",
        url: "/tools/util/decision-maker",
        description:
          "Can't decide? Simple mode randomly picks from your options with spin animation. Weighted mode scores options by pros, cons, and criteria weights. Decision history saved locally.",
        popular: true,
      },
    ],
  },
  {
    title: "Office",
    url: "/tools/office",
    icon: ClipboardList,
    isActive: true,
    items: [
      {
        title: "Invoice Generator",
        url: "/tools/office/invoice",
        description:
          "Create professional invoices online for free. Simple invoice generator with customizable templates. Add items, calculate totals, and download as PDF. No signup required.",
        popular: true,
      },
      {
        title: "To-Do List (Offline)",
        url: "/tools/office/todo",
        description:
          "Private offline to-do list that works without internet. Local task manager with no signup or cloud sync. Your tasks stay on your device for complete privacy.",
        popular: false,
      },
      {
        title: "Meeting Notes Template",
        url: "/tools/office/meeting-notes",
        description:
          "Take structured meeting notes with timestamps and action items. Meeting minutes template for recording discussions, decisions, and next steps. Export notes as text or PDF.",
        popular: false,
      },
      {
        title: "Receipt Scanner",
        url: "/tools/office/receipt-scanner",
        description:
          "Manual receipt entry and tracking. Add store, date, amount, category, payment method. Filter and export as CSV. Total spending dashboard.",
        popular: false,
      },
      {
        title: "Resume Analyzer",
        url: "/tools/office/resume-analyzer",
        description:
          "Paste resume text for actionable feedback. Word count check, keyword density, weak word detection, action verb suggestions. ATS optimization tips.",
        popular: true,
      },
      {
        title: "Expense Tracker",
        url: "/tools/office/expense-tracker",
        description:
          "Track daily expenses by category with running totals and visual breakdowns. Add expenses with amounts, descriptions, and dates. Monthly summary with category-wise spending analysis. Data saved locally.",
        popular: true,
      },
      {
        title: "Timesheet Calculator",
        url: "/tools/office/timesheet",
        description:
          "Calculate weekly work hours with start/end times and break durations. Auto-computes daily hours, weekly total, and overtime (over 40h). Optional hourly rate for gross pay estimation.",
        popular: false,
      },
      {
        title: "Grocery List Manager",
        url: "/tools/office/grocery-list",
        description:
          "Smart grocery list with categories (Produce, Dairy, Meat, etc.). Add items with quantity, unit, and price. Check off while shopping. Total cost tracking. Multiple lists. Share as text.",
        popular: false,
      },
      {
        title: "Meeting Cost Calculator",
        url: "/tools/office/meeting-cost",
        description:
          "Calculate how much meetings cost based on attendees and salaries. Live ticking cost counter. Fun comparisons (X cups of coffee). Tips for efficient meetings.",
        popular: true,
      },
    ],
  },
  {
    title: "Travel",
    url: "/tools/travel",
    icon: MapIcon,
    isActive: true,
    items: [
      {
        title: "Distance Calculator",
        url: "/tools/travel/distance",
        description:
          "Calculate distance and estimated travel time between cities on a map. Interactive distance calculator with driving, walking, and straight-line distance. Plan your trips and routes.",
        popular: false,
      },
      {
        title: "Travel Packing Checklist",
        url: "/tools/travel/packing",
        description:
          "Smart packing list generator for trips. Customizable travel checklist based on destination, duration, and season. Never forget essential items when traveling.",
        popular: false,
      },
      {
        title: "Jet Lag Calculator",
        url: "/tools/travel/jet-lag",
        description:
          "Estimate jet lag severity and recovery time based on timezone differences. Get personalized tips for sleep schedule adjustment, light exposure, and meal timing. Covers all major world timezones.",
        popular: true,
      },
      {
        title: "Fuel Cost Calculator",
        url: "/tools/travel/fuel-cost",
        description:
          "Calculate fuel cost for any trip. Enter distance, fuel efficiency, and fuel price. Compare multiple vehicles, toggle metric/imperial, and calculate round trip costs.",
        popular: true,
      },
      {
        title: "Travel Budget Planner",
        url: "/tools/travel/budget",
        description:
          "Plan travel budget with expense categories: flights, accommodation, food, transport, activities, and more. Daily and per-person cost breakdown. Visual pie chart. Save and export budgets.",
        popular: true,
      },
      {
        title: "Packing Weight Calculator",
        url: "/tools/travel/packing-weight",
        description:
          "Calculate luggage weight before traveling. Categorize items, set airline weight limits. Visual progress bar with over-limit warnings. Toggle kg/lb. Know before you go.",
        popular: false,
      },
      {
        title: "Fuel Efficiency Converter",
        url: "/tools/travel/fuel-efficiency",
        description:
          "Convert between MPG (US/UK), L/100km, and km/L. Vehicle type presets. Efficiency comparison chart. Tips for improving fuel economy.",
        popular: false,
      },
      {
        title: "Travel Checklist",
        url: "/tools/travel/checklist",
        description:
          "Pre-trip checklist generator. Select trip type: Business, Beach, Adventure, City, Winter. Auto-generate categorized lists. Track packing progress. Print-friendly.",
        popular: true,
      },
      {
        title: "Visa Requirements Checker",
        url: "/tools/travel/visa-check",
        description:
          "Check visa requirements between 50+ countries. Shows Visa Free, Visa on Arrival, eVisa, or Visa Required status with max stay duration.",
        popular: true,
      },
    ],
  },
  {
    title: "Finance",
    url: "/tools/finance",
    icon: Wallet,
    isActive: true,
    items: [
      {
        title: "Savings Goal Calculator",
        url: "/tools/finance/savings-goal",
        description:
          "Calculate how much to save monthly to reach your financial goals. Savings calculator with compound interest and target date. Plan your savings strategy effectively.",
        popular: false,
      },
      {
        title: "GST/VAT Calculator",
        url: "/tools/finance/vat",
        description:
          "Add or remove GST/VAT from prices. Tax calculator for sales tax, VAT, GST with custom rates. Calculate inclusive and exclusive tax amounts instantly.",
        popular: false,
      },
      {
        title: "Salary to Hourly Converter",
        url: "/tools/finance/salary-hourly",
        description:
          "Convert annual salary to hourly rate and vice versa. Salary calculator with work hours, overtime, and take-home pay estimation. Compare job offers and negotiate better.",
        popular: false,
      },
      {
        title: "Compound Interest Calculator",
        url: "/tools/finance/compound-interest",
        description:
          "Calculate compound interest with monthly contributions. See year-by-year breakdown of principal, interest earned, and total balance. Free compound interest calculator with formula display.",
        popular: true,
      },
      {
        title: "Mortgage Calculator",
        url: "/tools/finance/mortgage",
        description:
          "Calculate monthly mortgage payments with down payment, loan term, and interest rate. See total interest paid, total cost, and principal vs interest breakdown. Compare 15, 20, 25, and 30-year terms.",
        popular: true,
      },
      {
        title: "Investment Return Calculator",
        url: "/tools/finance/investment-return",
        description:
          "Calculate investment growth over time with initial investment, monthly contributions, and annual return rate. Year-by-year breakdown table showing balance, contributions, and returns.",
        popular: true,
      },
      {
        title: "Debt Payoff Calculator",
        url: "/tools/finance/debt-payoff",
        description:
          "Calculate debt payoff timeline and total interest. See how extra payments ($50, $100, $200/mo) accelerate payoff. Yearly amortization schedule with balance tracking.",
        popular: false,
      },
      {
        title: "Net Salary Calculator",
        url: "/tools/finance/net-salary",
        description:
          "Calculate take-home pay after taxes. US Federal tax brackets with effective rate calculation. Monthly and yearly net salary. Visual tax vs take-home breakdown. Custom tax rate option.",
        popular: true,
      },
      {
        title: "Loan Comparison Calculator",
        url: "/tools/finance/loan-comparison",
        description:
          "Compare up to 3 loan offers side by side. See monthly payment, total interest, and total cost for each. Highlights the cheapest option and shows potential savings.",
        popular: false,
      },
      {
        title: "Electricity Cost Calculator",
        url: "/tools/finance/electricity-cost",
        description:
          "Calculate electricity cost for appliances. Add devices with wattage and usage hours. Presets for fridge, AC, TV, PC. Monthly and yearly cost. Energy-saving tips included.",
        popular: false,
      },
      {
        title: "Subscription Tracker",
        url: "/tools/finance/subscriptions",
        description:
          "Track recurring subscriptions by category (streaming, software, gaming, etc.). Monthly and yearly totals. Sort by cost or date. Mark active/paused. Saved locally.",
        popular: true,
      },
      {
        title: "Interest Rate Comparison",
        url: "/tools/finance/interest-compare",
        description:
          "Compare savings growth across up to 4 different interest rates. Daily, monthly, quarterly, annual compounding. Projections over 1-30 years. Highlights best performer.",
        popular: false,
      },
      {
        title: "Retirement Calculator",
        url: "/tools/finance/retirement",
        description:
          "Calculate retirement savings projections. Year-by-year growth table. Monthly income using the 4% rule. Inflation-adjusted values. Visual progress tracking.",
        popular: true,
      },
      {
        title: "Currency Pair Chart",
        url: "/tools/finance/currency-chart",
        description:
          "Visual currency pair comparison with simulated historical charts. 30-day, 90-day, 1-year views. Rate trends, highs, lows. Swap currencies. 20+ currency pairs.",
        popular: true,
      },
      {
        title: "Expense Splitter",
        url: "/tools/finance/expense-splitter",
        description:
          "Split expenses among a group. Add people and expenses. Equal or custom splits. Calculates optimized settlements showing who owes whom.",
        popular: true,
      },
      {
        title: "Tax Bracket Calculator",
        url: "/tools/finance/tax-bracket",
        description:
          "Calculate income tax by brackets for US, UK, Canada, Australia, India. Bracket breakdown, effective rate, take-home pay. Visual bar chart.",
        popular: true,
      },
      {
        title: "Expense Categorizer",
        url: "/tools/finance/expense-categories",
        description:
          "Categorize expenses with pie chart breakdown. Set monthly budget limits per category. Progress bars and over-budget alerts. Saved locally.",
        popular: true,
      },
    ],
  },
  {
    title: "Fun",
    url: "/tools/fun",
    icon: Heart,
    isActive: true,
    items: [
      {
        title: "Love Calculator",
        url: "/tools/fun/love-calculator",
        description:
          "Calculate your love compatibility percentage! Enter two names and get a fun love score with animated hearts and playful messages. Deterministic — same names always get the same result.",
        popular: true,
      },
      {
        title: "Random Quote Generator",
        url: "/tools/fun/quote-generator",
        description:
          "Get inspired with random quotes from 50+ curated entries across inspirational, motivational, funny, philosophical, and life categories. Save favorites, copy, and share on Twitter.",
        popular: false,
      },
      {
        title: "Truth or Dare Generator",
        url: "/tools/fun/truth-or-dare",
        description:
          "Play truth or dare online! 120+ truths and dares with difficulty levels (Easy, Medium, Spicy), family-friendly and adult modes, player names, and history tracking.",
        popular: true,
      },
      {
        title: "Would You Rather",
        url: "/tools/fun/would-you-rather",
        description:
          "Play Would You Rather with 50+ dilemmas across funny, philosophical, and impossible categories. Choose between two options, see fun percentage stats, and track your choices.",
        popular: true,
      },
      {
        title: "Magic 8 Ball",
        url: "/tools/fun/magic-8-ball",
        description:
          "Ask the Magic 8 Ball any yes-or-no question and get a mystical answer! Classic billiard-style 8-ball with 20 authentic responses, shake animation, and question history.",
        popular: false,
      },
      {
        title: "Random Name Generator",
        url: "/tools/fun/name-generator",
        description:
          "Generate random names for characters, babies, usernames, and pen names. 200+ first names, fantasy names, and username patterns. Filter by gender, starting letter, and category.",
        popular: true,
      },
      {
        title: "Zodiac Sign Finder",
        url: "/tools/fun/zodiac",
        description:
          "Enter your birth date to find your Western zodiac sign, Chinese zodiac animal, element, ruling planet, compatible signs, personality traits, lucky numbers, and birthstone.",
        popular: true,
      },
      {
        title: "ASCII Art Generator",
        url: "/tools/fun/ascii-art",
        description:
          "Convert text to ASCII art with multiple font styles: Banner, Block, Standard. Preview in monospace, copy to clipboard. Fun text art for social media, comments, and messages.",
        popular: true,
      },
      {
        title: "Dice Probability Calculator",
        url: "/tools/fun/dice-probability",
        description:
          "Calculate dice roll probabilities. 1-6 dice with 4/6/8/10/12/20 sides. Exact, at least, at most conditions. Distribution chart. D&D and board game presets.",
        popular: false,
      },
      {
        title: "Morse Code Audio",
        url: "/tools/fun/morse-audio",
        description:
          "Convert text to Morse code with audio playback via Web Audio API. Adjustable speed (5-20 WPM). Visual indicator. Decode Morse to text. Copy output.",
        popular: true,
      },
      {
        title: "Color Memory Game",
        url: "/tools/fun/color-memory",
        description:
          "Classic memory card matching game. Flip cards to find matching color pairs. Track moves and time. Easy, Medium, Hard difficulties. Best score saved.",
        popular: true,
      },
      {
        title: "Reaction Time Test",
        url: "/tools/fun/reaction-time",
        description:
          "Measure your reaction time in milliseconds. Screen turns green at random intervals. Track best score and average. Fun ratings from Superhuman to Slow.",
        popular: true,
      },
      {
        title: "Animal Quiz",
        url: "/tools/fun/animal-quiz",
        description:
          "Fun trivia quiz about animals. 30 questions across Mammals, Birds, Sea Life, Insects, Reptiles. 15-second timer. Score tracking with high score.",
        popular: true,
      },
    ],
  },
  {
    title: "Network & Security",
    url: "/tools/network",
    icon: Shield,
    isActive: true,
    items: [
      {
        title: "What Is My IP",
        url: "/tools/network/my-ip",
        description:
          "Instantly detect your public IPv4 and IPv6 address. See your location, ISP, time zone, and coordinates. Privacy-first — your IP is detected client-side and never stored.",
        popular: true,
      },
      {
        title: "IP Geolocation Lookup",
        url: "/tools/network/ip-lookup",
        description:
          "Look up any IP address to find its geographic location, ISP, ASN, time zone, currency, and more. Free IP geolocation tool with lookup history.",
        popular: true,
      },
      {
        title: "WHOIS Domain Lookup",
        url: "/tools/network/whois",
        description:
          "Look up domain registration details using the free RDAP protocol. Find registrar, registration date, expiration date, nameservers, and DNSSEC status for any domain.",
        popular: true,
      },
      {
        title: "DNS Lookup",
        url: "/tools/network/dns-lookup",
        description:
          "Query DNS records for any domain — A, AAAA, MX, NS, TXT, CNAME, SOA. Uses Google DNS-over-HTTPS for fast, accurate results with resolution time tracking.",
        popular: true,
      },
      {
        title: "HTTP Header Checker",
        url: "/tools/network/http-headers",
        description:
          "Check HTTP response headers for any URL. Analyze security headers like CSP, HSTS, X-Frame-Options, and get a security score. Find missing security headers.",
        popular: false,
      },
      {
        title: "SSL Certificate Checker",
        url: "/tools/network/ssl-checker",
        description:
          "Check SSL/TLS certificate details for any domain. See issuer, expiration date, days remaining, and certificate chain. Monitor your SSL certificates.",
        popular: true,
      },
      {
        title: "Email Header Analyzer",
        url: "/tools/network/email-headers",
        description:
          "Analyze email headers to trace delivery path, check SPF/DKIM/DMARC authentication, and identify spam. Paste raw headers and see the full hop-by-hop route.",
        popular: false,
      },
      {
        title: "Username Checker",
        url: "/tools/network/username-check",
        description:
          "Check username availability across 20+ social media platforms. Generate direct profile links for GitHub, Twitter, Instagram, YouTube, TikTok, Reddit, and more.",
        popular: true,
      },
      {
        title: "MAC Address Lookup",
        url: "/tools/network/mac-lookup",
        description:
          "Look up the manufacturer of any network device by its MAC address. Identify vendor, OUI prefix, and MAC type (unicast/multicast). Random MAC generator included.",
        popular: false,
      },
      {
        title: "Subdomain Finder",
        url: "/tools/network/subdomain-finder",
        description:
          "Find all registered subdomains for any domain using public Certificate Transparency (CT) logs. Fast, 100% free, and legal lookup.",
        popular: true,
      },
      {
        title: "Web & Security Directory",
        url: "/tools/network/web-resources",
        description:
          "Curated interactive directory of 30+ of the best search engines, threat registries, and threat databases.",
        popular: true,
      },
      {
        title: "WiFi QR Code Generator",
        url: "/tools/network/wifi-qr",
        description:
          "Generate QR codes for WiFi sharing. Enter SSID, password, and encryption type. Phones scan to auto-connect. Download QR as PNG. Print-friendly layout.",
        popular: true,
      },
      {
        title: "Network Speed Converter",
        url: "/tools/network/speed-converter",
        description:
          "Convert between network speed units (bps to Gbps). Download time estimates for common file sizes. Presets for dial-up, DSL, cable, fiber, and 5G speeds.",
        popular: false,
      },
      {
        title: "Bandwidth Calculator",
        url: "/tools/network/bandwidth",
        description:
          "Calculate transfer times and bandwidth requirements. Multi-file queue support. Presets for cloud backup, 4K streaming, and video calls. Reverse calculator included.",
        popular: false,
      },
      {
        title: "Subnet Calculator",
        url: "/tools/network/subnet",
        description:
          "Calculate subnet details from IP and CIDR. Network/broadcast address, usable hosts, wildcard mask, IP class. Binary representation. Common subnet reference table.",
        popular: true,
      },
      {
        title: "Port Number Reference",
        url: "/tools/network/port-reference",
        description:
          "Searchable reference of 50+ common network ports. Filter by category: Web, Database, Email, Remote Access. Shows protocol (TCP/UDP). Copy port info.",
        popular: false,
      },
      {
        title: "DNS Record Generator",
        url: "/tools/network/dns-generator",
        description:
          "Generate DNS records for common setups. A, AAAA, CNAME, MX, TXT, NS, SRV types. Presets for email and website. Output in BIND zone file format.",
        popular: false,
      },
    ],
  },
  {
    title: "Health",
    url: "/tools/health",
    icon: Activity,
    isActive: true,
    items: [
      {
        title: "Calorie Calculator",
        url: "/tools/health/calorie-calculator",
        description:
          "Calculate your daily calorie needs and TDEE (Total Daily Energy Expenditure) for free. Uses the Mifflin-St Jeor formula with activity level. Get macronutrient breakdown for weight loss, maintenance, or gain goals.",
        popular: true,
      },
      {
        title: "Sleep Calculator",
        url: "/tools/health/sleep-calculator",
        description:
          "Calculate the best times to sleep and wake up based on 90-minute sleep cycles. Color-coded recommendations help you get optimal rest. Accounts for 15 minutes to fall asleep.",
        popular: true,
      },
      {
        title: "Water Intake Calculator",
        url: "/tools/health/water-intake",
        description:
          "Calculate your personalized daily water intake based on weight, activity level, and climate. Track daily hydration with an interactive progress ring. Hourly drinking schedule included.",
        popular: false,
      },
      {
        title: "BMR Calculator",
        url: "/tools/health/bmr-calculator",
        description:
          "Calculate your Basal Metabolic Rate using Harris-Benedict and Mifflin-St Jeor equations. See daily calorie needs for sedentary, light, moderate, active, and very active lifestyles.",
        popular: true,
      },
      {
        title: "Body Fat Calculator",
        url: "/tools/health/body-fat",
        description:
          "Estimate body fat percentage using the US Navy method. Calculate fat mass, lean mass, and body fat category. Supports both metric and imperial measurements with visual progress indicators.",
        popular: false,
      },
      {
        title: "Heart Rate Zone Calculator",
        url: "/tools/health/heart-rate-zones",
        description:
          "Calculate heart rate training zones based on age and resting heart rate. Standard and Karvonen methods. 5 color-coded zones from Recovery to Maximum with target BPM ranges.",
        popular: true,
      },
      {
        title: "Pregnancy Due Date Calculator",
        url: "/tools/health/due-date",
        description:
          "Estimate your due date from last menstrual period using Naegele's rule. Shows current week, trimester, key milestones timeline, and conception date. For informational purposes only.",
        popular: false,
      },
      {
        title: "Meditation Timer",
        url: "/tools/health/meditation-timer",
        description:
          "Simple meditation timer with preset durations and breathing guide animation. Gentle bell sounds at start and end. Session counter. Box breathing pattern (4-4-4-4). Calm, focused design.",
        popular: true,
      },
      {
        title: "Screen Time Calculator",
        url: "/tools/health/screen-time",
        description:
          "Track and analyze daily screen time by device and app category. Daily and weekly totals. 20-20-20 rule reminder. Health tips based on usage level. Visual breakdown charts.",
        popular: false,
      },
      {
        title: "Macro Calculator",
        url: "/tools/health/macro-calculator",
        description:
          "Calculate daily macronutrient targets based on TDEE. Protein, carbs, and fat goals for weight loss, maintenance, or muscle gain. Preset splits: balanced, low-carb, high-protein, keto.",
        popular: false,
      },
      {
        title: "Blood Pressure Tracker",
        url: "/tools/health/blood-pressure",
        description:
          "Track blood pressure readings with systolic, diastolic, and heart rate. Auto-categorize: Normal, Elevated, High Stage 1/2, Crisis. Color-coded. 7-day and 30-day averages.",
        popular: false,
      },
      {
        title: "Ideal Weight Calculator",
        url: "/tools/health/ideal-weight",
        description:
          "Calculate ideal body weight using Devine, Robinson, Miller, and Hamwi formulas. BMI-based range. Metric and imperial support. Compare with current weight.",
        popular: false,
      },
      {
        title: "Hydration Reminder",
        url: "/tools/health/hydration",
        description:
          "Track daily water intake with visual fill animation. Quick-add buttons for glass, bottle, can. Daily goal tracking. 7-day history. Hydration tips.",
        popular: false,
      },
      {
        title: "Allergy Tracker",
        url: "/tools/health/allergy-tracker",
        description:
          "Track allergies and reactions. Log allergen, severity, symptoms, date. Categorize by type. Summary dashboard. Export data. Saved locally.",
        popular: false,
      },
      {
        title: "Workout Timer",
        url: "/tools/health/workout-timer",
        description:
          "Interval training timer with audio cues. Set work/rest durations and rounds. Presets for Tabata, HIIT, EMOM. Visual progress bar. Pause/Resume.",
        popular: true,
      },
      {
        title: "Symptom Diary",
        url: "/tools/health/symptom-diary",
        description:
          "Daily symptom tracking with severity (1-10), categories, time of day. Calendar view, trend analysis, export. Consult a healthcare provider.",
        popular: false,
      },
    ],
  },
  {
    title: "Productivity",
    url: "/tools/productivity",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Online Notepad",
        url: "/tools/productivity/notepad",
        description:
          "Free online notepad and text editor. Auto-saves to your browser with multiple tabs, dark mode, word count, and download as .txt. No signup required, works offline. Your notes never leave your device.",
        popular: true,
      },
      {
        title: "Online Whiteboard",
        url: "/tools/productivity/whiteboard",
        description:
          "Free online whiteboard and drawing tool. Freehand drawing, shapes, colors, brush sizes, undo/redo, and export as PNG. Perfect for brainstorming, diagrams, and quick sketches. Works in your browser.",
        popular: true,
      },
      {
        title: "Habit Tracker",
        url: "/tools/productivity/habit-tracker",
        description:
          "Build better habits with a visual streak tracker. Add custom habits, track daily completion with a heatmap, view current and best streaks, and see weekly stats. All data saved locally in your browser.",
        popular: true,
      },
      {
        title: "Eisenhower Matrix",
        url: "/tools/productivity/eisenhower-matrix",
        description:
          "Interactive 2x2 priority matrix for task management. Categorize tasks as Do First, Schedule, Delegate, or Eliminate. Color-coded quadrants with task tracking and localStorage persistence.",
        popular: true,
      },
      {
        title: "Flashcard Maker",
        url: "/tools/productivity/flashcards",
        description:
          "Create study flashcards with flip animations. Multiple deck management, shuffle mode, progress tracking, and JSON import/export. Perfect for students and self-learners.",
        popular: false,
      },
      {
        title: "Kanban Board",
        url: "/tools/productivity/kanban",
        description:
          "Simple kanban board with To Do, In Progress, and Done columns. Add tasks, move between columns, add custom columns, and track progress. All data saved locally.",
        popular: true,
      },
      {
        title: "Priority Matrix",
        url: "/tools/productivity/priority-matrix",
        description:
          "Impact vs Effort priority matrix. Four quadrants: Quick Wins, Major Projects, Fill-Ins, Avoid. Add tasks, assign quadrants, track progress. Color-coded. Saved locally.",
        popular: false,
      },
      {
        title: "Habit Streak Counter",
        url: "/tools/productivity/streaks",
        description:
          "Track daily habit streaks. Mark habits done, see current and longest streaks. 30-day heatmap calendar. Motivational messages at milestones. Multiple habits support.",
        popular: true,
      },
      {
        title: "Focus Timer",
        url: "/tools/productivity/focus-timer",
        description:
          "Distraction-free focus timer with Deep Work (90 min), Pomodoro (25 min), and Sprint (15 min) modes. Session counter, break timer, daily stats. Saved locally.",
        popular: true,
      },
      {
        title: "Daily Journal",
        url: "/tools/productivity/journal",
        description:
          "Simple daily journal with mood tracking (5 levels), tags, calendar view, and search. Word count per entry. Export entries. All saved locally.",
        popular: true,
      },
      {
        title: "Reading List Manager",
        url: "/tools/productivity/reading-list",
        description:
          "Manage books and articles. Track status (To Read, Reading, Completed), rate with stars, add notes. Search, filter, sort. Export list.",
        popular: true,
      },
      {
        title: "Gratitude Journal",
        url: "/tools/productivity/gratitude",
        description:
          "Daily gratitude entries. Write 3 things you are grateful for. Streak counter, inspirational prompts, monthly calendar view. Saved locally.",
        popular: true,
      },
    ],
  },
];

export const TOTAL_TOOLS_COUNT = ToolsData.reduce((acc, category) => {
  const actualItems = category.items.filter(item => item.url !== "/tools");
  return acc + actualItems.length;
}, 0);
