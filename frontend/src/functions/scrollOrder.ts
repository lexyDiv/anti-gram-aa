import { Socket } from "socket.io-client";
import { Chat } from "../components/chats/types/Chat";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { TimeOut } from "../store";
import { lastSeengMessage } from "./lastSeengMessage";

import { MutableRefObject } from "react";

export function scrollOrder({
  messageBox,
  messages,
  user,
  stopScroll,
  chat,
  clickOnActual,
  setClickOnActual,
  userClick,
}: {
  messageBox: MutableRefObject<HTMLElement | null>;
  messages: Message[];
  user: User;
  socket: Socket;
  stopScroll: { current: TimeOut | null };
  chat: Chat;
  setActual: (value: boolean) => void;
  clickOnActual: boolean;
  setClickOnActual: (value: boolean) => void;
  userClick: boolean;
}): void {
  if (chat.forvard > 1 && !userClick) {
    return;
  }
  !stopScroll.current &&
    setTimeout(() => {
      if (messageBox.current !== null) {
        !messageBox.current.scrollTop
          ? (messageBox.current.scrollTop = 1)
          : false;
        const lastMessage = lastSeengMessage({
          messages: messages,
          user,
        });
        let lastElement;
        for (let i = 0; i < messageBox.current.children.length; i++) {
          const child = messageBox.current.children[i];
          const messageId = Number(child.getAttribute("data-messageid"));
          if (messageId && messageId === lastMessage?.id) {
            lastElement = child;
            break;
          }
        }

        if (
          lastElement &&
          (messageBox.current.scrollTop === 1 || clickOnActual)
        ) {
          const rect = lastElement.getBoundingClientRect();
          const div = messageBox.current.getBoundingClientRect();
          setClickOnActual(false);

          messageBox.current.scrollTop =
            rect.y + messageBox.current.scrollTop - div.height;
        } else if (!lastMessage) {
          setTimeout(() => {
            const top = messageBox.current?.scrollTop;
            for (let i = 0; i < 10; i++) {
              setTimeout(() => {
                if (messageBox.current && typeof top === "number") {
                  messageBox.current.scrollTop +=
                    (messageBox.current.scrollHeight - top) / 10;
                }
              }, 30 * i);
            }
          }, 1);
        }
      }
    }, 0);
}
