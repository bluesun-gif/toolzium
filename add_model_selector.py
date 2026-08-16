#!/usr/bin/env python3
"""
Hermes: Add model selector to all AI tools that call /api/ai/generate.

For each tool client file:
 1. Add import for ModelSelector (after first "use client" / react import block)
 2. Add `const [model, setModel] = useState("gpt4o");` after the first useState
 3. Inject <ModelSelector value={model} onChange={setModel} /> into the first
    input card area (before the first <GlassCard or <Card content)
 4. Add `model` to the fetch body JSON.stringify({...})

Tolerant matching — skips a file if a step can't be applied safely.
"""
import os, re, glob, json

TOOLS_DIR = "components/tools"
MODEL_IMPORT = 'import { ModelSelector } from "@/components/shared/model-selector";\n'

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    orig = src
    changed = False

    # 1. Add import if missing
    if "model-selector" not in src:
        # insert after the last import line that starts with 'import'
        # find the import block end
        lines = src.split("\n")
        insert_idx = None
        for i, line in enumerate(lines):
            if line.startswith("import ") and ('"@/components/shared' in line or '"react"' in line or "from \"react\"" in line):
                insert_idx = i
        if insert_idx is not None:
            lines.insert(insert_idx + 1, 'import { ModelSelector } from "@/components/shared/model-selector";')
            src = "\n".join(lines)
            changed = True

    # 2. Add model state if missing
    if "const [model, setModel]" not in src:
        # add after the first useState line
        m = re.search(r"(const \[[a-zA-Z]+, set[A-Za-z]+\] = useState[^\n]*\n)", src)
        if m:
            src = src[:m.end()] + '  const [model, setModel] = useState("gpt4o");\n' + src[m.end():]
            changed = True

    # 3. Add ModelSelector UI — inject before the first <GlassCard or <Card
    if "<ModelSelector" not in src:
        # Find first occurrence of <GlassCard or <Card (opening tag on its own)
        m = re.search(r"(\n\s*)(<GlassCard|<Card\b|<CardContent)", src)
        if m:
            indent = m.group(1)
            sel = f'{indent}<div className="mb-4">\n{indent}  <ModelSelector value={{model}} onChange={{setModel}} />\n{indent}</div>\n'
            src = src[:m.start()] + sel + src[m.start():]
            changed = True

    # 4. Add model to fetch body
    if "model:" not in src and '/api/ai/generate' in src:
        # find JSON.stringify({ ... prompt ... })
        # Add model to the object literal that contains `prompt,`
        m = re.search(r"(JSON\.stringify\(\{\s*\n)(.*?)(\n\s*\}\))", src, re.DOTALL)
        if m and "prompt" in m.group(2):
            # insert model after the prompt line
            body = m.group(2)
            # add model right after the prompt entry
            body = re.sub(r"(prompt[^\n]*\n)", r"\1            model,\n", body, count=1)
            src = src[:m.start()] + m.group(1) + body + m.group(3) + src[m.end():]
            changed = True

    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        return True
    return False

def main():
    files = []
    for root, dirs, fs in os.walk(TOOLS_DIR):
        for fn in fs:
            if fn.endswith("-client.tsx"):
                p = os.path.join(root, fn)
                with open(p, encoding="utf-8") as f:
                    c = f.read()
                if "/api/ai/generate" in c:
                    files.append(p)
    print(f"Found {len(files)} AI tools")
    done = 0
    for p in files:
        try:
            if process_file(p):
                done += 1
                print(f"  + {p}")
        except Exception as e:
            print(f"  ! ERROR {p}: {e}")
    print(f"Modified {done}/{len(files)} files")

if __name__ == "__main__":
    main()
