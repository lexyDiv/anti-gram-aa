import { RefObject } from "react";

export function newChatPasswordValid({
  setMessage,
  passwordInput,
  setPasswordValid,
}: {
  setMessage: (value: string) => void;
  passwordInput: RefObject<HTMLInputElement>;
  setPasswordValid: (value: boolean) => void;
}): void {
  if (passwordInput.current) {
    const passwordValue = passwordInput.current.value;
    if (passwordValue.length < 4 && passwordValue.length) {
      setMessage("Пароль не короче четырёх знаков!");
      setPasswordValid(false);
    } else if (passwordValue.length) {
      setMessage("");
      setPasswordValid(true);
    } else {
      setMessage("");
      setPasswordValid(false);
    }
  }
}
