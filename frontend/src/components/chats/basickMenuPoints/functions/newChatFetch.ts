import { RefObject } from "react";
import { Socket } from "socket.io-client";
import { AppDispatch } from "../../../../store";
import { changeLoad } from "../../slices/listingSlice";
import { User } from "../../../personalisation/types/User";

export function newChatFetch({
  nameInput,
  fotoInput,
  passwordInput,
  socket,
  setMenu,
  dispatch,
  user,
}: {
  nameInput: RefObject<HTMLInputElement>;
  fotoInput: RefObject<HTMLInputElement>;
  passwordInput: RefObject<HTMLInputElement>;
  socket: Socket;
  setMenu: (value: boolean) => void;
  dispatch: AppDispatch;
  user: User;
}): void {
  if (nameInput.current && fotoInput.current && user) {
    setMenu(false);
    dispatch(changeLoad(false));
    const name = nameInput.current.value;
    const foto = fotoInput.current.value;
    const password = passwordInput.current ? passwordInput.current.value : "";
    socket.emit("new:all:chat", {
      name,
      foto,
      password,
      userId: user.id,
      nickName: user.nickName,
    });
  }
}
