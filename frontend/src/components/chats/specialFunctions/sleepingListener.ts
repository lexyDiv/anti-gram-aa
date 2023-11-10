import { MutableRefObject } from "react";
import { User } from "../../personalisation/types/User";
import { addFetch } from "../../../functions/addFetch";

export function sleepingListener({
  user,
  dataChats,
}: {
  user: MutableRefObject<User>;
  dataChats: boolean;
}): void {
  setInterval(() => {
    if (user.current && dataChats) {
      addFetch(`/special/sleeping/${user.current.nickName}`, "GET")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.message && data.message !== "ok") {
            window.location.reload();
          }
        });
    }
  }, 10000);
}
