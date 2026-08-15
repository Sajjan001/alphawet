"""
AlphaWetAI — Flask app.

Serves the marketing site (templates/index.html) and a small JSON API for the
contact form. Submissions are appended to data/submissions.jsonl so nothing
is lost even without an email/CRM integration configured yet.

To wire up real delivery (email / CRM / Slack), extend `save_submission()`
in this file — the validated payload is already assembled there.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

DATA_DIR = Path(__file__).parent / "data"
SUBMISSIONS_FILE = DATA_DIR / "submissions.jsonl"
APPLICATIONS_FILE = DATA_DIR / "applications.jsonl"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

CONTACT_REQUIRED = ["name", "email", "service", "message"]
CONTACT_FIELDS = CONTACT_REQUIRED + ["company", "phone", "budget", "timeline"]
CONTACT_MAX_LEN = {
    "name": 120, "company": 160, "email": 160, "phone": 40,
    "service": 80, "budget": 60, "timeline": 60, "message": 4000,
}

APPLY_REQUIRED = ["name", "email", "position", "resume_link"]
APPLY_FIELDS = APPLY_REQUIRED + ["phone", "message"]
APPLY_MAX_LEN = {
    "name": 120, "email": 160, "phone": 40,
    "position": 120, "resume_link": 500, "message": 2000,
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/industries")
def industries():
    return render_template("industries.html")


@app.route("/careers")
def careers():
    return render_template("careers.html")


@app.route("/api/contact", methods=["POST"])
def api_contact():
    cleaned, error = clean_payload(request.get_json(silent=True), CONTACT_FIELDS, CONTACT_REQUIRED, CONTACT_MAX_LEN)
    if error:
        return jsonify(ok=False, error=error), 400

    cleaned["submitted_at"] = datetime.now(timezone.utc).isoformat()
    append_jsonl(SUBMISSIONS_FILE, cleaned)
    return jsonify(ok=True)


@app.route("/api/careers/apply", methods=["POST"])
def api_careers_apply():
    cleaned, error = clean_payload(request.get_json(silent=True), APPLY_FIELDS, APPLY_REQUIRED, APPLY_MAX_LEN)
    if error:
        return jsonify(ok=False, error=error), 400

    cleaned["submitted_at"] = datetime.now(timezone.utc).isoformat()
    append_jsonl(APPLICATIONS_FILE, cleaned)
    return jsonify(ok=True)


def clean_payload(payload, all_fields, required_fields, max_len):
    if not isinstance(payload, dict):
        return None, "Invalid request body."

    cleaned = {}
    for field in all_fields:
        value = str(payload.get(field, "")).strip()
        cleaned[field] = value[: max_len.get(field, 200)]

    missing = [f for f in required_fields if not cleaned[f]]
    if missing:
        return None, f"Missing required field(s): {', '.join(missing)}"

    if "email" in cleaned and not EMAIL_RE.match(cleaned["email"]):
        return None, "Please provide a valid email address."

    return cleaned, None


def append_jsonl(path: Path, record: dict) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
