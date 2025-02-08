"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { usePathname } from "next/navigation";

export default function Home() {
  const [customerCategory, productCategory] = usePathname()
    .toString()
    .split("/")
    .filter(Boolean);

  const items: BreadcrumbItem[] = [
    { title: "Home", href: "/" },
    ...(customerCategory
      ? [{ title: customerCategory, href: `/${customerCategory}` }]
      : []),
    ...(productCategory
      ? [
          {
            title: productCategory,
            href: `/${customerCategory}/${productCategory}`,
          },
        ]
      : []),
  ];

  return (
    <div>
      {" "}
      <header>
        <Breadcrumbs items={items} />
      </header>
      <p>Kids</p>
    </div>
  );
}
