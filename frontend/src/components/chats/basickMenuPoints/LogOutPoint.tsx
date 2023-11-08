import React from "react";
import { LogOut } from "./functions/logOut";
import { User } from "../../personalisation/types/User";
import { AppDispatch } from "../../../store";

function LogOutPiont({
  setMenuPoint,
  user,
  dispatch,
}: {
  setMenuPoint: (value: string) => void;
  user: User;
  dispatch: AppDispatch;
}): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p id="q-del">Выйти из аккаунта ?</p>
      <div id="my-message-menu-del">
        <h5
          id="del-y"
          className="my-message-menu-item"
          onClick={() => {
            LogOut({ user, dispatch });
          }}
        >
          да
        </h5>
        <h5
          id="del-n"
          className="my-message-menu-item"
          onClick={() => {
            setMenuPoint("");
          }}
        >
          нет
        </h5>
      </div>
    </div>
  );
}

export default LogOutPiont;
