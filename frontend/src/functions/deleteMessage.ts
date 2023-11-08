import { Socket } from "socket.io-client";
import { Message } from "../components/chats/types/Message";
import { Chat } from "../components/chats/types/Chat";
import { AppDispatch } from "../store";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function deleteMessage({
  message,
  socket,
  chat,
  userId,
  dispatch,
}: {
  message: Message;
  socket: Socket;
  chat: Chat;
  userId: number;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  socket.emit("message/delete", {
    messageId: message.id,
    chatId: message.chat_id,
    forvard: chat.forvard,
    stepsPlan: chat.stepsPlan,
    userId,
  });
}
