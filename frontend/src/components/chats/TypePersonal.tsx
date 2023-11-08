import React from "react";
import { Chat } from "./types/Chat";
import { stringFormat } from "../../functions/stringFormate";
import { checkVieweds } from "../../functions/checkVieweds";
import { User } from "../personalisation/types/User";

function TypePersonal({
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

  const foto =
    chat.alien && chat.alien.foto
      ? chat.alien.foto
      : "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13";

  return (
    <>
      {chat.alien && (
        <>
          <img className="chat-foto" src={foto} alt="img" />
          {chat.online ? (
            <div className="online"></div>
          ) : (
            <div className="offline"></div>
          )}
          <div className="chat-content">
            <h5 className="chat-name">
              {stringFormat({ type: 1, str: chat.alien.nickName, screen })}
            </h5>
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
      )}
    </>
  );
}

export default TypePersonal;
