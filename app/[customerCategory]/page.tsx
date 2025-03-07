import { CustomerCategoryPage } from "./customerCategoryPage";
import { ProductPage } from "./productPage";

export default async function Page({
  params,
}: {
  params: Promise<{ customerCategory: string }>;
}) {
  const { customerCategory } = await params;

  const validSlugs = ["men", "women", "kids"];

  if (validSlugs.includes(customerCategory)) {
    return <CustomerCategoryPage customerCategory={customerCategory} />;
  } else {
    return <ProductPage productId={customerCategory} />;
  }
}
