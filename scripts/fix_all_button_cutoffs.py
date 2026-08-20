import os
import re

def fix_utm_builder():
    path = r"c:\Users\LOQ\toolflux\components\tools\url\utm-builder-client.tsx"
    content = open(path, "r", encoding="utf-8").read()
    
    # Add ShareResultButton import if not present
    if "ShareResultButton" not in content:
        content = content.replace(
            'import { Link2, Copy',
            'import { ShareResultButton } from "@/components/shared/share-result-modal";\nimport { Link2, Copy'
        )

    # Fix the Copy Tagged URL + Save button container
    target = '''                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 rounded-xl shadow-md shadow-primary/20" onClick={() => handleCopy(generatedUrl)} disabled={generatedUrl === "Invalid Base URL"}>
                      <Copy className="w-4 h-4 mr-2" /> Copy Tagged URL
                    </Button>
                    <Button variant="outline" onClick={saveToHistory} className="h-11 rounded-xl border-border font-bold text-xs">
                      <History className="w-4 h-4 mr-1.5" /> Save
                    </Button>
                  </div>'''

    replacement = '''                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button
                      className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 rounded-xl shadow-md shadow-primary/20 text-xs sm:text-sm gap-1.5"
                      onClick={() => handleCopy(generatedUrl)}
                      disabled={generatedUrl === "Invalid Base URL"}
                    >
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Copy Tagged URL</span>
                    </Button>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={saveToHistory}
                        className="flex-1 sm:flex-none h-11 rounded-xl border-border font-semibold text-xs gap-1.5"
                      >
                        <History className="w-4 h-4 shrink-0" />
                        <span>Save</span>
                      </Button>
                      <ShareResultButton
                        toolTitle="UTM Campaign Builder"
                        resultTitle={generatedUrl}
                        resultSummary={`Campaign: ${campaign || "default"} • Source: ${source || "custom"}`}
                        resultMetrics={[
                          { label: "Source", value: source || "none" },
                          { label: "Medium", value: medium || "none" },
                          { label: "Campaign", value: campaign || "none" },
                        ]}
                        variant="secondary"
                        className="flex-1 sm:flex-none h-11"
                      />
                    </div>
                  </div>'''

    if target in content:
        content = content.replace(target, replacement)
        open(path, "w", encoding="utf-8").write(content)
        print("✅ Fixed UTM Builder action buttons!")
    else:
        # regex replace
        pattern = r'<div className="flex gap-2">\s*<Button className="flex-1[\s\S]*?</div>\s*</div>'
        # let's find it
        m = re.search(r'<div className="flex gap-2">\s*<Button className="flex-1 bg-primary[^>]*>[\s\S]*?</div>', content)
        if m:
            content = content[:m.start()] + replacement + content[m.end():]
            open(path, "w", encoding="utf-8").write(content)
            print("✅ Fixed UTM Builder action buttons (regex)!")
        else:
            print("❌ Could not find UTM button block")

def fix_other_button_cutoffs():
    # 1. Link Expand
    path = r"c:\Users\LOQ\toolflux\components\tools\url\link-expand-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-3">',
            '<div className="flex flex-col sm:flex-row gap-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Link Expand")

    # 2. Placeholder Generator
    path = r"c:\Users\LOQ\toolflux\components\tools\image\placeholder-generator-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-2 pt-2">',
            '<div className="flex flex-col sm:flex-row gap-2 pt-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Placeholder Generator")

    # 3. Meme Generator
    path = r"c:\Users\LOQ\toolflux\components\tools\image\meme-generator-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-2 pt-4">',
            '<div className="flex flex-col sm:flex-row gap-2 pt-4 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Meme Generator")

    # 4. Flashcards
    path = r"c:\Users\LOQ\toolflux\components\tools\productivity\flashcards-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-3 pt-2">',
            '<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Flashcards")

    # 5. Sleep Planner
    path = r"c:\Users\LOQ\toolflux\components\tools\health\sleep-planner-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-4">',
            '<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Sleep Planner")

    # 6. Sleep Calculator
    path = r"c:\Users\LOQ\toolflux\components\tools\health\sleep-calculator-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-2">',
            '<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Sleep Calculator")

    # 7. Packing Weight
    path = r"c:\Users\LOQ\toolflux\components\tools\travel\packing-weight-client.tsx"
    if os.path.exists(path):
        c = open(path, "r", encoding="utf-8").read()
        c = c.replace(
            '<div className="flex gap-2 mt-2">',
            '<div className="grid grid-cols-2 gap-2 mt-2 w-full">'
        )
        open(path, "w", encoding="utf-8").write(c)
        print("✅ Fixed Packing Weight")

fix_utm_builder()
fix_other_button_cutoffs()
