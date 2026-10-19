
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ recipe, onSelect }) {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const favorite = isFavorite(recipe.idMeal);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>{recipe.strMeal}</h3>
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>

      <button onClick={() => onSelect(recipe.idMeal)}>
        View Recipe
      </button>

      <button onClick={handleFavorite}>
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default RecipeCard;
