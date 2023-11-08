import { RefObject } from "react";
import { User } from "../components/personalisation/types/User";
import { addFetch } from "./addFetch";
import { messageReg } from "../objects/messagesReg";

export function getUsers({
  nick,
  userId,
  setUsers,
  setErr,
  setMenuLoading,
}: {
  nick: RefObject<HTMLInputElement>;
  userId: number;
  setUsers: (value: User[]) => void;
  setErr: (value: string) => void;
  setMenuLoading: (value: boolean) => void;
}): void {
  setUsers([]);
  if (nick.current?.value && nick.current?.value.length >= 3) {
    setMenuLoading(false);
    const nickName = nick.current.value;
    addFetch(`/pers/users/${nickName}/${userId}`, "GET").then(async (res) => {
      setMenuLoading(true);
      const data = await res.json();
      if (res.status === 200) {
        data.length ? setUsers(data) : setErr("никого похожего не найдено!");
      } else {
        setErr(messageReg("load"));
      }
    });
  } else {
    setErr("минимум три символа!");
  }
}
