"use client";

import { Product, Stock } from "@/types/products";
import { useRouter } from "next/navigation";
import { HangerRating } from "@/components/ui/components/HangerRating";
import { StockIndicator } from "@/components/ui/components/StockIndicator";
import { Card } from "@/components/ui/components/Card";

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
      height={960}
      width={640}
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
