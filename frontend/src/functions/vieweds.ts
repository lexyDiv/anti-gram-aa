import { MutableRefObject } from "react";
import { viewedsGo } from "./viewedsGo";
import { User } from "../components/personalisation/types/User";
import { Socket } from "socket.io-client";
import { AppDispatch } from "../store";
import { Chat } from "../components/chats/types/Chat";
import { Message } from "../components/chats/types/Message";
import { changeViewedsActivate } from "../components/chats/slices/listingSlice";

export function vieweds({
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
  chat: MutableRefObject<Chat>;
  setActual: (value: boolean) => void;
  actualViewedsActivate: MutableRefObject<boolean>;
}): void {
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

    if (actualViewedsActivate.current) {
      return;
    }

    dispatch(changeViewedsActivate(true));
    setTimeout(() => {
      dispatch(changeViewedsActivate(false));
      const target = messageBox.current;
      if (target) {
        const newMessages: Message[] = [];
        const div = target.getBoundingClientRect();
        for (let i = 0; i < target.children.length; i++) {
          const type = target.children[i].getAttribute("data-type");
          if (type === "alien") {
            const child = target.children[i];
            const messageId = Number(child.getAttribute("data-messageid"));
            const vieweds = Number(child.getAttribute("data-vieweds"));
            const rect = child.getBoundingClientRect();
            const message =
              chat.current.messages.find(
                (message) => message.id === messageId
              ) ||
              (chat.current.forvard > 1 &&
                chat.current.oldMessages.find(
                  (message) => message.id === messageId
                ));
            rect.y + 10 <= div.y + div.height &&
              message &&
              messageId &&
              !vieweds &&
              newMessages.push(message);
          }
        }
        viewedsGo({ socket, newMessages, user, dispatch });
      }
    }, 500);
  }
}
