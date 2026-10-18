
function RecipeCard({ recipe, onSelect }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>{recipe.strMeal}</h3>
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>

      <button onClick={() => onSelect(recipe.idMeal)}>
        View Recipe
      </button>
    </div>
  );
}

export default RecipeCard;
