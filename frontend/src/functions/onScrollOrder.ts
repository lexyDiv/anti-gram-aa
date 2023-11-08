import { Socket } from "socket.io-client";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { viewedsGo } from "./viewedsGo";
import { AppDispatch } from "../store";

export function onScrollOrder({
  box,
  actualMessages,
  socket,
  user,
  dispatch,
}: {
  box: HTMLElement;
  actualMessages: Message[];
  socket: Socket;
  user: User;
  dispatch: AppDispatch;
}): void {
  box.scrollTop = 1;
  box.addEventListener("scroll", () => {
    const target = box;
    const newMessages: Message[] = [];
    const div = target.getBoundingClientRect();
    for (let i = 0; i < target.children.length; i++) {
      const child = target.children[i];
      const messageId = Number(child.getAttribute("data-messageid"));
      const vieweds = Number(child.getAttribute("data-vieweds"));
      const rect = child.getBoundingClientRect();
      const message = actualMessages.find(
        (message) => message.id === messageId
      );

      rect.y <= div.y + div.height &&
        message &&
        messageId &&
        !vieweds &&
        newMessages.push(message);
    }
    viewedsGo({ socket, newMessages, user, dispatch });
  });
}
