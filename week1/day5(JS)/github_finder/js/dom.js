import { MESSAGES } from "./constants.js";
import { sanitizeText } from "./utils.js";

// DOM Elements
export const elements = {
  searchForm: document.getElementById("searchForm"),
  usernameInput: document.getElementById("usernameInput"),
  searchBtn: document.getElementById("searchBtn"),
  statusMessage: document.getElementById("statusMessage"),
  profileContainer: document.getElementById("profileContainer"),
  reposContainer: document.getElementById("reposContainer")
};

// UI Update: Loading State
export function renderLoading(isLoading) {
  if (isLoading) {
    elements.searchBtn.disabled = true;
    elements.searchBtn.textContent = "Searching...";
    elements.statusMessage.className = "status-message loading";
    elements.statusMessage.textContent = MESSAGES.LOADING;
    elements.profileContainer.innerHTML = "";
    elements.reposContainer.innerHTML = "";
  } else {
    elements.searchBtn.disabled = false;
    elements.searchBtn.textContent = "Search";
    elements.statusMessage.textContent = "";
  }
}

// UI Update: Error State
export function renderError(message) {
  elements.statusMessage.className = "status-message error";
  elements.statusMessage.textContent = message;
  elements.profileContainer.innerHTML = "";
  elements.reposContainer.innerHTML = "";
}

// UI Update: User Profile Card
export function renderProfile(user) {
  const name = sanitizeText(user.name, user.login);
  const bio = sanitizeText(user.bio, "No bio available.");

  elements.profileContainer.innerHTML = `
    <div class="profile-card">
      <img src="${user.avatar_url}" alt="${name}" class="profile-avatar" />
      <h2 class="profile-name">${name}</h2>
      <p class="profile-username">@${user.login}</p>
      <p class="profile-bio">${bio}</p>
      
      <div class="profile-stats">
        <span class="stat-badge">Followers: <strong>${user.followers}</strong></span>
        <span class="stat-badge">Public Repos: <strong>${user.public_repos}</strong></span>
      </div>

      <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="profile-link">
        View GitHub Profile
      </a>
    </div>
  `;
}

// UI Update: 5 Recent Repositories
export function renderRepos(repos) {
  if (!repos || repos.length === 0) {
    elements.reposContainer.innerHTML = `<p style="text-align: center; color: #94a3b8;">No public repositories found.</p>`;
    return;
  }

  const reposHtml = repos
    .map(
      (repo) => `
      <div class="repo-item">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">
          ${repo.name}
        </a>
        <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
      </div>
    `
    )
    .join("");

  elements.reposContainer.innerHTML = `
    <h3 class="repos-section-title">5 Most Recently Updated Repositories</h3>
    ${reposHtml}
  `;
}
