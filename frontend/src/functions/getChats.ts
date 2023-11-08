import { Socket } from "socket.io-client";
import {
  changeLoad,
  setGlobalError,
} from "../components/chats/slices/listingSlice";
import { Chat } from "../components/chats/types/Chat";
import { User } from "../components/personalisation/types/User";
import { addFetch } from "./addFetch";
import { chatRegistration } from "./chatsRegistration";
import { AppDispatch } from "../store";
import { setLoadOk } from "../components/chats/slices/chatsSlice";

export async function getChats({
  user,
  socket,
  dispatch,
}: {
  user: User;
  socket: Socket;
  dispatch: AppDispatch;
}): Promise<Chat[]> {
  return addFetch(`/chats/${user?.id}`, "GET")
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        dispatch(setLoadOk());
      }, 0);
      dispatch(changeLoad(true));
      if (data.message === "ok") {
        user &&
          data.chats.forEach((chat: Chat) => {
            chatRegistration({
              chatId: String(chat.id),
              socket,
            });
          });
        return data.chats;
      }
      dispatch(setGlobalError(true));
      return [];
    })
    .catch((err) => err.message);
}
