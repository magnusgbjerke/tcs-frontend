type Props = {
  stock: number;
};

type StockStatus = "many" | "some" | "empty";

export function StockIndicator({ stock }: Props) {
  const stockStyles = {
    many: "w-24 h-24 bg-green-500 rounded-full",
    some: "w-24 h-24 bg-yellow-500 rounded-full",
    empty: "w-24 h-24 bg-red-500 rounded-full",
  };

  let stockStatus: StockStatus;
  if (stock === 0) {
    stockStatus = "empty";
  } else if (stock <= 5) {
    stockStatus = "some";
  } else {
    stockStatus = "many";
  }

  return <div className={`${stockStyles[stockStatus]}`}></div>;
}
