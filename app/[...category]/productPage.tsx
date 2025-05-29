import { notFound } from "next/navigation";
import Image from "next/image";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@/components/ui/components/Breadcrumbs";
import { HangerRating } from "@/components/ui/components/HangerRating";
import { Product } from "@/lib/data";

export async function ProductPage({ productId }: { productId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`,
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
        <Breadcrumbs items={items} className="text-xl pt-4 pb-4" />
      </header>
      <div className={`flex justify-center p-8`}>
        <Image
          src={`/images/products/${product.image}`}
          width={400}
          height={600}
          alt={`${product.name}`}
          priority
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
