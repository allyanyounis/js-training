

import { fetchUserProfile, fetchUserRepos } from "./api.js";
import { state, setState, resetState } from "./state.js";
import { renderLoading, renderError, renderProfile, renderRepos } from "./dom.js";
import { initEvents } from "./events.js";
import { MESSAGES } from "./constants.js";

// Main Controller Action
async function handleUserSearch(username) {
  resetState();
  setState({ isLoading: true });
  renderLoading(true);

  try {
    // 1. Fetch user profile
    const userResponse = await fetchUserProfile(username);

    // Check for 404
    if (userResponse.status === 404) {
      setState({ error: MESSAGES.NOT_FOUND });
      renderError(MESSAGES.NOT_FOUND);
      return;
    }

    if (!userResponse.ok) {
      setState({ error: MESSAGES.NETWORK_ERROR });
      renderError(MESSAGES.NETWORK_ERROR);
      return;
    }

    const userData = await userResponse.json();

    // 2. Fetch 5 repos
    const reposData = await fetchUserRepos(username);

    // 3. Save to state and update UI
    setState({ user: userData, repos: reposData });
    renderProfile(state.user);
    renderRepos(state.repos);

  } catch (err) {
    setState({ error: MESSAGES.NETWORK_ERROR });
    renderError(MESSAGES.NETWORK_ERROR);
  } finally {
    setState({ isLoading: false });
    renderLoading(false);
  }
}

// Start application
function init() {
  initEvents(handleUserSearch);
}

init();
