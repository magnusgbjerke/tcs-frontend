export interface Stock {
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  rating: number;
  image: string;
  type: string;
  customerCategory: string;
  productCategory: string;
  stock: Stock[];
}
