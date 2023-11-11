import { MutableRefObject } from "react";
import { addFetch } from "../../../functions/addFetch";

export function sleepingListener({
  actualData,
  actualSocketId,
}: {
  actualData: MutableRefObject<boolean>;
  actualSocketId: MutableRefObject<string>;
}): void {
  window.addEventListener("focus", () => {
   actualData.current && addFetch(`/special/sleeping/${actualSocketId.current}`, "GET")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message && data.message !== "ok") {
          window.location.reload();
        }
      });
  });
  // setInterval(() => {
  //   if (actualData.current && actualSocketId.current) {
  //     addFetch(`/special/sleeping/${actualSocketId.current}`, "GET")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data && data.message && data.message !== "ok") {
  //           window.location.reload();
  //         }
  //       });
  //   }
  // }, 10000);
}
