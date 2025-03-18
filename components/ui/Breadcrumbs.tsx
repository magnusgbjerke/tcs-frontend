"use client";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

interface Props {
  items: Array<BreadcrumbItem> | [];
  className?: string;
}

function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function Breadcrumbs({ items = [], className = "" }: Props) {
  return (
    <>
      <div className={`flex items-center ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <a
              href={item.href}
              className={
                index === items.length - 1
                  ? "font-bold"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              {capitalizeFirstLetter(item.title)}
            </a>
            {index !== items.length - 1 && (
              <span className="mx-4 text-gray-400">/</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
