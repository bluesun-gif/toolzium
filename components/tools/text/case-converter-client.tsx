"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Type, Code2, Globe, Sparkles, Zap, ShieldCheck, ArrowDownUp, Hash, FileText } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

export default function CaseConverterClient() {
  const [text, setText] = useState<string>(
    "Toolzium is an high-performance online tool suite designed for developers and creators!"
  );

  const getWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_\-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const toUppercase = (str: string) => str.toUpperCase();
  const toLowercase = (str: string) => str.toLowerCase();

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*|\.\s*)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    const words = getWords(str);
    if (words.length === 0) return "";
    return words[0].toLowerCase() + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  };

  const toPascalCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  };

  const toSnakeCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toLowerCase()).join("_");
  };

  const toKebabCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toLowerCase()).join("-");
  };

  const toConstantCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toUpperCase()).join("_");
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
  };

  const formats = [
    { label: "UPPERCASE", value: toUppercase(text) },
    { label: "lowercase", value: toLowercase(text) },
    { label: "Title Case", value: toTitleCase(text) },
    { label: "Sentence case", value: toSentenceCase(text) },
    { label: "camelCase", value: toCamelCase(text) },
    { label: "PascalCase", value: toPascalCase(text) },
    { label: "snake_case", value: toSnakeCase(text) },
    { label: "kebab-case (URL Slug)", value: toKebabCase(text) },
    { label: "CONSTANT_CASE", value: toConstantCase(text) },
    { label: "aLtErNaTiNg cAsE", value: toAlternatingCase(text) },
  ];

  const handleReset = () => {
    setText("");
    toast.success("Reset!");
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").length : 0;

  const steps = [
    {
      step: "1",
      title: "Input Text",
      description: "Type or paste your text into the input field.",
      icon: Type,
    },
    {
      step: "2",
      title: "Instant Conversion",
      description: "The tool automatically converts your text into 10 different case formats in real-time.",
      icon: Zap,
    },
    {
      step: "3",
      title: "Copy Output",
      description: "Click the copy button next to the desired format to copy it to your clipboard.",
      icon: FileText,
    },
  ];

  const features = [
    {
      title: "10 Case Formats",
      description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
      icon: ArrowDownUp,
    },
    {
      title: "URL Slug Generator",
      description: "Generate clean, SEO-friendly kebab-case URL slugs from any text.",
      icon: Globe,
    },
    {
      title: "Developer Ready",
      description: "Perfect for programming with instant camelCase, PascalCase, and CONSTANT_CASE generation.",
      icon: Code2,
    },
    {
      title: "Instant Processing",
      description: "All conversions happen instantly in your browser as you type.",
      icon: Zap,
    },
    {
      title: "100% Private",
      description: "Your text never leaves your device. All processing is done locally.",
      icon: ShieldCheck,
    },
    {
      title: "Special Character Support",
      description: "Intelligently handles boundaries and preserves special characters where applicable.",
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      question: "What case formats does this converter support?",
      answer: "It supports UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case (URL slug), CONSTANT_CASE, and aLtErNaTiNg cAsE — 10 formats in total.",
    },
    {
      question: "Is this tool free and private?",
      answer: "Yes. All conversions happen instantly in your browser. No data is sent to any server, and no registration is required.",
    },
    {
      question: "What is the difference between camelCase and PascalCase?",
      answer: "camelCase starts with a lowercase letter (e.g., getUserName), while PascalCase starts with an uppercase letter (e.g., UserProfile). camelCase is standard for JavaScript variables; PascalCase is used for React components and C# classes.",
    },
    {
      question: "Can I use this to generate URL slugs?",
      answer: "Yes. The kebab-case output produces clean, lowercase, hyphen-separated strings that are ideal for SEO-friendly URL slugs.",
    },
    {
      question: "Does the converter handle special characters?",
      answer: "The converter splits text by spaces, underscores, hyphens, and camelCase boundaries. Special characters within words are preserved in the output.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Case Converter & URL Slugify"
        description="Transform text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and URL slugs instantly. Free online text converter."
        icon={Type}
      />

      {/* Main Input Textarea */}
      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Type or paste your text to convert instantly</CardDescription>
          </div>
          <div className="flex gap-2">
            <CopyButton getText={text} />
            <ResetButton onClick={handleReset} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextareaField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            rows={5}
          />

          <div className="grid grid-cols-3 gap-4 pt-2">
            <Stat label="Total Characters" value={charCount.toLocaleString()} />
            <Stat label="Total Words" value={wordCount.toLocaleString()} />
            <Stat label="Line Count" value={lineCount.toLocaleString()} />
          </div>
        </CardContent>
      </GlassCard>

      {/* Transformed Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((fmt) => (
          <GlassCard key={fmt.label}>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-6 border-b">
              <span className="text-sm font-semibold">{fmt.label}</span>
              <CopyButton getText={fmt.value} size="sm" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-3 border rounded-lg bg-muted/20 font-mono text-xs max-h-32 overflow-y-auto break-all select-all">
                {fmt.value || <span className="text-muted-foreground italic">Empty string</span>}
              </div>
            </CardContent>
          </GlassCard>
        ))}
      </div>

      <ToolHowItWorks steps={steps} title="How Case Conversion Works" />

      <ToolFeatureGuides features={features}>
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-2">What Is Case Conversion?</h3>
            <p className="mb-4">
              Case conversion is the process of changing the capitalization and spacing of text to fit specific formatting rules or naming conventions. Our free online case converter instantly transforms your input into 10 distinct styles: <strong>UPPERCASE</strong>, <strong>lowercase</strong>, <strong>Title Case</strong>, <strong>Sentence case</strong>, <strong>camelCase</strong>, <strong>PascalCase</strong>, <strong>snake_case</strong>, <strong>kebab-case</strong>, <strong>CONSTANT_CASE</strong>, and <strong>aLtErNaTiNg cAsE</strong>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-2">Variable Naming Conventions by Language</h3>
            <p className="mb-4">
              Different programming languages and frameworks enforce specific naming conventions to ensure code readability and consistency. Here is a breakdown of the most common case styles used in software development:
            </p>
            <div className="overflow-x-auto mb-4 border rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b">Case Style</th>
                    <th className="px-4 py-3 font-semibold border-b">Convention Name</th>
                    <th className="px-4 py-3 font-semibold border-b">Language/Context</th>
                    <th className="px-4 py-3 font-semibold border-b">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">camelCase</td>
                    <td className="px-4 py-3">Camel Case</td>
                    <td className="px-4 py-3">JavaScript, Java, TypeScript</td>
                    <td className="px-4 py-3 font-mono text-xs"><code>getUserName</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">PascalCase</td>
                    <td className="px-4 py-3">Pascal Case</td>
                    <td className="px-4 py-3">C#, React Components, Types</td>
                    <td className="px-4 py-3 font-mono text-xs"><code>UserProfile</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">snake_case</td>
                    <td className="px-4 py-3">Snake Case</td>
                    <td className="px-4 py-3">Python, Ruby, SQL, Rust</td>
                    <td className="px-4 py-3 font-mono text-xs"><code>user_name</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">kebab-case</td>
                    <td className="px-4 py-3">Kebab Case</td>
                    <td className="px-4 py-3">CSS, HTML, URLs</td>
                    <td className="px-4 py-3 font-mono text-xs"><code>main-content</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">CONSTANT_CASE</td>
                    <td className="px-4 py-3">Screaming Snake</td>
                    <td className="px-4 py-3">Environment variables, constants</td>
                    <td className="px-4 py-3 font-mono text-xs"><code>MAX_RETRIES</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-2">CSS text-transform vs JavaScript</h3>
            <p className="mb-4">
              When building web applications, you can change text case using CSS properties like <code>text-transform: uppercase</code>, <code>lowercase</code>, or <code>capitalize</code>. However, it&apos;s crucial to understand that CSS only alters the <em>visual presentation</em> of the text. The underlying DOM string remains unchanged. If you need to mutate the actual string data—for example, when saving user input to a database or generating a URL slug—you must perform the conversion using JavaScript or a server-side language.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-2">URL Slug Best Practices</h3>
            <p className="mb-4">
              A URL slug is the exact address of a specific page on your website. Using the right format is essential for Search Engine Optimization (SEO). The industry standard for URLs is <strong>kebab-case</strong> (e.g., <code>my-blog-post</code>). Search engines treat hyphens as space characters, allowing them to easily parse the words in your URL. Avoid using underscores or spaces, as they can cause indexing issues or ugly percent-encoding (like <code>%20</code>).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-2">Pro Tips for Developers</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Enforce Consistency:</strong> Use linters like ESLint (with rules like <code>camelcase</code>) to ensure consistent variable naming across your codebase.</li>
              <li><strong>Framework Naming Conventions:</strong> In many modern frameworks, it&apos;s a best practice to use kebab-case for file names (e.g., <code>case-converter-client.tsx</code>) to avoid case-sensitivity issues across different operating systems like Windows and macOS.</li>
              <li><strong>Database Columns:</strong> When working with relational databases like PostgreSQL, stick to snake_case for table and column names to prevent quoting nightmares.</li>
            </ul>
          </section>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={faqs} />
      
      <RelatedTools currentToolUrl="/tools/text/case-converter" max={6} />
    </div>
  );
}
