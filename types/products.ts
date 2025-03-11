export interface Stock {
  size: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  rating: number;
  image: string;
  type: string;
  customerCategory: string;
  productCategory: string;
  price: number;
  stock: Stock[];
}
