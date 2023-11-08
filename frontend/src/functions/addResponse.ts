import { Socket } from "socket.io-client";
import { Message } from "../components/chats/types/Message";
import { AppDispatch } from "../store";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function addResponse({
  socket,
  message,
  body,
  image,
  emojiId,
  userId,
  dispatch,
}: {
  message: Message;
  socket: Socket;
  body: string;
  image: string;
  emojiId: number;
  userId: number;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  socket.emit("add/response", {
    body,
    image,
    emojiId,
    messageId: message.id,
    userId,
    chatId: message.chat_id,
  });
}
