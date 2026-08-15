// Cloudflare Pages Function — POST /api/careers/apply
// Requires a KV namespace bound as FORMS_KV (same binding used by
// /api/contact). Submissions are stored as application:<timestamp>:<uuid>.

import { cleanPayload, jsonResponse } from "../../_lib/validate.js";

const REQUIRED = ["name", "email", "position", "resume_link"];
const FIELDS = [...REQUIRED, "phone", "message"];
const MAX_LEN = {
  name: 120, email: 160, phone: 40,
  position: 120, resume_link: 500, message: 2000,
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
    const key = `application:${Date.now()}:${crypto.randomUUID()}`;
    await env.FORMS_KV.put(key, JSON.stringify(cleaned));
  }

  return jsonResponse({ ok: true });
}
