import { HangerRating } from "@/components/ui/HangerRating";
import { Product } from "@/types/products";
import { notFound } from "next/navigation";

export async function ProductPage({ productId }: { productId: string }) {
  const response = await fetch(
    `http://localhost:8080/api/products/${productId}`
  );

  if (!response.ok) {
    notFound();
  }
  const product: Product = await response.json();
  return (
    <>
      <p className={`text-5xl pb-2 pt-2`}>{product.name}</p>
      <p>{product.description}</p>
      <img
        src={`/images/products/${product.image}`}
        width={200}
        className={``}
        alt={`${product.description}`}
      />
      <HangerRating
        averageRating={product.rating}
        disabled
        onClick={() => undefined}
        width={50}
      />
    </>
  );
}
