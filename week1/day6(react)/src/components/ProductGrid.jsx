// Concept used:
// Functional Component
// Importing data from another file
// Array + map()

import { products } from "../data/products";
import ProductCard from "./ProductCard";


function ProductGrid() {

    // Concept used:
    // Creating category list for grouping products

    const categories = [
        "Phones",
        "Laptops",
        "Accessories"
    ];


    return (
        <div className="product-grid" >

            {
                categories.map(category => (

                    <div>

                        <h2>
                            {category}
                        </h2>


                        {
                            products
                                .filter(product => product.category === category)
                                .map(product => (

                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />

                                ))
                        }

                    </div>

                ))
            }

        </div>
    );

}

export default ProductGrid;