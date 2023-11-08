import { RefObject } from "react";
import { validFotoFormat } from "../../../functions/validFotoFormat";

export function regFotoInOutOrder({
  setMessage,
  inputOut,
  inputIn,
  setFotoType,
}: {
  setMessage: (value: string) => void;
  inputOut: RefObject<HTMLInputElement>;
  inputIn: RefObject<HTMLInputElement>;
  setFotoType: (value: string) => void;
}): void {
  if (
    inputIn.current &&
    inputOut.current &&
    validFotoFormat({ str: inputIn.current.value })
  ) {
    setFotoType("in");
    inputOut.current.value = "";
  } else {
    setMessage("это не фотка!");
    setFotoType("out");
  }
}
