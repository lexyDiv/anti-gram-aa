import { Socket } from "socket.io-client";

export function chatRegistration({
  socket,
  chatId,
}: {
  socket: Socket;
  chatId: string;
}): void {
  socket.emit("join", { chatId });
}
