/**
 * Capitalizes the first character of a string
 * Example: capitalize("javascript") -> "Javascript"
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string into a URL slug
 * Example: slugify("Hello World!") -> "hello-world"
 */
export const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // Remove special characters like ! ? @
    .replace(/[\s_-]+/g, "-")    // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, "");    // Remove leading and trailing hyphens
};

/**
 * Truncates a string to n characters and adds "..." if longer
 * Example: truncate("Hello World", 5) -> "Hello..."
 */
export const truncate = (str, n) => {
  if (!str) return "";
  return str.length > n ? str.slice(0, n) + "..." : str;
};
