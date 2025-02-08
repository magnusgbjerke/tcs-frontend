interface Props {
  children: React.ReactNode;
  img: string;
}

// Picture ratio 1: 1,5

export const Card: React.FC<Props> = ({ children, img }) => {
  return (
    <article className="bg-primary-400 rounded w-60 shadow-md shadow-neutral-600">
      <img
        src={img}
        className={`w-60 rounded shadow-md shadow-neutral-600`}
        alt="A image"
      />
      <div className="p-4">{children}</div>
    </article>
  );
};
