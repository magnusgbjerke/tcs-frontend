import { notFound } from "next/navigation";
import { CustomerCategoryPage } from "./customerCategoryPage";
import { ProductPage } from "./productPage";

export default async function Page({
  params,
}: {
  params: Promise<{ customerCategory: string[] }>;
}) {
  const { customerCategory } = await params;

  const validCustomerCategory = ["men", "women", "kids"];
  const validProductCategory = ["tops", "bottoms", "footwear"];
  const validType = ["hoodies", "pants", "shoes"];
  if (customerCategory.length == 1) {
    if (validCustomerCategory.includes(customerCategory[0])) {
      return <CustomerCategoryPage customerCategory={customerCategory} />;
    } else {
      return <ProductPage productId={customerCategory[0]} />;
    }
  } else if (customerCategory.length == 2) {
    if (
      validProductCategory.includes(customerCategory[1]) &&
      validCustomerCategory.includes(customerCategory[0])
    ) {
      return <CustomerCategoryPage customerCategory={customerCategory} />;
    } else {
      return notFound();
    }
  } else if (customerCategory.length == 3) {
    if (
      validType.includes(customerCategory[2]) &&
      validProductCategory.includes(customerCategory[1])
    ) {
      return <CustomerCategoryPage customerCategory={customerCategory} />;
    } else {
      return notFound();
    }
  }
}
