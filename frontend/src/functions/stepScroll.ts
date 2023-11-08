import { MutableRefObject } from "react";
import { getScrollFocusDivData } from "./getScrollFocusDivData";

export function stepingScroll({
  messageBox,
  scrollFocusMessageId,
  type,
}: {
  messageBox: MutableRefObject<HTMLElement | null>;
  scrollFocusMessageId: number;
  type: number;
}): void {
  if (type === 1) {
    setTimeout(() => {
      messageBox.current
        ? (messageBox.current.scrollTop = messageBox.current.scrollHeight)
        : false;
    }, 0);
  }
  setTimeout(() => {
    if (messageBox.current) {
      const divData = getScrollFocusDivData({
        messageBox,
        scrollFocusMessageId,
      });

      const scrollDelta = divData - messageBox.current.scrollTop;
      for (let i = 0; i < 10; i += 1) {
        setTimeout(() => {
          messageBox.current
            ? (messageBox.current.scrollTop += scrollDelta / 10)
            : false;
        }, 30 * i);
      }
    }
  }, 1);
}
