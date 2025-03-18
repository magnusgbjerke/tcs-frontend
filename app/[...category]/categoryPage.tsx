import { ProductCard } from "@/components/ProductCard";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Product } from "@/types/products";

export async function CategoryPage({ category }: { category: string[] }) {
  let endpoint = "";
  switch (category.length) {
    case 1:
      endpoint = `http://localhost:8080/api/products?customerCategory=${category[0]}`;
      break;
    case 2:
      endpoint = `http://localhost:8080/api/products?customerCategory=${category[0]}&productCategory=${category[1]}`;
      break;
    case 3:
      endpoint = `http://localhost:8080/api/products?customerCategory=${category[0]}&productCategory=${category[1]}&type=${category[2]}`;
      break;
    default:
      endpoint = `http://localhost:8080/api/products`;
  }

  const response = await fetch(endpoint);
  const products = await response.json();

  const items: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

  category.reduce((path, category) => {
    const newPath = `${path}/${category}`;
    items.push({ title: category, href: newPath });
    return newPath;
  }, "");

  return (
    <div>
      <header>
        <Breadcrumbs items={items} className="text-xl pt-4 pb-4" />
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
