import React from "react";
import { LogoLItera } from "./types/LogoLitera";

function LiteraItem({
  litera,
  width,
}: {
  litera: LogoLItera;
  width: number;
}): JSX.Element {
  return (
    <h1
      style={{
        left: `${litera.left + 15}%`,
        top: `${litera.top}%`,
        fontSize: `${width / 10}px`,
        color: `${litera.color}`,
        transition: `left 3s ease 0.8s, top 4s ease 0.8s, color 4s`,
      }}
      className="litera"
    >
      {litera.litera}
    </h1>
  );
}

export default LiteraItem;
