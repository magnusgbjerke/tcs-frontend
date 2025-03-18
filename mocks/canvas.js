/* eslint-disable */

const { faker } = require("@faker-js/faker");
const { createCanvas } = require("canvas");

function generateProducts() {
  const validCustomerCategory = ["men", "women", "kids"];
  const validType = ["hoodies", "pants", "shoes"];
  const validBrands = [
    "Velora",
    "Drift & Dune",
    "Noxen",
    "Urban Loom",
    "LuxeRoots",
  ];

  const name = faker.commerce.productName();
  const brand = faker.helpers.arrayElement(validBrands);
  const description = faker.commerce.productDescription();
  const rating = faker.number.float({ min: 0, max: 5, fractionDigits: 2 });
  const customerCategory = validCustomerCategory[2];
  const type = faker.helpers.arrayElement(validType);
  let productCategory = "";
  switch (type) {
    case "hoodies":
      productCategory = "tops";
      break;
    case "pants":
      productCategory = "bottoms";
      break;
    case "shoes":
      productCategory = "footwear";
      break;
    default:
      break;
  }
  const price = faker.number.float({ min: 50, max: 10000, fractionDigits: 2 });
  const quantity1 = faker.number.int({ min: 0, max: 100 });
  const quantity2 = faker.number.int({ min: 0, max: 100 });
  const quantity3 = faker.number.int({ min: 0, max: 100 });

  const formattedStringBrand = textFormatter(brand);
  const formattedStringName = textFormatter(name);
  const id = `${formattedStringBrand}-${formattedStringName}`;

  const image = `${id}.png`;

  const width = 640;
  const height = 960;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background color
  switch (customerCategory) {
    case "men":
      ctx.fillStyle = "#ADD8E6";
      break;
    case "women":
      ctx.fillStyle = "#FFE0E9";
      break;
    case "kids":
      ctx.fillStyle = "#d3d3d3";
      break;
    default:
      ctx.fillStyle = "#FF0000";
  }
  ctx.fillRect(0, 0, width, height);

  // Placeholder
  ctx.fillStyle = "#000000";
  ctx.font = "60px Arial";
  ctx.fillText("Placeholder", 175, 200);

  // Brand
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(brand, 50, 350);

  // Name
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(name, 50, 450);

  // CustomerCategory
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(capitalizeFirstLetter(customerCategory), 50, 550);

  // ProductCategory
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(capitalizeFirstLetter(productCategory), 50, 650);

  // Type
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(capitalizeFirstLetter(type), 50, 750);

  // Price
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(price.toString(), 50, 850);

  // Save as image
  const fs = require("fs");
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`public/images/products/${image}`, buffer);

  return {
    id: id,
    name: name,
    brand: brand,
    description: description,
    rating: rating,
    image: image,
    type: type,
    customerCategory: customerCategory,
    productCategory: productCategory,
    price: price,
    stock: [
      { size: "S", quantity: quantity1 },
      { size: "M", quantity: quantity2 },
      { size: "L", quantity: quantity3 },
    ],
  };
}

function textFormatter(name) {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

function capitalizeFirstLetter(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function fetchData() {
  const products = faker.helpers.multiple(generateProducts, { count: 2 });
  console.log(JSON.stringify(products));
}
fetchData();
