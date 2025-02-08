"use client";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

interface Props {
  items: Array<BreadcrumbItem> | [];
}

function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function Breadcrumbs({ items = [] }: Props) {
  return (
    <>
      <div className="flex">
        {items.map((item, index) => (
          <div key={index}>
            <a href={item.href}>{capitalizeFirstLetter(item.title)}</a>
            {index === items.length - 1 ? "" : " > "}
          </div>
        ))}
      </div>
    </>
  );
}
