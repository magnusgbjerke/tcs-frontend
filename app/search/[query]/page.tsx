import { Product, Stock } from "@/types/products";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/Card";
import { HangerRating } from "@/components/ui/HangerRating";
import { StockIndicator } from "@/components/ui/StockIndicator";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  let products: Product[] = [];

  if (process.env.NODE_ENV === "development") {
    console.log("Running in development mode");
    const response = await fetch(`http://localhost:8080/api/products`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    products = data.filter((item: Product) =>
      item.name.toLowerCase().includes(query)
    );
  } else if (process.env.NODE_ENV === "production") {
    console.log("Running in production mode");
    const response = await fetch(
      `http://localhost:8080/api/products?search=${query}`
    );
    if (!response.ok) throw new Error("Failed to fetch users");
    products = await response.json();
  }

  function largestStock(stocks: Stock[]) {
    const temp: number[] = [];
    stocks.forEach((x) => temp.push(x.quantity));
    const highest = Math.max(...temp);
    return highest;
  }

  return (
    <div>
      <p>User searched for: {decodeURIComponent(query)}</p>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-wrap gap-10">
          {products.map((item: Product, index: number) => (
            <div key={index}>
              <Card img={`/images/products/${item.image}`}>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p>Price</p>
                    <HangerRating
                      averageRating={item.rating}
                      disabled
                      onClick={() => undefined}
                      width={23}
                    />
                    <StockIndicator stock={largestStock(item.stock)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>brand</p>
                    <p>name</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
