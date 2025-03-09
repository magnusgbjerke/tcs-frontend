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
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <a 
              href={item.href} 
              className={index === items.length - 1 ? "font-bold" : "text-gray-500 hover:text-gray-700"}
            >
              {capitalizeFirstLetter(item.title)}
            </a>
            {index !== items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </div>
        ))}
      </div>
    </>
  );
}
