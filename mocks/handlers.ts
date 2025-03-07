import { Product } from "@/types/products";
import { http, HttpResponse } from "msw";

const productId = ""; // Does not matter

export const handlers = [
  //http://localhost:8080/api/products/:productId
  http.get(`http://localhost:8080/api/products/:productId`, (request) => {
    // (request, response, context)
    const { productId } = request.params;
    return HttpResponse.json<Product>({
      id: 1,
      name: "Houndstooth Blazer i Regular Fit",
      description:
        "A stylish and sophisticated houndstooth-patterned blazer with a regular fit, perfect for both casual and formal occasions.",
      rating: 3.7,
      image: "hoodie-axe.jpeg",
      type: "hoodie",
      customerCategory: "men",
      productCategory: "clothes",
      stock: [
        { size: "M", quantity: 5 },
        { size: "S", quantity: 5 },
      ],
    });
  }),
  //http://localhost:8080/api/products
  http.get("http://localhost:8080/api/products", () => {
    return HttpResponse.json<Product[]>([
      {
        id: 1,
        name: "Houndstooth Blazer i Regular Fit",
        description:
          "A stylish and sophisticated houndstooth-patterned blazer with a regular fit, perfect for both casual and formal occasions.",
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
        description:
          "An oversized hoodie made from soft fleece, featuring a cozy kangaroo pocket to keep your hands warm during chilly days.",
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
        description:
          "Sporty joggers with a comfortable elastic waistband and multiple pockets for a functional and stylish look.",
        rating: 4.2,
        image: "hoodie-detroit.jpeg",
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
        description:
          "A vintage-style graphic tee made from 100% organic cotton, featuring a relaxed fit and soft feel.",
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
      {
        id: 5,
        name: "Basic Hoodie i Warm Fleece",
        description:
          "A cozy basic hoodie made from soft fleece, offering a comfortable fit and warmth for everyday wear.",
        rating: 4.1,
        image: "hoodie-m.jpeg",
        type: "hoodie",
        customerCategory: "men",
        productCategory: "clothes",
        stock: [
          { size: "M", quantity: 10 },
          { size: "L", quantity: 8 },
        ],
      },
      {
        id: 6,
        name: "Sharks Hoodie i Graphic Print",
        description:
          "A bold hoodie featuring a graphic shark print, designed for those who want to stand out with an edgy, sporty look.",
        rating: 4.6,
        image: "hoodie-sharks.webp",
        type: "hoodie",
        customerCategory: "men",
        productCategory: "clothes",
        stock: [
          { size: "S", quantity: 12 },
          { size: "M", quantity: 9 },
        ],
      },
      {
        id: 7,
        name: "Space T-shirt i Alien Print",
        description:
          "A 100% organic cotton t-shirt featuring a fun and quirky alien print, perfect for a laid-back, sci-fi-inspired look.",
        rating: 4.3,
        image: "t-shirt-alien.jpeg",
        type: "t-shirt",
        customerCategory: "men",
        productCategory: "clothes",
        stock: [
          { size: "M", quantity: 20 },
          { size: "L", quantity: 18 },
        ],
      },
      {
        id: 8,
        name: "Home T-shirt i Minimalist Design",
        description:
          "A minimalist t-shirt designed with a simple, yet stylish 'home' graphic, offering both comfort and modern flair.",
        rating: 4.4,
        image: "t-shirt-home.jpeg",
        type: "t-shirt",
        customerCategory: "men",
        productCategory: "clothes",
        stock: [
          { size: "M", quantity: 25 },
          { size: "L", quantity: 30 },
        ],
      },
      {
        id: 9,
        name: "Floral T-shirt i Lilly Print",
        description:
          "A soft t-shirt with a vibrant floral Lilly print, ideal for adding a touch of freshness and color to your spring wardrobe.",
        rating: 4.7,
        image: "t-shirt-lilly.jpeg",
        type: "t-shirt",
        customerCategory: "women",
        productCategory: "clothes",
        stock: [
          { size: "S", quantity: 10 },
          { size: "M", quantity: 15 },
        ],
      },
    ]);
  }),
];
