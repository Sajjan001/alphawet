"""
Static export for Cloudflare Pages.

Keep authoring the site the normal way (edit templates/*.html, static/js/*.js,
static/css/style.css, and run `python app.py` for local preview with live
Jinja rendering). Before deploying, run this script — it renders every route
through the real Flask app (so the output is byte-identical to local dev) and
writes plain .html files + a copy of static/ into dist/, which is what you
upload to Cloudflare Pages.

The two form endpoints (/api/contact, /api/careers/apply) are NOT part of
this export — Cloudflare Pages runs those as serverless Functions instead
(see functions/api/contact.js and functions/api/careers/apply.js), since
Cloudflare Pages has no Python/Flask runtime for the deployed site.

Usage:
    python build_static.py
"""

import shutil
from pathlib import Path

from app import app

ROOT = Path(__file__).parent
DIST = ROOT / "dist"

ROUTES = {
    "/": "index.html",
    "/about": "about.html",
    "/services": "services.html",
    "/industries": "industries.html",
    "/careers": "careers.html",
}


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    client = app.test_client()
    for route, filename in ROUTES.items():
        resp = client.get(route)
        if resp.status_code != 200:
            raise RuntimeError(f"Route {route} returned {resp.status_code}, expected 200")
        (DIST / filename).write_bytes(resp.data)
        print(f"  {route:<12} -> dist/{filename}")

    shutil.copytree(ROOT / "static", DIST / "static")
    print(f"  static/      -> dist/static/")

    print(f"\nDone. {len(ROUTES)} pages exported to {DIST}/")
    print("Upload the dist/ folder to Cloudflare Pages (functions/ stays at the project root, not inside dist/).")


if __name__ == "__main__":
    main()
