import { Chat } from "../components/chats/types/Chat";
import { Message } from "../components/chats/types/Message";
import { MutableRefObject } from "react";
import { AppDispatch } from "../store";
import { addFetch } from "./addFetch";
import { changeLoad } from "../components/chats/slices/listingSlice";
import { stepingScroll } from "./stepScroll";

export async function goToAboutMessage({
  dispatch,
  aboutMessage,
  chat,
  messageBox,
  userId,
}: {
  dispatch: AppDispatch;
  aboutMessage: Message;
  chat: Chat;
  messageBox: MutableRefObject<HTMLElement | null>;
  userId: number;
}): Promise<
  { messages: Message[]; forvard: number; chatId: number } | undefined
> {
  const about = chat.messages.find((message) => message.id === aboutMessage.id);
  const aboutOld = chat.oldMessages.find(
    (message) => message.id === aboutMessage.id
  );
  if (about) {
    stepingScroll({
      messageBox,
      scrollFocusMessageId: aboutMessage.id,
      type: 2,
    });
  } else if (aboutOld) {
    stepingScroll({
      messageBox,
      scrollFocusMessageId: aboutMessage.id,
      type: 2,
    });
  } else {
    const forvard = chat.forvard;
    const stepsPlan = chat.stepsPlan;
    dispatch(changeLoad(false));
    return addFetch(
      `/chatsAbout/${chat.id}/${stepsPlan.slice(forvard - 1).reverse()}/${
        aboutMessage.id
      }/${userId}`,
      "GET"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(changeLoad(true));
        stepingScroll({
          messageBox,
          scrollFocusMessageId: aboutMessage.id,
          type: 1,
        });
        return data;
      })
      .catch((err) => err.message);
  }
}
