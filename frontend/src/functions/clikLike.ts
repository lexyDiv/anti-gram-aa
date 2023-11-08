import { Socket } from "socket.io-client";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { AppDispatch } from "../store";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function clickLike({
  message,
  user,
  socket,
  type,
  dispatch,
}: {
  message: Message;
  user: User;
  socket: Socket;
  type: string;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  socket.emit("click:like", {
    messageId: message.id,
    userId: user?.id,
    chatId: message.chat_id,
    type,
  });
}
