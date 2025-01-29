export interface items {
  title: string;
  href: string;
}

type Props = {
  items: Array<items> | [];
};

export function Breadcrumbs({ items = [] }: Props) {
  return (
    <>
      <div className="flex">
        {items.map((item, index) => (
          <p key={index}>
            {item.title}
            {index === items.length - 1 ? "" : " > "}
          </p>
        ))}
      </div>
    </>
  );
}
