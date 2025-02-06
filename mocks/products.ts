import { Product } from "../types/products";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Houndstooth Blazer i Regular Fit",
    description: "Essential hoodie in premium cotton",
    rating: 3.7,
    image: "hoodie-axe.jpeg",
    type: "hoodie",
    customerCategory: "men",
    productCategory: "clothes",
    stock: [
      { size: "M", quantity: 5 },
      { size: "S", quantity: 5 },
    ],
  },
  {
    id: 2,
    name: "Oversized Hoodie i Kangaroo Pocket",
    description: "Cozy fleece hoodie with front pouch",
    rating: 4.5,
    image: "hoodie-black-leg.webp",
    type: "hoodie",
    customerCategory: "men",
    productCategory: "clothes",
    stock: [
      { size: "S", quantity: 15 },
      { size: "M", quantity: 15 },
    ],
  },
  {
    id: 3,
    name: "Cargo Joggers i Elastic Waist",
    description: "Sporty pants with multiple pockets",
    rating: 4.2,
    image: "hoodie-sharks.webp",
    type: "hoodie",
    customerCategory: "men",
    productCategory: "clothes",
    stock: [
      { size: "S", quantity: 5 },
      { size: "M", quantity: 14 },
    ],
  },
  {
    id: 4,
    name: "Graphic Tee i Vintage Wash",
    description: "100% organic cotton t-shirt",
    rating: 4.8,
    image: "t-shirt-2020.jpeg",
    type: "t-shirt",
    customerCategory: "men",
    productCategory: "clothes",
    stock: [
      { size: "S", quantity: 0 },
      { size: "M", quantity: 0 },
    ],
  },
];
