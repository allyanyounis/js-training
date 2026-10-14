// Array → stores multiple items
// Object → stores details of one item
// Export → allows other files to use this data

// const product = {
//   id: 1,
//   name: "iPhone 15",
//   price: 200000
// };

// Concept used:
// Array = collection of multiple objects

export const products = [

  {
    id: 1,
    category: "Phones",
    name: "iPhone 15",
    image: "/images/iphone.jpg",
    price: 200000,
    rating: 4.8,
    stock: true
  },

  {
    id: 2,
    category: "Laptops",
    name: "Dell Laptop",
    image: "/images/dell.jpg",
    price: 150000,
    rating: 4.2,
    stock: false
  },

  {
    id: 3,
    category: "Accessories",
    name: "Smart Watch",
    image: "/images/watch.jpg",
    price: 5000,
    rating: 4.6,
    stock: true
  }

];