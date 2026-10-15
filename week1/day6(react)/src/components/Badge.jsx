// Concept used:
// Conditional Rendering
// Props

function Badge({ stock, rating }) {

  return (

    <div>

      {
        stock               //ternery operator , if stock is true, then show In stock, else show sold out
        ? <p>In Stock</p>
        : <p>Sold Out</p>
      }


      {
        rating >= 4.5 &&
        <p>Top Rated</p>
      }

    </div>

  );

}

export default Badge;