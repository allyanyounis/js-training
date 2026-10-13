import {
  capitalize,
  slugify,
  truncate,
  chunk,
  unique,
  groupBy,
  once,
  memoize,
  debounce
} from "./index.js";

console.log("=== 1. STRING UTILITIES ===");
console.log("capitalize('javascript') :", capitalize("javascript"));
console.log("slugify('Hello World!')   :", slugify("Hello World!"));
console.log("truncate('Hello World', 5):", truncate("Hello World", 5));

console.log("\n=== 2. ARRAY UTILITIES ===");
console.log("chunk([1,2,3,4,5], 2)     :", chunk([1, 2, 3, 4, 5], 2));
console.log("unique([1,2,2,3,4,4,1])   :", unique([1, 2, 2, 3, 4, 4, 1]));

const students = [
  { name: "Ali", class: "A" },
  { name: "Sara", class: "B" },
  { name: "Ahmed", class: "A" },
  { name: "Hina", class: "B" }
];
console.log("groupBy(students, 'class') :", groupBy(students, "class"));

console.log("\n=== 3. FUNCTION UTILITIES ===");

// 1. Testing once()
const initializeApp = once(() => "Database connection established!");
console.log("Call 1:", initializeApp());
console.log("Call 2 (should not re-run):", initializeApp());

// 2. Testing memoize()
let computeCount = 0;
const expensiveSquare = memoize((n) => {
  computeCount++;
  return n * n;
});
console.log("Square 5 (computed):", expensiveSquare(5), `(Executions: ${computeCount})`);
console.log("Square 5 (cached)  :", expensiveSquare(5), `(Executions: ${computeCount})`);

// 3. Testing debounce()
console.log("\nTesting debounce (waiting 300ms)...");
const logSearch = debounce((query) => {
  console.log(`[DEBOUNCED SEARCH EXECUTED]: Results for "${query}"`);
}, 300);

logSearch("a");
logSearch("ap");
logSearch("apple"); // Only "apple" should execute after 300ms
