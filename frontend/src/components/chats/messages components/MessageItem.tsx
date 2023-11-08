import React, { MutableRefObject } from "react";
import { Message } from "../types/Message";
import { User } from "../../personalisation/types/User";
import "../styles/MessageItem.css";
import MyMessage from "./MyMessage";
import AlienMessage from "./AlienMessage";
import MessageDate from "./subComponents/MessageDate";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";

function MessageItem({
  user,
  message,
  socket,
  screen,
  focusMessage,
  chat,
  messageBox,
}: {
  message: Message;
  user: User;
  socket: Socket;
  screen: { width: number; height: number };
  focusMessage: number;
  chat: Chat;
  messageBox: MutableRefObject<HTMLElement | null>;
}): JSX.Element {
  return (
    <>
      {!message.isDate ? (
        <>
          {message.user_id === user?.id ? (
            <MyMessage
              message={message}
              screen={screen}
              socket={socket}
              chat={chat}
              messageBox={messageBox}
            />
          ) : (
            <AlienMessage
              message={message}
              socket={socket}
              screen={screen}
              chat={chat}
              focusMessage={focusMessage}
              messageBox={messageBox}
            />
          )}
        </>
      ) : (
        <MessageDate message={message} />
      )}
    </>
  );
}

export default MessageItem;
