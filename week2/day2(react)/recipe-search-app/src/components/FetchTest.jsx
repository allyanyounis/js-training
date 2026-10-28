import useFetch from "../hooks/useFetch";

function FetchTest() {

    // data , loading , error and refetch are variable for storing values.
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
    <div>
      <h2>Categories from API</h2>

      <button onClick={refetch}>Fetch Again</button>

      <ul>
        {data?.meals?.map((item) => (
          <li key={item.strCategory}>
            {item.strCategory}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchTest;


// Optional chaining operator
// Example 1: When data is null
// const data = null;

// console.log(data?.meals);


// Output:
// undefined


// No error is thrown

// without the optional chaining operator (?.).
// const data = null;

// console.log(data.meals);

// Output:
// TypeError: Cannot read properties of null (reading 'meals')