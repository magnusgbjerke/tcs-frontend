import { getPath, ValidTypes } from "@/lib/data";
import Link from "next/link";

export async function Sidebar({
  customerCategory,
}: {
  customerCategory: string;
}) {
  const response = await fetch(getPath("/api/product/valid-types"));

  const validTypes: ValidTypes = await response.json();

  return (
    <aside className="pl-4 pr-4 min-w-[240px]">
      <nav>
        <ul className="space-y-4 border-t pt-2 pb-2">
          <p className="font-bold">Categories</p>
          {validTypes.productCategory?.map((productCategory, index) => (
            <li key={index} className="">
              <Link
                href={`/${customerCategory}/${productCategory}`}
                className="block p-2 rounded-md hover:bg-primary-500"
              >
                {productCategory.charAt(0).toUpperCase() +
                  productCategory.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-4 border-t pt-2 pb-2">
          <p className="font-bold">Types</p>
          {validTypes.type?.map((type, index) => (
            <li key={index} className="">
              <Link
                href={`/${customerCategory}/${type}`}
                className="block p-2 rounded-md hover:bg-primary-500"
              >
                {type}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
