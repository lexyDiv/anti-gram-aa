import { Socket } from "socket.io-client";
import { AppDispatch } from "../store";
import { User } from "../components/personalisation/types/User";
import { changeLoad } from "../components/chats/slices/listingSlice";

export function getChatsSocket({
  dispatch,
  socket,
  user,
}: {
  dispatch: AppDispatch;
  socket: Socket;
  user: User;
}): void {
  if (user) {
    dispatch(changeLoad(false));
    socket.emit("get:chats", { userId: user.id, userNickName: user.nickName });
  }
}
