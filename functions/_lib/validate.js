// Shared validation for the form Functions. Files/dirs prefixed with "_" are
// not routable by Cloudflare Pages, so this is safe to import from elsewhere.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function cleanPayload(payload, allFields, requiredFields, maxLen) {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid request body." };
  }

  const cleaned = {};
  for (const field of allFields) {
    const raw = payload[field] == null ? "" : String(payload[field]).trim();
    cleaned[field] = raw.slice(0, maxLen[field] ?? 200);
  }

  const missing = requiredFields.filter((f) => !cleaned[f]);
  if (missing.length) {
    return { error: `Missing required field(s): ${missing.join(", ")}` };
  }

  if ("email" in cleaned && !EMAIL_RE.test(cleaned.email)) {
    return { error: "Please provide a valid email address." };
  }

  return { cleaned };
}

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
