import { RefObject } from "react";
import { addFetch } from "./addFetch";
import { messageReg } from "../objects/messagesReg";
import { Chat } from "../components/chats/types/Chat";

export function GetChatsAll({
  chatName,
  setErr,
  setMenuLoading,
  setChatsAll,
}: {
  chatName: RefObject<HTMLInputElement>;
  setErr: (value: string) => void;
  setMenuLoading: (value: boolean) => void;
  setChatsAll: (value: Chat[]) => void;
}): void {
  if (chatName.current && chatName.current.value.length >= 3) {
    setMenuLoading(false);
    const name = chatName.current.value;
    addFetch(`/chats/get/allChats/${name}`, "GET").then(async (res) => {
      setMenuLoading(true);
      const data = await res.json();
      if (res.status === 200) {
        setChatsAll(data);
        !data.length && setErr("ничего такого нет!");
      } else {
        setErr(messageReg("load"));
      }
    });
  } else {
    setErr("нужно минимум три знака!");
  }
}
