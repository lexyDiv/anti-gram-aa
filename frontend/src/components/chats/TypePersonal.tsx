import React from "react";
import { Chat } from "./types/Chat";
import { stringFormat } from "../../functions/stringFormate";
import { checkVieweds } from "../../functions/checkVieweds";
import { User } from "../personalisation/types/User";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function TypePersonal({
  chat,
  screen,
  user,
}: {
  chat: Chat;
  screen: { width: number; height: number };
  user: User;
}): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  const str = chat.messages.length
    ? chat.messages[chat.messages.length - 1].body
    : "ещё нет сообщений";

  const foto =
    chat.alien && chat.alien.foto
      ? chat.alien.foto
      : images.clearFoto;

      const num = checkVieweds({
        messages: chat.messages,
        user,
      });

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
            <div style={{display: 'flex', fontSize: "13px"}}>
          <p >новых :</p>
          <p style={{ color: `${num ? "aqua" : "white"}`, fontWeight: `${num ? '600' : '100'}` }}>{num}</p>
        </div>
          </div>
        </>
      )}
    </>
  );
}

export default TypePersonal;
