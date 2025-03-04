"use client";

import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { HangerRating } from "@/components/ui/HangerRating";
import { StockIndicator } from "@/components/ui/StockIndicator";
import { mockProducts } from "@/mocks/products";
import { Stock } from "@/types/products";
import { usePathname } from "next/navigation";

export default function Home() {
  const [customerCategory, productCategory] = usePathname()
    .toString()
    .split("/")
    .filter(Boolean);

  const items: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    ...(customerCategory
      ? [{ title: customerCategory, href: `/${customerCategory}` }]
      : []),
    ...(productCategory
      ? [
          {
            title: productCategory,
            href: `/${customerCategory}/${productCategory}`,
          },
        ]
      : []),
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
          {mockProducts.map((item, index) => (
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
