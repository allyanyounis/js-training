
function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div>
      <label htmlFor="category">Category: </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category.strCategory}
            value={category.strCategory}
          >
            {category.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
