import { MutableRefObject } from "react";
import { User } from "../../personalisation/types/User";
import { addFetch } from "../../../functions/addFetch";

export function sleepingListener({
  user,
}: {
  user: MutableRefObject<User>;
}): void {
  setInterval(() => {
    if (user.current) {
        addFetch(`/chatsInfo/sleeping/${user.current.nickName}`, "GET")
        .then(res => res.json())
        .then(data => {
          if(data && data.message && data.message !== 'ok') {
            window.location.reload();
          }
        })
    }
  }, 10000);
}
