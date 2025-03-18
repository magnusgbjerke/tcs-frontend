import { Product } from "@/types/products";
import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  let products: Product[] = [];

  if (process.env.NODE_ENV === "development") {
    const response = await fetch(`http://localhost:8080/api/products`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    products = data.filter((item: Product) =>
      item.name.toLowerCase().includes(query),
    );
  } else if (process.env.NODE_ENV === "production") {
    const response = await fetch(
      `http://localhost:8080/api/products?search=${query}`,
    );
    if (!response.ok) throw new Error("Failed to fetch users");
    products = await response.json();
  }

  return (
    <div>
      <p className="text-xl pt-4 pb-4">
        Searched for: <strong>{decodeURIComponent(query)}</strong>
      </p>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-wrap gap-10">
          {products.map((product: Product, index: number) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
