import customerCategoryPage from "./customerCategoryPage";
import productPage from "./productPage";

export default async function Page({
  params,
}: {
  params: Promise<{ customerCategory: string }>;
}) {
  const { customerCategory } = await params;

  const validSlugs = ["men", "women", "kids"];

  if (validSlugs.includes(customerCategory)) {
    return customerCategoryPage(customerCategory);
  } else {
    return productPage(customerCategory);
  }
}
