import { notFound } from "next/navigation";
import { CategoryPage } from "./categoryPage";
import { ProductPage } from "./productPage";
import { ValidTypes } from "@/types/valid-types";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string[] }>;
}) {
  const { category } = await params;

  const response = await fetch(
    `http://localhost:8080/api/products/valid-types`,
  );

  const validTypes: ValidTypes = await response.json();

  switch (category.length) {
    case 1:
      if (validTypes.customerCategory.includes(category[0])) {
        return <CategoryPage category={category} />;
      } else {
        return <ProductPage productId={category[0]} />;
      }
    case 2:
      if (
        validTypes.productCategory.includes(category[1]) &&
        validTypes.customerCategory.includes(category[0])
      ) {
        return <CategoryPage category={category} />;
      } else {
        return notFound();
      }
    case 3:
      if (
        validTypes.type.includes(category[2]) &&
        validTypes.productCategory.includes(category[1])
      ) {
        return <CategoryPage category={category} />;
      } else {
        return notFound();
      }
    default:
      return notFound();
  }
}
