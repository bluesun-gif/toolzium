"""
Resolve ALL git merge conflict markers in .tsx/.ts files.
Strategy: Keep the HEAD (<<<<<<< HEAD) section = Hermes's premium layout.
Discard the stash section (======= to >>>>>>>).
"""
import os, re, sys

def resolve_conflicts_keep_head(content):
    """Remove conflict markers, keeping only the HEAD (top) section."""
    # Pattern: <<<<<<< HEAD \n [keep this] \n ======= \n [discard this] \n >>>>>>> ...
    pattern = re.compile(
        r'<<<<<<< .*?\n(.*?)=======\n.*?>>>>>>> .*?\n',
        re.DOTALL
    )
    resolved = pattern.sub(r'\1', content)
    return resolved

ROOT = r"C:\Users\LOQ\toolflux"
EXTENSIONS = ('.tsx', '.ts')
SKIP_DIRS = {'node_modules', '.next', '.git', 'scratch'}

fixed = 0
clean = 0
errors = []

for dirpath, dirnames, filenames in os.walk(ROOT):
    # Skip unwanted directories
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    
    for fname in filenames:
        if not fname.endswith(EXTENSIONS):
            continue
        fpath = os.path.join(dirpath, fname)
        try:
            with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            
            if '<<<<<<< HEAD' not in content and '<<<<<<< ' not in content:
                clean += 1
                continue
            
            resolved = resolve_conflicts_keep_head(content)
            
            # Verify no markers remain
            if '<<<<<<< ' in resolved or '=======' in resolved or '>>>>>>> ' in resolved:
                # Try a more aggressive pattern
                resolved = re.sub(r'<<<<<<< .*?\n', '', resolved)
                resolved = re.sub(r'=======\n', '', resolved)
                resolved = re.sub(r'>>>>>>> .*?\n', '', resolved)
            
            if resolved != content:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(resolved)
                rel = os.path.relpath(fpath, ROOT)
                print(f"[FIXED] {rel}")
                fixed += 1
            else:
                clean += 1
        except Exception as e:
            errors.append(f"{fpath}: {e}")

print(f"\n=== DONE ===")
print(f"Fixed: {fixed}")
print(f"Already clean: {clean}")
if errors:
    print(f"Errors: {len(errors)}")
    for e in errors[:10]:
        print(f"  {e}")
