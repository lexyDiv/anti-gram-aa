import React, { MutableRefObject } from "react";
import { Message } from "../types/Message";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";
import AlienMessageAll from "./AlienMessageAll";
import AlienMessagePersonal from "./AlienMessagePersonal";

function AlienMessage({
  message,
  socket,
  screen,
  chat,
  focusMessage,
  messageBox,
}: {
  message: Message;
  socket: Socket;
  screen: { width: number; height: number };
  chat: Chat;
  focusMessage: number;
  messageBox: MutableRefObject<HTMLElement | null>;
}): JSX.Element {
  return (
    <>
      {chat.type !== "personal" ? (
        <AlienMessageAll
          socket={socket}
          message={message}
          screen={screen}
          chat={chat}
          focusMessage={focusMessage}
          messageBox={messageBox}
        />
      ) : (
        <AlienMessagePersonal
          socket={socket}
          message={message}
          screen={screen}
          chat={chat}
          focusMessage={focusMessage}
          messageBox={messageBox}
        />
      )}
    </>
  );
}

export default AlienMessage;
