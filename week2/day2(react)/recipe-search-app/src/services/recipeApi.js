
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchRecipes = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  return data.meals || [];
};



export const getRecipeDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }

  const data = await response.json();
  return data.meals?.[0] || null;
};



export const getCategories = async () => {
  const response = await fetch(
    `${BASE_URL}/list.php?c=list`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data.meals || [];
};
