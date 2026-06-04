#!/usr/bin/env python3
"""
Optimize product photos for the website (sofas, fridges, …).

For a product prefix like "sofa" or "fridge", this pairs files by number and
writes web-ready WebP files plus tiny blur-up placeholders:

    public/<prefix>s/<prefix>-00N-enhanced.webp     (from the cleaned photo)
    public/<prefix>s/<prefix>-00N-original-1.webp   (from the real photo, -2, -3 ...)
    src/lib/<prefix>-lqip.json                       (blur placeholders)

It finds a file for number N as long as the name contains "<prefix>N", so these
all work:  sofa1.png · sofa1 original.jpeg · fridge2.png · original fridge2.jpeg

Usage:
    pip install Pillow
    python scripts/optimize-images.py <prefix> "<cleaned folder>" "<original folder>"

Example:
    python scripts/optimize-images.py fridge "D:/.../cleaned photos" "D:/.../original photos"

Then add matching entries to src/lib/<prefix>s.ts (see src/components/sofas/README.md).
"""
import sys, os, io, json, base64, re, glob
from PIL import Image

MAXW = 1400
QUALITY = 82
LQIP_W = 24

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fit(im):
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    return im


def save_webp(im, path):
    im.convert("RGB").save(path, "WEBP", quality=QUALITY, method=6)


def lqip(im):
    h = max(1, round(im.height * LQIP_W / im.width))
    t = im.convert("RGB").resize((LQIP_W, h), Image.LANCZOS)
    buf = io.BytesIO()
    t.save(buf, "WEBP", quality=35, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def find(folder, prefix, n):
    """Files in `folder` whose name contains '<prefix>N' (number not part of a larger one)."""
    pat = re.compile(rf"{re.escape(prefix)}0*{n}(\D|$)", re.I)
    return sorted(p for p in glob.glob(os.path.join(folder, "*")) if pat.search(os.path.basename(p)))


def main(prefix, clean_dir, orig_dir):
    out = os.path.join(ROOT, "public", f"{prefix}s")
    lqip_json = os.path.join(ROOT, "src", "lib", f"{prefix}-lqip.json")
    os.makedirs(out, exist_ok=True)
    meta = json.load(open(lqip_json)) if os.path.exists(lqip_json) else {}

    n = 1
    while True:
        cleaned = find(clean_dir, prefix, n)
        originals = find(orig_dir, prefix, n)
        if not cleaned and not originals:
            break
        pid = f"{prefix}-{n:03d}"
        if cleaned:
            e = Image.open(cleaned[0])
            save_webp(fit(e), os.path.join(out, f"{pid}-enhanced.webp"))
            meta[pid] = {"lqip": lqip(e)}
        for i, op in enumerate(originals, start=1):
            o = Image.open(op)
            save_webp(fit(o), os.path.join(out, f"{pid}-original-{i}.webp"))
            if pid not in meta:  # no enhanced photo → placeholder from the real one
                meta[pid] = {"lqip": lqip(o)}
        print(f"{pid}: {len(cleaned)} enhanced, {len(originals)} original")
        n += 1

    json.dump(meta, open(lqip_json, "w"))
    print(f"Done. Placeholders written to {lqip_json}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2], sys.argv[3])
