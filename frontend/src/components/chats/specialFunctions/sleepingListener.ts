import { MutableRefObject } from "react";
import { User } from "../../personalisation/types/User";
import { Socket } from "socket.io-client";

export function sleepingListener({
  user,
  socket,
}: {
  user: MutableRefObject<User>;
  socket: Socket;
}): void {
  setInterval(() => {
    if (user.current) {
      const contacts = user.current.Contacts.map(
        (contact) => contact.alienNickName
      );
      socket.emit("check:sleeping", {
        userNick: user.current.nickName,
        userId: String(user.current.id),
        contacts,
      });
    }
  }, 10000);
}
