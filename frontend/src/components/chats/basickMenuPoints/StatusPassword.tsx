import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addTypeAll } from "../../../functions/addTypeAll";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";
import { EnterPass } from "../types/EntarPass";

function StatusPassword({
  setMenu,
  dispatch,
  enterPass,
  socket,
  chats,
}: {
  setMenu: (value: boolean) => void;
  dispatch: AppDispatch;
  enterPass: EnterPass;
  socket: Socket;
  chats: Chat[];
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div id="status-pass-box">
      <input
        placeholder="пароль чата"
        type="text"
        onChange={(e) => setPass(e.target.value)}
        onClick={() => setErr(false)}
      />
      <button
        onClick={() => {
          user && enterPass.status === pass
            ? addTypeAll({
                socket,
                dispatch,
                chats,
                chatId: enterPass.id,
                setMenu,
                userId: user.id,
                userNickName: user.nickName,
              })
            : setErr(true);
        }}
      >
        присоедениться
      </button>
      {err ? (
        <p style={{ color: "red", margin: "5px" }}>Неверный пароль!</p>
      ) : (
        <p style={{ color: "rgb(0,0,0,0)" }}>Papa loh!</p>
      )}
    </div>
  );
}

export default StatusPassword;
