import os

def enhance_word_counter():
    path = r"c:\Users\LOQ\toolflux\components\tools\text\word-counter-client.tsx"
    content = open(path, "r", encoding="utf-8").read()

    # Add imports
    imports = '\nimport { ShareResultButton } from "@/components/shared/share-result-modal";\nimport { EmbedButton } from "@/components/shared/embed-modal";\n'
    content = content.replace('import { GlassCard } from "@/components/ui/glass-card";', 'import { GlassCard } from "@/components/ui/glass-card";' + imports)

    # Add action buttons below metrics grid
    target = '</CardContent>\n </Card>)}'
    replacement = '''</CardContent>
 </Card>)}
 </div>

 <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-card/60 border border-border/70">
   <div className="flex items-center gap-2">
     <ShareResultButton
       toolTitle="Word Counter"
       resultTitle={`${stats.words} Words • ${stats.chars} Characters`}
       resultSummary={`Document reading time ~${stats.readingTime} min, speaking time ~${stats.speakingTime} min.`}
       resultMetrics={[
         { label: "Words", value: stats.words },
         { label: "Characters", value: stats.chars },
         { label: "Sentences", value: stats.sentences },
         { label: "Reading Time", value: `${stats.readingTime} min` },
       ]}
       variant="default"
       className="h-10 px-4"
     />
     <EmbedButton
       toolPath="/tools/text/word-counter"
       toolTitle="Word Counter"
       className="h-10 px-4"
     />
   </div>
   <span className="text-xs text-muted-foreground">Real-time character & keyword density calculator</span>'''

    if target in content:
        content = content.replace(target, replacement)
        open(path, "w", encoding="utf-8").write(content)
        print("✅ Word counter enhanced!")
    else:
        # try without strict newline
        print("Searching alternative insertion for word counter...")
        if 'statItems.map(item => <Card' in content:
            # find end of the statItems mapping div
            idx = content.find('{statItems.map')
            close_div = content.find('</div>', idx)
            insert_point = close_div + len('</div>')
            snippet = '''\n\n <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-card/60 border border-border/70">
   <div className="flex items-center gap-2">
     <ShareResultButton
       toolTitle="Word Counter"
       resultTitle={`${stats.words} Words • ${stats.chars} Characters`}
       resultSummary={`Document reading time ~${stats.readingTime} min, speaking time ~${stats.speakingTime} min.`}
       resultMetrics={[
         { label: "Words", value: stats.words },
         { label: "Characters", value: stats.chars },
         { label: "Sentences", value: stats.sentences },
         { label: "Reading Time", value: `${stats.readingTime} min` },
       ]}
       variant="default"
       className="h-10 px-4"
     />
     <EmbedButton
       toolPath="/tools/text/word-counter"
       toolTitle="Word Counter"
       className="h-10 px-4"
     />
   </div>
   <span className="text-xs text-muted-foreground">Real-time character & keyword density calculator</span>
 </div>'''
            content = content[:insert_point] + snippet + content[insert_point:]
            open(path, "w", encoding="utf-8").write(content)
            print("✅ Word counter enhanced (alternative)!")

enhance_word_counter()
