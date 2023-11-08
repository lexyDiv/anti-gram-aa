import { RefObject } from "react";
import axiosInstance from "../instance";
import { AppDispatch } from "../../../store";
import { registration } from "../slises/userSlice";
import { NavigateFunction } from "react-router-dom";
import { changeLoad } from "../../chats/slices/listingSlice";

export function userRegisration({
  nickValid,
  inputPassword,
  inputNick,
  inputIn,
  inputOut,
  setMessage,
  dispatch,
  navigate,
}: {
  nickValid: string;
  inputPassword: RefObject<HTMLInputElement>;
  inputNick: RefObject<HTMLInputElement>;
  inputIn: RefObject<HTMLInputElement>;
  inputOut: RefObject<HTMLInputElement>;
  setMessage: (value: string) => void;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}): void {
  if (!nickValid || nickValid === "bad") {
    setMessage("Не подходящий ник!");
  } else if (
    inputPassword.current &&
    inputNick.current &&
    inputIn.current &&
    inputOut.current
  ) {
    const password = inputPassword.current.value;
    const nick = inputNick.current.value;
    const image = inputIn.current.files;
    const foto = inputOut.current.value;
    if (password.length < 4) {
      setMessage("Пароль не короче четырёх знаков!");
    } else {
      dispatch(changeLoad(false));
      const formData = new FormData();
      if (image) {
        formData.append("image", image["0"]);
      }
      formData.append("password", password);
      formData.append("foto", foto);
      formData.append("nickName", nick);
      axiosInstance.post("/pers", formData).then((response) => {
        dispatch(changeLoad(true));
        if (response.status === 200) {
          const { data } = response;
          if (data.message === "ok") {
            localStorage.setItem("token", data.accessToken);
            dispatch(registration(data.user));
            navigate("/chats");
          } else {
            setMessage(data.message);
          }
        } else {
          setMessage("Проблемы на сервере, попробуйте позже!");
        }
      });
    }
  }
}
