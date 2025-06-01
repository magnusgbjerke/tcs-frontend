import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { isJsonServerRunning } from "@/lib/isJsonServerRunning";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  let products: Product[] = [];

  const jsonServerUp = await isJsonServerRunning();

  if (jsonServerUp) {
    // Fetch from JSON Server
    const response = await fetch(`http://localhost:8080/api/product`);
    if (!response.ok)
      throw new Error("Failed to fetch products from JSON Server");
    const data = await response.json();
    products = data.filter((item: Product) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  } else {
    // Fallback to backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product?search=${query}`,
    );
    if (!response.ok) throw new Error("Failed to fetch products from backend");
    products = await response.json();
  }

  return (
    <div>
      <p className="text-xl pt-4 pb-4">
        Searched for: <strong>{decodeURIComponent(query)}</strong>
      </p>
      <div className="flex">
        <Sidebar />
        {products.length !== 0 ? (
          <div className="flex flex-wrap gap-10">
            {products.map((product: Product, index: number) => (
              <div key={index}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
