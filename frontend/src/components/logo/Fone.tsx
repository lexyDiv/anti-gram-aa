import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LiteraItem from "./LiteraItem";

function Fone({ width }: { width: number }): JSX.Element {
  const { literas } = useSelector((state: RootState) => state.literas);
  const [color, setColor] = useState("white");

  useEffect(() => {
    setTimeout(() => {
      setColor("black");
    }, 100);
  }, []);

  return (
    <div
      id="fone"
      style={{
        background: `${color}`,
        transition: `background 3s`,
      }}
    >
      {literas.map((litera) => (
        <LiteraItem key={litera.id} litera={litera} width={width} />
      ))}
    </div>
  );
}

export default Fone;
