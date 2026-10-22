
const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getComments(postId) {
  const response = await fetch(
    `${API_URL}/posts/${postId}/comments`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}



export async function getPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error("Failed to fetch post");
  }

  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch author");
  }

  return response.json();
}
