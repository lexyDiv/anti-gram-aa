import { Socket } from "socket.io-client";
import { Chat } from "../components/chats/types/Chat";
import { AppDispatch } from "../store";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function addMessage({
  socket,
  chat,
  text,
  image,
  emojiId,
  user_id,
  dispatch,
}: {
  socket: Socket;
  chat: Chat;
  text: string;
  image: string;
  emojiId: number;
  user_id: number;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  socket.emit("chat:outgoing", {
    chatId: String(chat.id),
    body: text,
    image,
    emojiId,
    user_id,
    alienId: chat.alien?.id,
    alienNickName: chat.alien?.nickName,
  });
}
