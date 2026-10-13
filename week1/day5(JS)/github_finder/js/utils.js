// Reusable helper: clean and format text
export function sanitizeText(text, fallback = "") {
  if (!text) return fallback;
  return text.trim();
}
