import Image, { StaticImageData } from "next/image";

interface Props {
  children: React.ReactNode;
  img: StaticImageData;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  pointer?: boolean;
}

// Picture ratio 1: 1,5

export const Card: React.FC<Props> = ({
  children,
  img,
  onClick,
  pointer = false,
}) => {
  return (
    <article
      onClick={onClick}
      className={`bg-primary-400 rounded w-60 shadow-md ${
        pointer ? "cursor-pointer" : ""
      }`}
    >
      <Image src={img} className={`w-60 rounded shadow-md`} alt="A image" />
      <div className="p-4">{children}</div>
    </article>
  );
};
