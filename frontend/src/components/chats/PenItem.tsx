import React from "react";

function PenItem({
  screen,
  setWright,
}: {
  screen: { width: number; height: number };
  setWright: (value: boolean) => void;
}): JSX.Element {
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
        src="https://icon-library.com/images/pencil-png-icon/pencil-png-icon-1.jpg"
        alt="img"
      />
    </div>
  );
}

export default PenItem;
