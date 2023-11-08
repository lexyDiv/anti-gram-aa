import React from "react";
import { Chat } from "../types/Chat";
import { AppDispatch, RootState } from "../../../store";
import { addTypeAll } from "../../../functions/addTypeAll";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { User } from "../../personalisation/types/User";
import { SetEnterPass } from "../types/SetEntarPass";
import { EnterPass } from "../types/EntarPass";

function SelectChat({
  chat,
  dispatch,
  socket,
  setMenu,
  user,
  setEnterPass,
  enterPass,
}: {
  chat: Chat;
  dispatch: AppDispatch;
  socket: Socket;
  setMenu: (value: boolean) => void;
  user: User;
  setEnterPass: SetEnterPass;
  enterPass: EnterPass;
}): JSX.Element {
  const { chats } = useSelector((state: RootState) => state.chats);
  const name =
    chat.name.length <= 10 ? chat.name : chat.name.slice(0, 10) + "...";
  return (
    <div
      className="select-chat"
      style={{ borderColor: `${!enterPass.id ? "rgba(38, 41, 41)" : "red"}` }}
      onClick={() => {
        chat.status && !chats.find((el) => el.id === chat.id)
          ? setEnterPass({ id: chat.id, status: chat.status })
          : user &&
            addTypeAll({
              socket,
              dispatch,
              chats,
              chatId: chat.id,
              setMenu,
              userId: user.id,
              userNickName: user.nickName,
            });
      }}
    >
      <img id="select-chat-foto" src={chat.foto} alt="img" />
      <div id="select-chat-body">
        <p style={{ marginTop: "5px", fontWeight: "600" }}>{name}</p>
        <div style={{ display: "flex", height: "20px", marginTop: "-20px" }}>
          <p>участников :</p>
          <p style={{ color: "green" }}>{chat.allUsers}</p>
        </div>
        <div style={{ display: "flex", height: "20px", marginBottom: "8px" }}>
          <p>статус :</p>
          {chat.status ? (
            <p style={{ color: "red", fontStyle: "italic" }}>закрытый</p>
          ) : (
            <p style={{ color: "green", fontStyle: "italic" }}>открытый</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectChat;
