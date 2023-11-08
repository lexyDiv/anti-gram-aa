import { Socket } from "socket.io-client";
import { AppDispatch } from "../store";
import { Chat } from "../components/chats/types/Chat";
import {
  changeLoad,
  updateFocusChat,
} from "../components/chats/slices/listingSlice";

export function addTypeAll({
  socket,
  dispatch,
  chats,
  chatId,
  setMenu,
  userId,
  userNickName,
}: {
  dispatch: AppDispatch;
  socket: Socket;
  chats: Chat[];
  chatId: number;
  setMenu: (value: boolean) => void;
  userId: number;
  userNickName: string;
}): void {
  const chat = chats.find((chat) => chat.id === chatId);
  setMenu(false);
  if (chat) {
    dispatch(updateFocusChat(chatId));
  } else {
    dispatch(changeLoad(false));
    socket.emit("add:chat:all", { chatId, userId, userNickName });
  }
}
