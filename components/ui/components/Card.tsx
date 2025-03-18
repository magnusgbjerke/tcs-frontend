import Image, { StaticImageData } from "next/image";

interface Props {
  children: React.ReactNode;
  img: string | StaticImageData;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  pointer?: boolean;
  height: number;
  width: number;
}

// Picture ratio 1: 1,5

export const Card: React.FC<Props> = ({
  children,
  img,
  onClick,
  pointer = false,
  height,
  width,
}) => {
  return (
    <article
      onClick={onClick}
      className={`bg-primary-400 rounded w-60 shadow-md ${
        pointer ? "cursor-pointer" : ""
      }`}
    >
      <Image
        src={img}
        className={`rounded shadow-md`}
        height={height}
        width={width}
        alt="A image"
        priority
      />
      <div className="p-4">{children}</div>
    </article>
  );
};
