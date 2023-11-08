import { MutableRefObject } from "react";

export function getHtmlMessage({
  id,
  messageBox,
}: {
  id: number;
  messageBox: MutableRefObject<HTMLElement | null>;
}): Element | null {
  if (messageBox.current) {
    for (let i = 0; i < messageBox.current.children.length; i += 1) {
      const htmlMessage = messageBox.current.children[i];
      if (Number(htmlMessage.getAttribute("data-messageid")) === id) {
        return htmlMessage;
      }
    }
  }
  return null;
}
