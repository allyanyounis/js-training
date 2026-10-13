// Central Application State
export const state = {
  user: null,
  repos: [],
  isLoading: false,
  error: null
};

// Helper to update state cleanly
export function setState(updates) {
  Object.assign(state, updates);
}

// Reset state back to initial empty state
export function resetState() {
  state.user = null;
  state.repos = [];
  state.isLoading = false;
  state.error = null;
}
