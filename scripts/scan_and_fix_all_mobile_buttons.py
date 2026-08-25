import os
import re

TOOLS_DIR = r"c:\Users\LOQ\toolflux\components\tools"

def scan_and_fix():
    print("[+] Scanning all tool components for mobile button cutoffs and non-wrapping containers...")
    
    modified_count = 0
    checked_files = 0
    
    for root, dirs, files in os.walk(TOOLS_DIR):
        for file in files:
            if not file.endswith(".tsx"):
                continue
            
            filepath = os.path.join(root, file)
            checked_files += 1
            
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            # Pattern 1: <div className="flex items-center gap-2 w-full lg:w-auto"> wrapping select + button
            content = re.sub(
                r'className="flex items-center gap-2 w-full lg:w-auto"',
                r'className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto"',
                content
            )
            
            # Pattern 2: Fixed width select in flex row with long buttons without wrap
            content = re.sub(
                r'className="flex items-center gap-2 w-full sm:w-auto"',
                r'className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto"',
                content
            )
            
            # Pattern 3: Buttons with flex-1 inside fixed non-wrapping flex-row that squeeze
            content = re.sub(
                r'className="flex items-center justify-between gap-4 border-b border-border/60 pb-4"',
                r'className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border/60 pb-4"',
                content
            )

            # Pattern 4: Bottom export bars: <div className="flex items-center gap-3"> with wide buttons
            content = re.sub(
                r'className="flex items-center gap-3 w-full"',
                r'className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"',
                content
            )

            # Pattern 5: select + button inline where select has text like 'WAV' or format and button has long text
            content = re.sub(
                r'className="flex items-center gap-2">(\s*<select[\s\S]*?<\/select>\s*<Button[\s\S]*?<\/Button>\s*)<\/div>',
                r'className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">\1</div>',
                content
            )

            if content != original_content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                modified_count += 1
                rel_path = os.path.relpath(filepath, TOOLS_DIR)
                print(f"  [FIXED] {rel_path}")

    print(f"\n[DONE] Scan complete! Checked {checked_files} tool components. Modified {modified_count} files.")

if __name__ == "__main__":
    scan_and_fix()
