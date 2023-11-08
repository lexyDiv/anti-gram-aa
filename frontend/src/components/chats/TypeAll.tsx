import React from "react";
import { Chat } from "./types/Chat";
import { stringFormat } from "../../functions/stringFormate";
import { checkVieweds } from "../../functions/checkVieweds";
import { User } from "../personalisation/types/User";

function TypeAll({
  chat,
  screen,
  user,
}: {
  chat: Chat;
  screen: { width: number; height: number };
  user: User;
}): JSX.Element {
  const str = chat.messages.length
    ? chat.messages[chat.messages.length - 1].body
    : "ещё нет сообщений";

  return (
    <>
      <img className="chat-foto" src={chat.foto} alt="img" />
      <div className="chat-content">
        <h5>{stringFormat({ type: 2, str: chat.name, screen })}</h5>
        <p
          style={{
            fontStyle: "italic",
            color: "greenyellow",
            fontSize: "17px",
          }}
        >
          {chat.messages.length || str
            ? stringFormat({
                type: 2,
                str,
                screen,
              })
            : false}
        </p>
        <p style={{ fontSize: "13px" }}>{`новых : ${checkVieweds({
          messages: chat.messages,
          user,
        })}`}</p>
      </div>
    </>
  );
}

export default TypeAll;
