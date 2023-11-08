import { MutableRefObject, WheelEvent } from "react";
import { Chat } from "../components/chats/types/Chat";
import {
  get_oldMessages,
  updateStepsPlan,
} from "../components/chats/slices/chatsSlice";
import { changeLoad } from "../components/chats/slices/listingSlice";
import { AppDispatch } from "../store";
import { getStepsPlan } from "./getStepsPlan";

export function oldMessagesOrder({
  e,
  messageBox,
  chat,
  dispatch,
  loading,
  userId,
}: {
  e: WheelEvent<HTMLDivElement>;
  messageBox: MutableRefObject<HTMLElement | null>;
  chat: Chat;
  userId: number;
  dispatch: AppDispatch;
  loading: boolean;
}): void {
  if (!loading) {
    return;
  }

  if (messageBox.current) {
    const scroll = messageBox.current.scrollTop;
    const maxScroll = messageBox.current.scrollHeight;
    const messageBoxData = messageBox.current.getBoundingClientRect();
    const bottom = maxScroll - scroll - messageBoxData.height;

    if (!scroll || !bottom) {
      const stepsPlan =
        !scroll && chat.forvard === 1
          ? getStepsPlan({ chat, koof: 0 })
          : chat.stepsPlan;
      !scroll &&
        chat.forvard === 1 &&
        dispatch(updateStepsPlan({ chatId: chat.id, stepsPlan }));

      const forvard = chat.forvard;
      const canDown = stepsPlan[chat.forvard - 2];
      const canUp = stepsPlan[chat.forvard];
      const vector = e.deltaY > 0 ? "down" : "up";
      const isUp = !scroll && vector === "up" && canUp;
      const isDown = scroll && canDown && vector === "down";

      let offset = 0;
      let limit = 0;

      if (isUp) {
        offset = stepsPlan.slice(forvard + 1).reduce((acc, el) => acc + el, 0);
        limit = stepsPlan[forvard];
      } else if (isDown) {
        offset = stepsPlan.slice(forvard - 1).reduce((acc, el) => acc + el, 0);
        limit = stepsPlan[forvard - 2];
        if (forvard === 2) {
          limit = 0;
          offset = 0;
        }
      }

      if (isUp || isDown) {
        dispatch(changeLoad(false));
        dispatch(
          get_oldMessages({
            limit,
            offset,
            chatId: chat.id,
            vector,
            userId,
            messageBox,
            dispatch,
          })
        );
      }
    }
  }
}
