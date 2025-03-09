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
  if (category.length == 1) {
    if (validCustomerCategory.includes(category[0])) {
      return <CategoryPage category={category} />;
    } else {
      return <ProductPage productId={category[0]} />;
    }
  } else if (category.length == 2) {
    if (
      validProductCategory.includes(category[1]) &&
      validCustomerCategory.includes(category[0])
    ) {
      return <CategoryPage category={category} />;
    } else {
      return notFound();
    }
  } else if (category.length == 3) {
    if (
      validType.includes(category[2]) &&
      validProductCategory.includes(category[1])
    ) {
      return <CategoryPage category={category} />;
    } else {
      return notFound();
    }
  }
}
