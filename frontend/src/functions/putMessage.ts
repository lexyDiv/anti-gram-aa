import { Socket } from "socket.io-client";
import { Message } from "../components/chats/types/Message";
import { AppDispatch } from "../store";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function putMessage({
  message,
  socket,
  text,
  image,
  emojiId,
  dispatch,
}: {
  message: Message;
  socket: Socket;
  text: string;
  image: string;
  emojiId: number;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  socket.emit("put/message", {
    chatId: message.chat_id,
    messageId: message.id,
    body: text,
    image,
    emojiId,
  });
}
