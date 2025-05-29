import { ProductCard } from "@/components/ProductCard";
import { Sidebar } from "@/components/Sidebar";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@/components/ui/components/Breadcrumbs";
import { Product } from "@/lib/data";

export async function CategoryPage({ category }: { category: string[] }) {
  let endpoint = "";
  switch (category.length) {
    case 1:
      endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?customerCategory=${category[0]}`;
      break;
    case 2:
      endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?customerCategory=${category[0]}&productCategory=${category[1]}`;
      break;
    case 3:
      endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?customerCategory=${category[0]}&productCategory=${category[1]}&type=${category[2]}`;
      break;
    default:
      endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;
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
    <>
      <header>
        <Breadcrumbs items={items} className="text-xl pt-4 pb-4" />
      </header>
      <div className="flex">
        <Sidebar />
        <div className="grid grid-cols-4 gap-10">
          {products.length === 0 ? (
            <>
              <div className="text-center text-gray-500">
                No products found.
              </div>
              <div className="text-center text-gray-500 w-[640px] h-[960px]"></div>
              <div className="text-center text-gray-500 w-[640px] h-[960px]"></div>
              <div className="text-center text-gray-500 w-[640px] h-[960px]"></div>
            </>
          ) : (
            products.map((product: Product, index: number) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
