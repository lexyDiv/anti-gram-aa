import React from "react";
import { Chat } from "../../types/Chat";

function MessageComponent({
  obj,
  chat,
}: {
  obj: { teg: string; data: string };
  chat: Chat;
}): JSX.Element {
  const { teg, data } = obj;

  return (
    <>
      {chat.type !== "personal" ? (
        <>
          {teg === "p" && <p className="message-p">{data}</p>}
          {teg === "img" && <img className="my-message-img" src={data} />}
          {teg === "a" && (
            <a style={{ margin: "20px" }} href={data}>
              {data}
            </a>
          )}
        </>
      ) : (
        <>
          {teg === "p" && <p className="message-p-personal">{data}</p>}
          {teg === "img" && (
            <img className="my-message-img-personal" src={data} />
          )}
          {teg === "a" && (
            <a style={{ margin: "20px" }} href={data}>
              {data}
            </a>
          )}
        </>
      )}
    </>
  );
}

export default MessageComponent;
