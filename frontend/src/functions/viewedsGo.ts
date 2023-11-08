import { Socket } from "socket.io-client";
import { addViewes } from "../components/chats/slices/chatsSlice";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { AppDispatch } from "../store";

export function viewedsGo({
  newMessages,
  socket,
  user,
  dispatch,
}: {
  newMessages: Message[];
  socket: Socket;
  user: User;
  dispatch: AppDispatch;
}): void {
  newMessages.forEach((message) => {
    dispatch(addViewes({ chatId: message.chat_id, messageId: message.id }));
    user &&
      socket.emit("chat:viewed", {
        chatId: message.chat_id,
        messageId: message.id,
        userId: user.id,
        userNick: message.User?.nickName,
      });
  });
}
