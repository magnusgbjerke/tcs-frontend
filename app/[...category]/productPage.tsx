import { notFound } from "next/navigation";
import Image from "next/image";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@/components/ui/components/Breadcrumbs";
import { HangerRating } from "@/components/ui/components/HangerRating";
import { Product, Stock } from "@/lib/data";
import { AddToCart } from "@/components/AddToCart";
import { StockIndicator } from "@/components/ui/components/StockIndicator";

export async function ProductPage({ productId }: { productId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${productId}`,
  );

  if (!response.ok) {
    notFound();
  }
  const product: Product = await response.json();

  const items: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    { title: product.customerCategory, href: `/${product.customerCategory}` },
    {
      title: product.productCategory,
      href: `/${product.customerCategory}/${product.productCategory}`,
    },
    {
      title: product.type,
      href: `/${product.customerCategory}/${product.productCategory}/${product.type}`,
    },
  ];

  function largestStock(stocks: Stock[]) {
    const temp: number[] = [];
    stocks.forEach((x) => temp.push(x.quantity));
    const highest = Math.max(...temp);
    return highest;
  }

  return (
    <>
      <header>
        <Breadcrumbs items={items} className="text-xl pt-4 pb-4" />
      </header>
      <div className="flex justify-center p-8 cursor-default">
        <Image
          src={`/images/products/${product.image}`}
          width={400}
          height={600}
          alt={`${product.name}`}
          priority
          className={`rounded border-2 border-primary-400`}
        />
        <div className={`flex flex-col gap-4 ml-6 max-w-[400px]`}>
          <p className={`text-3xl`}>{product.name}</p>
          <p>
            Brand: <strong>{product.brand}</strong>
          </p>
          <p>
            For:{" "}
            <strong>
              {product.customerCategory.charAt(0).toUpperCase() +
                product.customerCategory.slice(1)}
            </strong>
          </p>
          <p>
            <i>{product.description}</i>
          </p>

          <p className="font-bold">${product.price}</p>

          <HangerRating
            averageRating={product.rating}
            disabled
            onClick={() => undefined}
            width={50}
            className="fill-primary-800"
          />
          <StockIndicator stock={largestStock(product.stock)} />
          <AddToCart product={product} />
        </div>
      </div>
    </>
  );
}
