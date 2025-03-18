import { HangerRating } from "@/components/ui/HangerRating";
import { Product } from "@/types/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/Breadcrumbs";

export async function ProductPage({ productId }: { productId: string }) {
  const response = await fetch(
    `http://localhost:8080/api/products/${productId}`,
  );

  if (!response.ok) {
    notFound();
  }
  const product: Product = await response.json();

  const items: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    { title: product.customerCategory, href: `/${product.customerCategory}` },
    {
      title: product.productCategory,
      href: `/${product.customerCategory}/${product.productCategory}`,
    },
    {
      title: product.type,
      href: `/${product.customerCategory}/${product.productCategory}/${product.type}`,
    },
  ];

  return (
    <>
      <header>
        <Breadcrumbs items={items} className="text-xl mt-4 mb-4" />
      </header>
      <div className={`flex justify-center p-8`}>
        <Image
          src={`/images/products/${product.image}`}
          width={400}
          height={600}
          alt={`${product.name}`}
          className={`rounded border-2 border-primary-400`}
        />
        <div className={`flex flex-col gap-4 ml-6 max-w-[400px]`}>
          <p className={`text-3xl`}>{product.name}</p>
          <p>
            <i>{product.description}</i>
          </p>
          <p>
            For: <strong>{product.customerCategory}</strong>
          </p>
          <p className="font-bold">{product.price},-</p>

          <HangerRating
            averageRating={product.rating}
            disabled
            onClick={() => undefined}
            width={50}
          />
        </div>
      </div>
    </>
  );
}
