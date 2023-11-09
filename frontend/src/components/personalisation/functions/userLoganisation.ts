import { RefObject } from "react";
import axiosInstance from "../instance";
import { AppDispatch } from "../../../store";
import { NavigateFunction } from "react-router-dom";
import { changeLoad } from "../../chats/slices/listingSlice";
import { registration } from "../slises/userSlice";
import { messageReg } from "../../../objects/messagesReg";

export function userLoganisation({
  inputNick,
  inputPassword,
  setMessage,
  dispatch,
  navigate,
}: {
  inputPassword: RefObject<HTMLInputElement>;
  inputNick: RefObject<HTMLInputElement>;
  setMessage: (value: string) => void;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}): void {
  if (inputNick.current && inputPassword.current) {
    if (inputNick.current.value.length < 3) {
      setMessage("Ник не короче трёх символов!");
    } else if (inputPassword.current.value.length < 4) {
      setMessage("Пароль не короче четырёх символов!");
    } else {
      dispatch(changeLoad(false));
      const nickName = inputNick.current.value;
      const password = inputPassword.current.value;
      const formData = new FormData();
      formData.append("nickName", nickName);
      formData.append("password", password);
      axiosInstance.put("/pers", formData).then((response) => {
        dispatch(changeLoad(true));
        if (response) {
          if (response.status === 200) {
            if (response.data.message === "ok") {
              localStorage.setItem("token", response.data.refrashToken);
              dispatch(registration(response.data.user));
              navigate("/chats");
            } else {
              setMessage(messageReg(response.data.message));
            }
          } else {
            setMessage("Проблемы на сервере, попробуйте позже!");
          }
        } else {
          setMessage("Проблемы на сервере, попробуйте позже!");
        }
      });
    }
  }
}
