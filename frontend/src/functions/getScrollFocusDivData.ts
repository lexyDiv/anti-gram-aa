import { MutableRefObject } from "react";

export function getScrollFocusDivData({
  messageBox,
  scrollFocusMessageId,
}: {
  messageBox: MutableRefObject<HTMLElement | null>;
  scrollFocusMessageId: number;
}): number {
  if (messageBox.current) {
    let heightAcc = 0;
    for (let i = 0; i < messageBox.current.children.length; i += 1) {
      const messageDiv = messageBox.current.children[i];
      const messageId = Number(messageDiv.getAttribute("data-messageid"));
      if (messageId === scrollFocusMessageId) {
        return heightAcc;
      } else {
        heightAcc += messageDiv.getBoundingClientRect().height + 10;
      }
    }
  }
  return 0;
}
