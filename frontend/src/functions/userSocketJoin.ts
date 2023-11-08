import { Socket } from "socket.io-client";
import { User } from "../components/personalisation/types/User";

export function userSocketJoin({
  user,
  socket,
}: {
  user: User;
  socket: Socket;
}): void {
  if (user) {
    const contacts = user.Contacts.map((contact) => contact.alienNickName);
    socket.emit("user/join", {
      userNick: user.nickName,
      userId: String(user.id),
      contacts,
    });
  }
}
