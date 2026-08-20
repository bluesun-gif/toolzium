import os
import re

def fix_buttons():
    # 1. json-formatter-client.tsx
    json_path = r"c:\Users\LOQ\toolflux\components\tools\developer\json-formatter-client.tsx"
    if os.path.exists(json_path):
        content = open(json_path, "r", encoding="utf-8").read()
        content = content.replace(
            '<Button onClick={handleSample} className="text-primary hover:underline">Load sample</Button>',
            '<Button variant="ghost" size="sm" onClick={handleSample} className="h-7 text-xs font-semibold text-primary hover:bg-primary/10">Load Sample JSON</Button>'
        )
        open(json_path, "w", encoding="utf-8").write(content)
        print("Fixed json-formatter-client.tsx")

    # 2. base64-encoder-client.tsx
    b64_path = r"c:\Users\LOQ\toolflux\components\tools\developer\base64-encoder-client.tsx"
    if os.path.exists(b64_path):
        content = open(b64_path, "r", encoding="utf-8").read()
        content = content.replace(
            '<Button onClick={handleClear} className="hover:text-primary">Clear</Button>',
            '<Button variant="ghost" size="sm" onClick={handleClear} className="h-7 text-xs text-muted-foreground hover:text-destructive">Clear</Button>'
        )
        open(b64_path, "w", encoding="utf-8").write(content)
        print("Fixed base64-encoder-client.tsx")

fix_buttons()
