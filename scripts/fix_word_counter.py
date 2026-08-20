import re

def fix_word_counter():
    path = r"c:\Users\LOQ\toolflux\components\tools\text\word-counter-client.tsx"
    
    # Read fresh from git if needed or clean up
    os.system("git checkout components/tools/text/word-counter-client.tsx")
    content = open(path, "r", encoding="utf-8").read()
    
    # Add imports
    content = content.replace(
        'import { GlassCard } from "@/components/ui/glass-card";',
        'import { GlassCard } from "@/components/ui/glass-card";\nimport { ShareResultButton } from "@/components/shared/share-result-modal";\nimport { EmbedButton } from "@/components/shared/embed-modal";'
    )
    
    # Insert after </Card>)} \n </div>
    target = '</CardContent>\n </Card>)}'
    
    # Let's find </Card>)} \n </div>
    pattern = r'(\{statItems\.map\(item => <Card[\s\S]*?</Card>\)\}\s*\n\s*</div>)'
    
    replacement = r'''\1

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
   <span className="text-xs text-muted-foreground">Real-time character & keyword density calculator</span>
 </div>'''

    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        open(path, "w", encoding="utf-8").write(new_content)
        print("FIXED word-counter-client.tsx")
    else:
        print("Regex did not match for word-counter-client.tsx")

import os
fix_word_counter()
