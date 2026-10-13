/**
 * Splits an array into chunks of the specified size
 * Example: chunk([1, 2, 3, 4, 5], 2) -> [[1, 2], [3, 4], [5]]
 */
export const chunk = (arr, size = 1) => {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

/**
 * Removes duplicate values from an array
 * Example: unique([1, 2, 2, 3, 4, 4]) -> [1, 2, 3, 4]
 */
export const unique = (arr) => {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
};

/**
 * Groups an array of objects by a property key
 * Example: groupBy([{ name: "Ali", team: "A" }, { name: "Sara", team: "B" }, { name: "Zaid", team: "A" }], "team")
 * Output: { A: [{...}, {...}], B: [{...}] }
 */
export const groupBy = (arr, key) => {
  if (!Array.isArray(arr)) return {};
  return arr.reduce((acc, item) => {
    const groupKey = typeof key === "function" ? key(item) : item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};
