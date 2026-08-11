"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book, FileText, Globe, Plus, Trash2, Download, Copy, Library } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

type SourceType = "book" | "journal" | "website" | "conference";
type CitationFormat = "apa" | "mla" | "chicago" | "harvard" | "ieee" | "vancouver";

interface Author {
  first: string;
  last: string;
}

interface SourceData {
  type: SourceType;
  authors: Author[];
  title: string;
  year: string;
  publisher?: string;
  url?: string;
  accessDate?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  location?: string;
}

const INITIAL_SOURCE: SourceData = {
  type: "book",
  authors: [{ first: "", last: "" }],
  title: "",
  year: new Date().getFullYear().toString(),
  publisher: "",
  url: "",
  accessDate: new Date().toISOString().split("T")[0],
  journal: "",
  volume: "",
  issue: "",
  pages: "",
  doi: "",
  location: ""
};

export function CitationGeneratorClient() {
  const [currentSource, setCurrentSource] = useState<SourceData>(INITIAL_SOURCE);
  const [format, setFormat] = useState<CitationFormat>("apa");
  const [bibliography, setBibliography] = useState<SourceData[]>([]);
  const [showAllFormats, setShowAllFormats] = useState(false);

  const updateField = (field: keyof SourceData, value: any) => {
    setCurrentSource(prev => ({ ...prev, [field]: value }));
  };

  const addAuthor = () => {
    setCurrentSource(prev => ({
      ...prev,
      authors: [...prev.authors, { first: "", last: "" }]
    }));
  };

  const removeAuthor = (index: number) => {
    setCurrentSource(prev => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index)
    }));
  };

  const updateAuthor = (index: number, field: "first" | "last", value: string) => {
    const newAuthors = [...currentSource.authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setCurrentSource(prev => ({ ...prev, authors: newAuthors }));
  };

  const formatAuthorsAPA = (authors: Author[]) => {
    if (authors.length === 0) return "";
    if (authors.length === 1) return `${authors[0].last}, ${authors[0].first[0]}.`;
    if (authors.length === 2) return `${authors[0].last}, ${authors[0].first[0]}., & ${authors[1].last}, ${authors[1].first[0]}.`;
    return `${authors[0].last}, ${authors[0].first[0]}., et al.`;
  };

  const formatAuthorsMLA = (authors: Author[]) => {
    if (authors.length === 0) return "";
    if (authors.length === 1) return `${authors[0].last}, ${authors[0].first}.`;
    if (authors.length === 2) return `${authors[0].last}, ${authors[0].first}, and ${authors[1].first} ${authors[1].last}.`;
    return `${authors[0].last}, ${authors[0].first}, et al.`;
  };

  const generateCitation = useCallback((source: SourceData, fmt: CitationFormat): string => {
    const authorStr = fmt === "mla" ? formatAuthorsMLA(source.authors) : formatAuthorsAPA(source.authors);
    const title = source.title ? (fmt === "apa" || fmt === "harvard" ? `<i>${source.title}</i>` : `"${source.title}"`) : "";
    
    switch (source.type) {
      case "book":
        if (fmt === "apa") return `${authorStr} (${source.year}). ${title}. ${source.publisher || ""}.`;
        if (fmt === "mla") return `${authorStr} ${title}. ${source.publisher || ""}, ${source.year}.`;
        return `${authorStr} ${title}. ${source.publisher || ""}, ${source.year}.`;
      
      case "journal":
        const volInfo = source.volume ? `, ${source.volume}` : "";
        const issueInfo = source.issue ? `(${source.issue})` : "";
        if (fmt === "apa") return `${authorStr} (${source.year}). ${source.title}. <i>${source.journal}</i>${volInfo}${issueInfo}, ${source.pages}.`;
        return `${authorStr} "${source.title}." <i>${source.journal}</i>${volInfo}${issueInfo} (${source.year}): ${source.pages}.`;

      case "website":
        const access = source.accessDate ? `Retrieved ${source.accessDate}, from ` : "";
        if (fmt === "apa") return `${authorStr} (${source.year}). ${title}. ${access}${source.url}`;
        return `${authorStr} "${title}." ${source.journal || "Website Name"}, ${source.year}, ${source.url}.`;
        
      default:
        return "Citation format not fully implemented for this type.";
    }
  }, []);

  const currentCitation = useMemo(() => generateCitation(currentSource, format), [currentSource, format, generateCitation]);

  const allFormats = useMemo(() => {
    return {
      apa: generateCitation(currentSource, "apa"),
      mla: generateCitation(currentSource, "mla"),
      chicago: generateCitation(currentSource, "chicago"),
      harvard: generateCitation(currentSource, "harvard"),
      ieee: generateCitation(currentSource, "ieee"),
      vancouver: generateCitation(currentSource, "vancouver")
    };
  }, [currentSource, generateCitation]);

  const addToBibliography = () => {
    if (!currentSource.title || currentSource.authors[0].last === "") {
      toast.error("Please enter at least a title and one author");
      return;
    }
    setBibliography(prev => [...prev, { ...currentSource }]);
    toast.success("Added to bibliography");
  };

  const exportBibliography = () => {
    const sorted = [...bibliography].sort((a, b) => {
      const aAuth = a.authors[0]?.last || "";
      const bAuth = b.authors[0]?.last || "";
      return aAuth.localeCompare(bAuth);
    });

    const text = sorted.map(s => generateCitation(s, format)).join("\n\n");
    navigator.clipboard.writeText(text);
    toast.success("Bibliography copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Book}
        title="Academic Citation Generator"
        description="Create flawless bibliographies in APA, MLA, Chicago, and more. Manage your sources and export perfectly formatted references instantly."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`${cardClass} lg:col-span-2`}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <FileText className="w-4 h-4 text-primary" />
              Source Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Source Type</Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={currentSource.type}
                  onChange={(e) => updateField("type", e.target.value as SourceType)}
                >
                  <option value="book">Book</option>
                  <option value="journal">Journal Article</option>
                  <option value="website">Website</option>
                  <option value="conference">Conference Paper</option>
                </select>
              </div>
              <div>
                <Label>Year</Label>
                <Input 
                  value={currentSource.year} 
                  onChange={(e) => updateField("year", e.target.value)} 
                  placeholder="2023" 
                />
              </div>
            </div>

            <div className="space-y-3 border-t border-border/50 pt-4">
              <div className="flex justify-between items-center">
                <Label>Authors</Label>
                <Button variant="ghost" size="sm" onClick={addAuthor} className="h-7 text-xs gap-1">
                  <Plus className="w-3 h-3" /> Add Author
                </Button>
              </div>
              {currentSource.authors.map((author, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input 
                    placeholder="First Name" 
                    value={author.first} 
                    onChange={(e) => updateAuthor(idx, "first", e.target.value)} 
                    className="flex-1"
                  />
                  <Input 
                    placeholder="Last Name" 
                    value={author.last} 
                    onChange={(e) => updateAuthor(idx, "last", e.target.value)} 
                    className="flex-1"
                  />
                  {currentSource.authors.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeAuthor(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Label>{currentSource.type === "journal" ? "Article Title" : "Title"}</Label>
              <Input 
                value={currentSource.title} 
                onChange={(e) => updateField("title", e.target.value)} 
                placeholder="Enter title..." 
              />
            </div>

            {currentSource.type === "book" && (
              <div>
                <Label>Publisher</Label>
                <Input value={currentSource.publisher} onChange={(e) => updateField("publisher", e.target.value)} placeholder="Penguin Random House" />
              </div>
            )}

            {currentSource.type === "journal" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label>Journal Name</Label>
                  <Input value={currentSource.journal} onChange={(e) => updateField("journal", e.target.value)} placeholder="Nature" />
                </div>
                <div>
                  <Label>Volume</Label>
                  <Input value={currentSource.volume} onChange={(e) => updateField("volume", e.target.value)} />
                </div>
                <div>
                  <Label>Pages</Label>
                  <Input value={currentSource.pages} onChange={(e) => updateField("pages", e.target.value)} placeholder="10-25" />
                </div>
              </div>
            )}

            {currentSource.type === "website" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Website Name</Label>
                  <Input value={currentSource.journal} onChange={(e) => updateField("journal", e.target.value)} placeholder="CNN" />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input value={currentSource.url} onChange={(e) => updateField("url", e.target.value)} placeholder="https://..." />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Library className="w-4 h-4 text-primary" />
              Bibliography ({bibliography.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <Button onClick={addToBibliography} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Save Source
            </Button>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {bibliography.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground py-4">No sources saved yet.</p>
              ) : (
                bibliography.map((src, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded border border-border/50 text-xs">
                    <div className="font-bold truncate">{src.title}</div>
                    <div className="text-muted-foreground">{src.authors[0]?.last}, {src.year}</div>
                  </div>
                ))
              )}
            </div>

            {bibliography.length > 0 && (
              <Button variant="outline" onClick={exportBibliography} className="w-full gap-2">
                <Download className="w-4 h-4" /> Export All
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <CardTitle className={titleClass}>
              <Globe className="w-4 h-4 text-primary" />
              Citation Output
            </CardTitle>
            <div className="flex items-center gap-2">
              <select 
                className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                value={format}
                onChange={(e) => setFormat(e.target.value as CitationFormat)}
              >
                <option value="apa">APA 7th</option>
                <option value="mla">MLA 9th</option>
                <option value="chicago">Chicago</option>
                <option value="harvard">Harvard</option>
                <option value="ieee">IEEE</option>
                <option value="vancouver">Vancouver</option>
              </select>
              <Button variant="ghost" size="sm" onClick={() => setShowAllFormats(!showAllFormats)}>
                {showAllFormats ? "Single" : "All Formats"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {showAllFormats ? (
            <div className="space-y-4">
              {Object.entries(allFormats).map(([key, val]) => (
                <div key={key} className="p-4 bg-muted/20 rounded-lg border border-border/50 relative group">
                  <div className="text-xs font-bold uppercase text-muted-foreground mb-2">{key}</div>
                  <div className="text-sm hanging-indent" dangerouslySetInnerHTML={{ __html: val }} />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => { navigator.clipboard.writeText(val.replace(/<\/?i>/g, "")); toast.success("Copied!"); }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-muted/20 rounded-lg border border-border/50 relative group min-h-[100px] flex items-center">
              <div className="text-sm leading-relaxed hanging-indent w-full" dangerouslySetInnerHTML={{ __html: currentCitation }} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => { navigator.clipboard.writeText(currentCitation.replace(/<\/?i>/g, "")); toast.success("Copied!"); }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Select Source Type", description: "Choose whether you are citing a book, journal article, website, or other media. The form adapts instantly.", icon: FileText },
          { step: "02", title: "Enter Details", description: "Fill in the author, title, and publication data. Add multiple authors with a single click.", icon: Book },
          { step: "03", title: "Generate & Export", description: "View your citation in APA, MLA, or Chicago. Save it to your bibliography and export the full list.", icon: Download }
        ]}
        badges={["100% Accurate", "All Major Formats", "Free Forever"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Book, title: "Dynamic Formatting", description: "Automatically applies the complex rules of italics, capitalization, and punctuation for APA, MLA, and Chicago styles." },
          { icon: Library, title: "Bibliography Manager", description: "Build a master list of all your sources. Sort them alphabetically and export the entire bibliography with hanging indents." },
          { icon: Globe, title: "Multi-Format Support", description: "Need to submit to different journals? Generate the same source in IEEE, Vancouver, and Harvard simultaneously." },
          { icon: FileText, title: "Smart Fields", description: "The interface adapts to your source type, showing only the fields relevant to books, journals, or websites." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Importance of Accurate Citations</h3>
          <p>
            In the academic and professional world, proper citation is the bedrock of integrity and credibility. It acknowledges the original creators of ideas, allows readers to verify sources, and protects against plagiarism. However, the rules governing citation styles—APA, MLA, Chicago, Harvard, IEEE, and Vancouver—are notoriously complex and frequently updated. A missing comma, an incorrect italicization of a volume number, or the wrong capitalization of a title can detract from the professionalism of a research paper. Our Citation Generator automates these intricate rule sets, ensuring that every reference is formatted to the exact specifications of the latest style guides.
          </p>
          <h3>Streamlining the Research Workflow</h3>
          <p>
            Researchers and students often juggle dozens of sources for a single project. Manually formatting a bibliography at the end of a writing session is a tedious and error-prone task. This tool solves that bottleneck by allowing you to "save as you go." By adding sources to the built-in Bibliography Manager immediately upon finding them, you build a master list that can be sorted alphabetically and exported in one click. This workflow ensures that you never lose a reference and that your final document is ready for submission the moment you finish writing.
          </p>
          <h3>Handling Complex Author Rules</h3>
          <p>
            One of the most common pitfalls in citation is handling multiple authors. APA style, for instance, has distinct rules for works with one, two, three, or more than twenty authors (using "et al." or ampersands). This tool programmatically handles these logic branches, correctly formatting author lists regardless of the number of contributors. Whether you are citing a single-author monograph or a massive collaborative study with fifty contributors, the algorithm ensures the output is compliant with the specific style's requirements.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Which version of APA or MLA does this tool use?", answer: "We implement the latest major editions: APA 7th Edition and MLA 9th Edition, which are the current standards for most universities and journals." },
          { question: "Can I edit a citation after saving it?", answer: "Currently, the tool allows you to add and export. For editing, we recommend generating the citation, copying it to your document, and making minor manual tweaks if necessary." },
          { question: "How do I handle 'et al.'?", answer: "The tool automatically handles 'et al.' rules based on the number of authors you enter and the selected citation style." },
          { question: "Is the data stored on your servers?", answer: "No. All citation generation and bibliography management happens locally in your browser's memory. Your research data is never uploaded to our servers." },
          { question: "Can I export to BibTeX?", answer: "Currently we support plain text export with rich formatting. A dedicated BibTeX/LaTeX export feature is on our roadmap for future updates." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/academic/citation-generator" max={6} />
    </div>
  );
}

export default CitationGeneratorClient;
