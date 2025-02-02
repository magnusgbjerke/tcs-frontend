interface Props {
  stock: number;
}

type StockStatus = "many" | "some" | "empty";

export function StockIndicator({ stock }: Props) {
  const stockStyles = {
    many: "bg-green-500",
    some: "bg-yellow-500",
    empty: "bg-red-500",
  };

  const stockText = {
    many: "Many left",
    some: "Not many left",
    empty: "Empty",
  };

  let stockStatus: StockStatus;
  if (stock === 0) {
    stockStatus = "empty";
  } else if (stock <= 5) {
    stockStatus = "some";
  } else {
    stockStatus = "many";
  }

  return (
    <div className="flex flex-nowrap items-center gap-2">
      <div
        className={`aspect-square w-3 rounded-full ${stockStyles[stockStatus]}`}
      ></div>
      <p className="text-sm">{stockText[stockStatus]}</p>
    </div>
  );
}
