import { MutableRefObject } from "react";
import { changeLoad } from "../components/chats/slices/listingSlice";
import { Message } from "../components/chats/types/Message";
import { addFetch } from "./addFetch";
import { AppDispatch } from "../store";

export async function getOldMessages({
  limit,
  offset,
  chatId,
  vector,
  userId,
  messageBox,
  dispatch,
}: {
  limit: number;
  offset: number;
  chatId: number;
  vector: string;
  userId: number;
  messageBox: MutableRefObject<HTMLElement | null>;
  dispatch: AppDispatch;
}): Promise<{ messages: Message[]; chatId: number; vector: string }> {
  return addFetch(`/chats/${limit}/${offset}/${chatId}/${userId}`, "GET")
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        if (messageBox.current) {
          vector === "up"
            ? (messageBox.current.scrollTop = 1000000)
            : (messageBox.current.scrollTop = 0);
          dispatch(changeLoad(true));
        }
      }, 1);

      return {
        messages: data.messages,
        chatId,
        vector,
      };
    })
    .catch((err) => err.message);
}
