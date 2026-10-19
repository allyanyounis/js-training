import useFetch from "../hooks/useFetch";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const {
    data,
    loading,
    error,
    refetch
  } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <select
      value={selectedCategory}
      onChange={(event) => onCategoryChange(event.target.value)}
    >
      <option value="">All categories</option>

      {data?.meals?.map((item) => (
        <option key={item.strCategory} value={item.strCategory}>
          {item.strCategory}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;