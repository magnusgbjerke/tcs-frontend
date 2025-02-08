interface PropsHanger {
  type: "filled" | "half" | "empty";
  disabled?: boolean;
  onClick?: () => void;
  width?: number;
}

function Hanger({ type = "filled", disabled, onClick, width }: PropsHanger) {
  const hangerStyle = {
    filled: "assets/filled-hanger.svg",
    half: "assets/half-filled-hanger.svg",
    empty: "assets/hanger.svg",
  };

  return (
    <img
      src={hangerStyle[type]}
      width={width}
      onClick={disabled ? undefined : onClick}
      className={`${disabled ? "" : "cursor-pointer"}`}
    />
  );
}

interface PropsRating {
  averageRating: number;
  disabled?: boolean;
  onClick: (index: number) => void;
  width?: number;
}

export function HangerRating({
  averageRating,
  disabled = false,
  onClick,
  width = 100,
}: PropsRating) {
  function roundHalf(num: number) {
    return Math.round(num * 2) / 2;
  }

  let rounded = roundHalf(averageRating);

  let items: Array<PropsHanger> = [];

  switch (rounded) {
    case 0: {
      items = [
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 0.5: {
      items = [
        { type: "half" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 1: {
      items = [
        { type: "filled" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 1.5: {
      items = [
        { type: "filled" },
        { type: "half" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 2: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "empty" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 2.5: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "half" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 3: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "empty" },
        { type: "empty" },
      ];
      break;
    }
    case 3.5: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "half" },
        { type: "empty" },
      ];
      break;
    }
    case 4: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "empty" },
      ];
      break;
    }
    case 4.5: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "half" },
      ];
      break;
    }
    case 5: {
      items = [
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
        { type: "filled" },
      ];
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className="flex">
      {items.map((item, index) => (
        <div key={index}>
          <Hanger
            type={item.type}
            disabled={disabled}
            onClick={() => onClick(index)}
            width={width}
          />
        </div>
      ))}
    </div>
  );
}
