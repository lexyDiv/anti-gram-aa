import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { Chat } from "../types/Chat";
import { GetChatsAll } from "../../../functions/getChatsAll";
import SelectChat from "./SelectChat";
import { Socket } from "socket.io-client";
import { EnterPass } from "../types/EntarPass";
import { SetEnterPass } from "../types/SetEntarPass";

function GetChats({
  setMenuLoading,
  socket,
  setMenu,
  enterPass,
  setEnterPass,
}: {
  setMenuLoading: (value: boolean) => void;
  socket: Socket;
  setMenu: (value: boolean) => void;
  enterPass: EnterPass;
  setEnterPass: SetEnterPass;
}): JSX.Element {
  const [chatsAll, setChatsAll] = useState<Chat[]>([]);
  const chatName = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [err, setErr] = useState("");
  return (
    <div id="get-users">
      <p style={{ color: "white", marginLeft: "-35px" }}>
        веедите название чата
      </p>
      <div id="get-box">
        <input type="text" ref={chatName} onClick={() => setErr("")} />
        <img
          src="https://static.tildacdn.com/tild6337-3832-4661-a230-623831396130/magnifying-glass_4.png"
          alt="img"
          onClick={() => {
            GetChatsAll({
              chatName,
              setErr,
              setMenuLoading,
              setChatsAll,
            });
          }}
        />
      </div>
      {chatsAll.length ? (
        <div id="users-box">
          {chatsAll.map((chat) => (
            <SelectChat
              key={chat.id}
              chat={chat}
              dispatch={dispatch}
              socket={socket}
              setMenu={setMenu}
              user={user}
              setEnterPass={setEnterPass}
              enterPass={enterPass}
            />
          ))}
        </div>
      ) : (
        err && (
          <div id="users-err">
            <p>{err}</p>
          </div>
        )
      )}
    </div>
  );
}

export default GetChats;
