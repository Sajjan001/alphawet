/* ==========================================================================
   AlphaWetAI — minimal hand-built line-icon set (24x24, stroke-based)
   ========================================================================== */

const ICON_PATHS = {
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z"/>',
  automation: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 7l7.5 8M16 7L9 15M6 8.4V15M18 8.4V15"/>',
  leads: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
  chatbot: '<rect x="4" y="5" width="16" height="12" rx="4"/><path d="M9 21l2.5-4h1L15 21M9 10.5h.01M15 10.5h.01M9 14c1 1 5 1 6 0"/>',
  ecommerce: '<path d="M4 6h2l1.6 10.2A2 2 0 0 0 9.6 18h7a2 2 0 0 0 2-1.6L20 8H7"/><circle cx="10" cy="21" r="1.3"/><circle cx="17" cy="21" r="1.3"/>',
  marketing: '<path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>',
  software: '<rect x="3.5" y="4.5" width="17" height="12" rx="2"/><path d="M8 21h8M12 16.5V21M8.5 9l-2 2 2 2M15.5 9l2 2-2 2"/>',
  genai: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="M5 15l.6 1.7L7.3 17l-1.7.6L5 19.3l-.6-1.7L2.7 17l1.7-.6z"/>',
  rag: '<path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M14 4v4h4"/><circle cx="10.5" cy="14" r="2.4"/><path d="M12.4 15.8L15 18.5"/>',
  agent: '<rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 8V5M9.5 5h5"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M3 13v2M21 13v2"/>',
  analytics: '<path d="M4 20V4M4 20h16"/><rect x="7" y="13" width="2.6" height="7"/><rect x="12" y="9" width="2.6" height="11"/><rect x="17" y="6" width="2.6" height="14"/>',
  ml: '<circle cx="6" cy="7" r="1.8"/><circle cx="6" cy="17" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="18" cy="6" r="1.8"/><circle cx="18" cy="18" r="1.8"/><path d="M7.5 8.2L10.6 11M7.5 15.8L10.6 13M13.6 11.2L16.5 7.3M13.6 12.9L16.5 16.6"/>',
  vision: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  nlp: '<rect x="8.5" y="3" width="7" height="12" rx="3.5"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
  integration: '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.8 10.6L15.2 7.4M8.8 13.4L15.2 16.6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
  trending: '<path d="M3 17l6-6 4 4 8-9M21 6v5M21 6h-5"/>',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18"/>',
  layers: '<path d="M12 3l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-5-5"/>',
  clipboard: '<rect x="6" y="4.5" width="12" height="16" rx="2"/><rect x="9" y="3" width="6" height="3" rx="1"/><path d="M9 12h6M9 16h6"/>',
  hammer: '<path d="M14.5 6.5l3 3L9 18H6v-3z"/><path d="M13 5l1.5-1.5 4 4L17 9"/>',
  checkcircle: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.3 2.3L16 9.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.7-9C.7 7.4 2.3 4 6 4c2 0 3.5 1.1 4.5 2.5C11.5 5.1 13 4 15 4c3.7 0 5.3 3.4 3.7 7-2.2 4.4-9.7 9-9.7 9z"/>',
  industry: '<path d="M3 20V10l5 3v-3l5 3V6l5 3v11z"/><path d="M3 20h18"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6.5 8-6.5"/>',
  phone: '<path d="M6.5 3.5h3L11 8l-2 1.5a12 12 0 0 0 5.5 5.5L16 13l4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"/>',
  whatsapp: '<path d="M7 17.5L4 20l2.6-2.9A8 8 0 1 1 9.8 19z"/><path d="M9 9.6c0 3.4 2.9 6.3 6.3 6.3 0 0 1-.1 1.2-1.4.1-.7-1.7-1.6-2.1-1.7-.3-.1-.6 0-.8.3l-.5.7c-1.1-.5-2-1.4-2.5-2.5l.7-.5c.3-.2.4-.5.3-.8-.1-.4-1-2.2-1.7-2.1-1.3.2-1.4 1.2-1.4 1.2z"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M7.5 10v6.5M7.5 7.4v.01M12 16.5V12.8c0-1.3.9-2.3 2.2-2.3s2.3 1 2.3 2.3v3.7"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  location: '<path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
};

function icon(name, cls) {
  const path = ICON_PATHS[name] || ICON_PATHS.sparkle;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${cls || ""}" aria-hidden="true">${path}</svg>`;
}
