interface Props {
  checked?: boolean;
}

export function Checkbox({ checked = false }: Props) {
  const baseStyles =
    "border border-gray-300 rounded focus:outline-none focus:ring-blue-500 placeholder-gray-400";
  return (
    <>
      <input type="checkbox" checked={checked} className={`${baseStyles}`} />
    </>
  );
}
