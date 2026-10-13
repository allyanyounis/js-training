import { elements } from "./dom.js";

// Wires up all user interactions
export function initEvents(onSearchSubmit) {
  elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page reload

    const username = elements.usernameInput.value.trim();
    if (!username) return;

    onSearchSubmit(username);
  });
}
