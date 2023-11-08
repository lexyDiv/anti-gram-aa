import { MutableRefObject } from "react";
import { User } from "../components/personalisation/types/User";
import { Socket } from "socket.io-client";
import { AppDispatch, TimeOut } from "../store";
import { Chat } from "../components/chats/types/Chat";
import { vieweds } from "./vieweds";

export function viewedsControl({
  messageBox,
  user,
  socket,
  dispatch,
  setActual,
  chat,
  actualViewedsActivate,
}: {
  messageBox: MutableRefObject<HTMLElement | null>;
  user: User;
  socket: Socket;
  dispatch: AppDispatch;
  stopScroll: { current: TimeOut | null };
  chat: MutableRefObject<Chat>;
  setActual: (value: boolean) => void;
  actualViewedsActivate: MutableRefObject<boolean>;
}): void {
  setTimeout(() => {
    if (messageBox.current) {
      messageBox.current.addEventListener("scroll", () => {
        vieweds({
          messageBox,
          user,
          socket,
          dispatch,
          setActual,
          chat,
          actualViewedsActivate,
        });
      });
    }
  }, 1);
}
