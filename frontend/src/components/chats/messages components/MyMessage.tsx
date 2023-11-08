import React, { MutableRefObject } from "react";
import { Message } from "../types/Message";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";
import MyMessageAll from "./MyMessageAll";
import MyMessagePersonal from "./MyMessagePersonal";

function MyMessage({
  message,
  screen,
  socket,
  chat,
  messageBox,
}: {
  message: Message;
  screen: { width: number; height: number };
  socket: Socket;
  chat: Chat;
  messageBox: MutableRefObject<HTMLElement | null>;
}): JSX.Element {
  return (
    <>
      {chat.type === "all" ? (
        <MyMessageAll
          message={message}
          chat={chat}
          screen={screen}
          socket={socket}
          messageBox={messageBox}
        />
      ) : (
        <MyMessagePersonal
          message={message}
          chat={chat}
          screen={screen}
          socket={socket}
          messageBox={messageBox}
        />
      )}
    </>
  );
}

export default MyMessage;
