// Cloudflare Pages Function — POST /api/contact
// Requires a KV namespace bound as FORMS_KV (Pages project → Settings →
// Functions → KV namespace bindings). Submissions are stored as
// contact:<timestamp>:<uuid> keys, one JSON record each.

import { cleanPayload, jsonResponse } from "../_lib/validate.js";

const REQUIRED = ["name", "email", "service", "message"];
const FIELDS = [...REQUIRED, "company", "phone", "budget", "timeline"];
const MAX_LEN = {
  name: 120, company: 160, email: 160, phone: 40,
  service: 80, budget: 60, timeline: 60, message: 4000,
};

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const { cleaned, error } = cleanPayload(payload, FIELDS, REQUIRED, MAX_LEN);
  if (error) return jsonResponse({ ok: false, error }, 400);

  cleaned.submitted_at = new Date().toISOString();

  if (env.FORMS_KV) {
    const key = `contact:${Date.now()}:${crypto.randomUUID()}`;
    await env.FORMS_KV.put(key, JSON.stringify(cleaned));
  }

  return jsonResponse({ ok: true });
}
