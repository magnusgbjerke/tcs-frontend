import { ProductCard } from "@/components/ProductCard";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Product } from "@/types/products";

export async function CustomerCategoryPage({
  customerCategory,
}: {
  customerCategory: string[];
}) {
  const response = await fetch("http://localhost:8080/api/products");
  const products = await response.json();

  const items: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

  customerCategory.reduce((path, category) => {
    const newPath = `${path}/${category}`;
    items.push({ title: category, href: newPath });
    return newPath;
  }, "");

  return (
    <div>
      <header>
        <Breadcrumbs items={items} />
      </header>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-wrap gap-10">
          {products.map((product: Product, index: number) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
