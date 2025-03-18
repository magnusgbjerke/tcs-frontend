"use client";

import { Product, Stock } from "@/types/products";
import { Card } from "./ui/Card";
import { HangerRating } from "./ui/HangerRating";
import { StockIndicator } from "./ui/StockIndicator";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  function largestStock(stocks: Stock[]) {
    const temp: number[] = [];
    stocks.forEach((x) => temp.push(x.quantity));
    const highest = Math.max(...temp);
    return highest;
  }
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/${product.id}`);
  };

  return (
    <Card
      img={`/images/products/${product.image}`}
      onClick={() => onClickHandler()}
      pointer
    >
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">{product.brand}</p>
        <p className="truncate cursor-default ">{product.name}</p>
        <p className="font-bold">{product.price},-</p>
        <HangerRating
          averageRating={product.rating}
          disabled
          onClick={() => undefined}
          width={30}
        />
        <StockIndicator stock={largestStock(product.stock)} />
      </div>
    </Card>
  );
}
