import { notFound } from "next/navigation";
import { CategoryPage } from "./categoryPage";
import { ProductPage } from "./productPage";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string[] }>;
}) {
  const { category } = await params;

  const validCustomerCategory = ["men", "women", "kids"];
  const validProductCategory = ["tops", "bottoms", "footwear"];
  const validType = ["hoodies", "pants", "shoes"];

  switch (category.length) {
    case 1:
      if (validCustomerCategory.includes(category[0])) {
        return <CategoryPage category={category} />;
      } else {
        return <ProductPage productId={category[0]} />;
      }
    case 2:
      if (
        validProductCategory.includes(category[1]) &&
        validCustomerCategory.includes(category[0])
      ) {
        return <CategoryPage category={category} />;
      } else {
        return notFound();
      }
    case 3:
      if (
        validType.includes(category[2]) &&
        validProductCategory.includes(category[1])
      ) {
        return <CategoryPage category={category} />;
      } else {
        return notFound();
      }
    default:
      return notFound();
  }
}
