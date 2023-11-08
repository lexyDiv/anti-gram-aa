import React, { useEffect, useState } from "react";
import { Chat } from "./types/Chat";
import { getChatMidi } from "../../functions/getChatMidi";

function ChatInfo({ chat }: { chat: Chat }): JSX.Element {
  const [midi, setMidi] = useState(0);
  useEffect(() => {
    getChatMidi({ chat, setMidi });
  }, []);
  return (
    <div id="chat-info">
      <div className="chat-info-item">
        <p>всего участников :</p>
        <p className="res">{midi}</p>
      </div>
      <div className="chat-info-item">
        <p>тип чата :</p>
        <p className="res">общественный</p>
      </div>
      <div className="chat-info-item">
        <p>статус :</p>
        <p
          style={{ color: `${!chat.status ? "yellow-green" : "red"}` }}
          className="res"
        >
          {!chat.status ? "открытый" : "закрытый"}
        </p>
      </div>
      {chat.status && (
        <div className="chat-info-item">
          <p>пароль :</p>
          <p style={{ color: "yellow" }} className="res">
            {chat.status}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatInfo;
