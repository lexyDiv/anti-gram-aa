import { MutableRefObject } from "react";
import { viewedsControl } from "./viewedControl";
import { User } from "../components/personalisation/types/User";
import { Socket } from "socket.io-client";
import { AppDispatch, TimeOut } from "../store";
import { Chat } from "../components/chats/types/Chat";
import { scrollTopChat } from "../components/chats/slices/chatsSlice";

export function backEndVieweds({
  messageBox,
  user,
  socket,
  dispatch,
  stopScroll,
  chat,
  setActual,
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
    document.getElementById("back-to-chats")?.addEventListener("click", () => {
      messageBox.current &&
        messageBox.current &&
        dispatch(
          scrollTopChat({
            chatId: chat.current.id,
            scrollTop: messageBox.current.scrollTop,
          })
        );
    });
  }, 0);
  viewedsControl({
    messageBox,
    user,
    socket,
    dispatch,
    stopScroll,
    chat: chat,
    setActual,
    actualViewedsActivate,
  });
}
