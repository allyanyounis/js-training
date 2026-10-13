import { GITHUB_API_BASE_URL, REPOS_PER_PAGE } from "./constants.js";

export async function fetchUserProfile(username) {
  return await fetch(`${GITHUB_API_BASE_URL}/${username}`);
}

export async function fetchUserRepos(username) {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/${username}/repos?sort=updated&per_page=${REPOS_PER_PAGE}`
  );
  if (!response.ok) return [];
  return await response.json();
}
