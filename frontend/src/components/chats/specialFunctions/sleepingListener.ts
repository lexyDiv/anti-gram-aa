import { MutableRefObject } from "react";
import { addFetch } from "../../../functions/addFetch";
import { Socket } from "socket.io-client";
import { User } from "../../personalisation/types/User";
import { AppDispatch } from "../../../store";
import { getChatsSocket } from "../../../functions/getChatsSocket";
import { userSocketJoin } from "../../../functions/userSocketJoin";

export function sleepingListener({
  actualData,
  actualSocketId,
  socket,
  user,
  dispatch,
}: {
  actualData: MutableRefObject<boolean>;
  actualSocketId: MutableRefObject<string>;
  socket: Socket,
  user: User,
  dispatch: AppDispatch;
}): void {
  window.addEventListener("focus", () => {
   actualData.current && addFetch(`/special/sleeping/${actualSocketId.current}`, "GET")
      .then((res) => res.json())
      .then((data) => {
       // console.log('data : ', data)
        if (user && data && data.message && data.message !== "ok") {
         // console.log('RELOAD')
         window.location.reload();
        //  userSocketJoin({ socket, user });
        //  getChatsSocket({ socket, user, dispatch });
        }
      });
  });
}
