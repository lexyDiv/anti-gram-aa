import { Socket } from "socket.io-client";
import { AppDispatch } from "../store";
import {
  changeLoad,
  updateMenuFocusChat,
} from "../components/chats/slices/listingSlice";

export function deleteChat({
  chatId,
  userId,
  userNickName,
  socket,
  dispatch,
}: {
  chatId: number;
  userId: number;
  userNickName: string;
  socket: Socket;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  dispatch(updateMenuFocusChat(null));
  socket.emit("delete/chat", { chatId, userId, userNickName });
}
