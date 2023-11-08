import { Socket } from "socket.io-client";
import { User } from "../components/personalisation/types/User";
import { Chat } from "../components/chats/types/Chat";
import { AppDispatch } from "../store";
import {
  changeLoad,
  updateFocusChat,
  updateFocusMessage,
} from "../components/chats/slices/listingSlice";

export function addPersonalChat({
  user,
  alien,
  socket,
  chats,
  dispatch,
}: {
  user: User;
  alien: User;
  socket: Socket;
  chats: Chat[];
  dispatch: AppDispatch;
}): void {
  if (user && alien) {
    const users =
      user.id < alien.id
        ? user.nickName + "+" + alien.nickName
        : alien.nickName + "+" + user.nickName;
    const OldChat = chats.find((chat) => chat.users === users);
    if (OldChat) {
      dispatch(updateFocusMessage(0));
      dispatch(updateFocusChat(OldChat.id));
    } else {
      dispatch(changeLoad(false));
      socket.emit("add/personal/chat", {
        users,
        userId: user.id,
        alienId: alien.id,
        userNickName: user.nickName,
        alienNickName: alien.nickName,
      });
    }
  }
}
