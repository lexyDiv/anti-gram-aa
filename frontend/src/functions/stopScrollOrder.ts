import { MutableRefObject } from "react";
import { TimeOut } from "../store";

export function stopScrollOrder({
  stopScroll,
  messageBox,
}: {
  stopScroll: { current: TimeOut | null };
  messageBox: MutableRefObject<HTMLElement | null>;
}): void {
  if (messageBox.current) {
    const data = messageBox.current.getBoundingClientRect();

    if (
      messageBox.current.scrollHeight -
        messageBox.current.scrollTop -
        data.height >
      data.height * 2
    ) {
      if (stopScroll.current) {
        clearTimeout(stopScroll.current);
      }
      stopScroll.current = setTimeout(() => {
        stopScroll.current = null;
      }, 15000);
    } else {
      if (stopScroll.current) {
        clearTimeout(stopScroll.current);
        stopScroll.current = null;
      }
    }
  }
}
