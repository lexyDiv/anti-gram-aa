import { RefObject } from "react";

export function newChatFotoValid({
  setMessage,
  fotoInput,
  setFotoValid,
}: {
  setMessage: (value: string) => void;
  fotoInput: RefObject<HTMLInputElement>;
  setFotoValid: (value: boolean) => void;
}): void {
  if (fotoInput.current) {
    const fotoValue = fotoInput.current.value;
    if (fotoValue.slice(0, 4).toLowerCase() === "http") {
      setMessage("");
      setFotoValid(true);
    } else if (fotoValue.length) {
      setMessage("Не похоже на фотку");
      setFotoValid(false);
    } else {
      setMessage("");
      setFotoValid(false);
    }
  }
}
