import { RefObject } from "react";

export function inputOutDefault({
  inputOut,
  inputIn,
  setFotoType,
}: {
  inputOut: RefObject<HTMLInputElement>;
  inputIn: RefObject<HTMLInputElement>;
  setFotoType: (value: string) => void;
}): void {
  if (inputIn.current && inputOut.current && inputOut.current.value.length) {
    inputIn.current.value = "";
    setFotoType("out");
  }
}
