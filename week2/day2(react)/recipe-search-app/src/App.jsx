import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { FavoritesContext } from "./context/FavoritesContext";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import LoadingSkeleton from "./components/LoadingSkeleton";
import CategoryFilter from "./components/CategoryFilter";
import useDebounce from "./hooks/useDebounce";
import { searchRecipes, getRecipeDetails } from "./services/recipeApi";

function App() {
  const { theme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);
  const [search, setSearch] = useState("");
  // const [debouncedSearch, setDebouncedSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Effect: Fetch recipes from TheMealDB API
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
  <div  className={theme}>
    <header>
      <h1>Recipe Search App</h1>
      <ThemeToggle />
    </header>

    <SearchBar
      search={search}
      setSearch={setSearch}
    />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
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

      <section>
        <h2>My Favorites ({favorites.length})</h2>

        {favorites.length === 0 ? (
          <p>No favorite recipes yet.</p>
        ) : (
          <RecipeGrid
            recipes={favorites}
            onSelect={handleSelectRecipe}
          />
        )}
      </section>

      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

export default App;
