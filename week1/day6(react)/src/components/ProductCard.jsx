// Concept used:
// Functional Component
// Props (receiving data from parent)

// Concept used:
// Props
// Child components
// Component composition

import Badge from "./Badge";
import Price from "./Price";
import Rating from "./Rating";



function ProductCard({ product }) {

  return (
    <div className={`product-card ${!product.stock ? "sold-out" : ""}`}>

      <img
        src={product.image}
        alt={product.name}
      />

      <h2>
        {product.name}
      </h2>

      <Price value={product.price} />

      <Rating value={product.rating} />

      <Badge
        stock={product.stock}
        rating={product.rating}
      />

    </div>
  );

}

export default ProductCard;