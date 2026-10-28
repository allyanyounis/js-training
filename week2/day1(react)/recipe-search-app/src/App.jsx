
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import LoadingSkeleton from "./components/LoadingSkeleton";
import CategoryFilter from "./components/CategoryFilter";
import { searchRecipes, getRecipeDetails, getCategories } from "./services/recipeApi";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Effect 1: Wait 500ms after the user stops typing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  // Effect 2: Fetch recipes from TheMealDB API
  useEffect(() => {
    let ignore = false;

    const fetchRecipes = async () => {
      setError("");

      if (!debouncedSearch.trim()) {
        setRecipes([]);
        setLoading(false);
        setSelectedRecipe(null);
        return;
      }

      setLoading(true);
      setRecipes([]);

      try {
        const data = await searchRecipes(debouncedSearch);

        if (!ignore) {
          setRecipes(data);
          setSelectedRecipe(null);
        }
      } catch (err) {
        if (!ignore) {
          setError("Failed to fetch recipes. Please try again.");
          setRecipes([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, retryCount]);

  // Effect 3: Fetch categories on mount
  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        const data = await getCategories();
        if (!ignore) setCategories(data);
      } catch (error) {
        console.error("Category fetch failed:", error);
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  // Fetch recipe details when View Recipe is clicked
  const handleSelectRecipe = async (id) => {
    try {
      const recipe = await getRecipeDetails(id);
      setSelectedRecipe(recipe);
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
    }
  };

  // Step 4: Filter recipes by selected category
  const filteredRecipes = selectedCategory
    ? recipes.filter(
        (recipe) => recipe.strCategory === selectedCategory
      )
    : recipes;

  return (
    <div>
      <h1>Recipe Search App</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <p>Search after 500ms: {debouncedSearch}</p>
      <p>Recipes found: {filteredRecipes.length}</p>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div>
          <p role="alert">{error}</p>
          <button
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Retry
          </button>
        </div>
      ) : debouncedSearch.trim() && filteredRecipes.length === 0 ? (
        <p>No recipes found. Try another search.</p>
      ) : (
        <RecipeGrid
          recipes={filteredRecipes}
          onSelect={handleSelectRecipe}
        />
      )}

      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

export default App;
