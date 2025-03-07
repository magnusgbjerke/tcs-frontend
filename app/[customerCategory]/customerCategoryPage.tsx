import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { HangerRating } from "@/components/ui/HangerRating";
import { StockIndicator } from "@/components/ui/StockIndicator";
import { Stock } from "@/types/products";

export async function CustomerCategoryPage({
  customerCategory,
}: {
  customerCategory: string;
}) {
  const response = await fetch("http://localhost:8080/api/products");
  const products = await response.json();

  const items: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    { title: `${customerCategory}`, href: `/${customerCategory}` },
  ];

  function largestStock(stocks: Stock[]) {
    let temp: number[] = [];
    stocks.forEach((x) => temp.push(x.quantity));
    const highest = Math.max(...temp);
    return highest;
  }

  return (
    <div>
      <header>
        <Breadcrumbs items={items} />
      </header>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-wrap gap-10">
          {products.map((item, index) => (
            <div key={index}>
              <Card img={`images/products/${item.image}`}>
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
