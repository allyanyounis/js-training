
function RecipeDetails({ recipe, onClose }) {
  if (!recipe) return null;

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`]?.trim();
    const amount = recipe[`strMeasure${i}`]?.trim();

    if (name) {
      ingredients.push(`${amount || ""} ${name}`.trim());
    }
  }

  return (
    <section className="recipe-details">
      <button onClick={onClose}>Close</button>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p style={{ whiteSpace: "pre-line" }}>
        {recipe.strInstructions}
      </p>
    </section>
  );
}

export default RecipeDetails;
