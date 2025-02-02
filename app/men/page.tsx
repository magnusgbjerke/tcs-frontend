"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { StockIndicator } from "@/components/StockIndicator";
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
      {" "}
      <header>
        <Breadcrumbs items={items} />
      </header>
      <div className="flex">
        <aside>aside</aside>{" "}
        <div className="grid grid-cols-3 gap-4">
          {mockProducts.map((item, index) => (
            <div key={index}>
              <Card img={`images/products/${item.image}`}>
                <StockIndicator stock={largestStock(item.stock)} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
