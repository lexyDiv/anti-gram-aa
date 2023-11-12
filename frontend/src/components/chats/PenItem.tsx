import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function PenItem({
  screen,
  setWright,
}: {
  screen: { width: number; height: number };
  setWright: (value: boolean) => void;
}): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  return (
    <div
      id="pen-box"
      style={{
        marginTop: `${screen.height - 200}px`,
        marginLeft: `${screen.width - screen.width / 5}px`,
      }}
    >
      <img
        id="pen"
        onClick={() => setWright(true)}
        src={images.pen}
        alt="img"
      />
    </div>
  );
}

export default PenItem;
