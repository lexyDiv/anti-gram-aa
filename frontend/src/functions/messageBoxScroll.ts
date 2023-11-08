import { MutableRefObject } from "react";
import { scrollOrder } from "./scrollOrder";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { Socket } from "socket.io-client";
import { AppDispatch, TimeOut } from "../store";
import { Chat } from "../components/chats/types/Chat";
import { newMessage } from "../components/chats/slices/chatsSlice";

export function messageBoxScroll({
  messageBox,
  setActual,
  chat,
  actualMessages,
  user,
  socket,
  dispatch,
  stopScroll,
  clickOnActual,
  setClickOnActual,
}: {
  messageBox: MutableRefObject<HTMLElement | null>;
  user: User;
  socket: Socket;
  dispatch: AppDispatch;
  stopScroll: { current: TimeOut | null };
  chat: Chat;
  setActual: (value: boolean) => void;
  clickOnActual: boolean;
  setClickOnActual: (value: boolean) => void;
  actualMessages: MutableRefObject<Message[]>;
}): void {
  setTimeout(() => {
    messageBox.current = document.getElementById("message-box");
    if (messageBox.current) {
      const scroll = messageBox.current.scrollTop;
      const maxScroll = messageBox.current.scrollHeight;
      const messageBoxData = messageBox.current.getBoundingClientRect();
      const bottom = maxScroll - scroll - messageBoxData.height;
      if (!bottom) {
        setActual(false);
      } else {
        setActual(true);
      }
    }
  }, 0);

  if (!chat.click || chat.scrollTop === -1 || chat.newMessage) {
    dispatch(newMessage({ chatId: chat.id, newMessage: false }));
    scrollOrder({
      messageBox,
      messages: actualMessages.current,
      user,
      socket,
      stopScroll,
      chat,
      setActual,
      clickOnActual,
      setClickOnActual,
      userClick: false,
    });
  }
}
