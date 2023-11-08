import { RefObject } from "react";
import { addFetch } from "./addFetch";

export function checkNick({
  inputNick,
  setMessage,
  setNickValid,
}: {
  inputNick: RefObject<HTMLInputElement>;
  setNickValid: (value: string) => void;
  setMessage: (value: string) => void;
}): void {
  setNickValid("act");
  if (inputNick.current) {
    if (inputNick.current.value.length < 3 && inputNick.current.value.length) {
      setMessage("ник не короче трёх знаков!");
      setNickValid("bad");
    } else if (inputNick.current.value.length > 30) {
      setMessage("ник не длиннее тридцать знаков!");
      setNickValid("bad");
    } else if (inputNick.current.value.length >= 3) {
      const nick = inputNick.current.value;
      addFetch(`/pers/${nick}`, "GET")
        .then((response) => response.json())
        .then((data) => {
          if (data.err) {
            setNickValid("bad");
            setMessage("Сервер времеено не доступен!");
          } else if (data.message === "ok") {
            if (inputNick.current && inputNick.current.value.length <= 30) {
              setNickValid(data.message);
              setMessage("");
            } else {
              setMessage("ник не длиннее тридцать знаков!");
              setNickValid("bad");
            }
          } else {
            setNickValid(data.message);
            setMessage("этот ник занят!");
          }
        })
        .catch(() =>
          setMessage("Что-то идёт не так, попробуйте зарегистрироваться позже!")
        );
    } else {
      setMessage("");
    }
  }
}
