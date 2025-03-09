import { Product, Stock } from "@/types/products";
import { Card } from "./ui/Card";
import { HangerRating } from "./ui/HangerRating";
import { StockIndicator } from "./ui/StockIndicator";

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

  return (
    <Card img={`/images/products/${product.image}`}>
      <div className="flex flex-col gap-1">
        <p className="cursor-default">brand</p>
        <p className="truncate cursor-default">{product.name}</p>
        <p className="cursor-default">Price</p>
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
