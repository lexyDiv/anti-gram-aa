import { Chat } from "../components/chats/types/Chat";
import { addFetch } from "./addFetch";

export function getChatMidi({
  chat,
  setMidi,
}: {
  chat: Chat;
  setMidi: (value: number) => void;
}): void {
  addFetch(`/chatsInfo/${chat.id}`, "GET")
    .then((response) => response.json())
    .then((data) => {
      setMidi(data.length);
    });
}
