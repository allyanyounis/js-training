
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, onSelect }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
