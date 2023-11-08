import { RefObject } from "react";
import axiosInstance from "../../../personalisation/instance";

export function checkNewChatName({
  setMessage,
  nameInput,
  setNameValid,
}: {
  setMessage: (value: string) => void;
  nameInput: RefObject<HTMLInputElement>;
  setNameValid: (value: string) => void;
}): void {
  if (nameInput.current) {
    if (
      nameInput.current.value.length < 3 &&
      nameInput.current.value.length <= 30 &&
      nameInput.current.value.length
    ) {
      setMessage("Название не короче трёх знаков!");
      setNameValid("bad");
    } else if (
      nameInput.current.value.length > 30 &&
      nameInput.current.value.length
    ) {
      setMessage("Название не длинее тридцати знаков!");
      setNameValid("bad");
    } else if (
      nameInput.current.value.length >= 3 &&
      nameInput.current.value.length <= 30
    ) {
      setNameValid("load");
      axiosInstance.get(`/pers/${nameInput.current.value}`).then((response) => {
        if (response) {
          if (response.status !== 200) {
            setNameValid("bad");
            setMessage("Сервер времеено не доступен!");
          } else if (response.data.message === "ok") {
            setNameValid(response.data.message);
            setMessage("");
          } else {
            setNameValid(response.data.message);
            setMessage("это название занято!");
          }
        } else {
          setNameValid("bad");
          setMessage("Не корректное название!");
        }
      });
    } else {
      setNameValid("bad");
      setMessage("");
    }
  }
}
