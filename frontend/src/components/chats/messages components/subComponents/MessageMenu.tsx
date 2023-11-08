import React from "react";
import "../../styles/messageMenu.css";
import { Message } from "../../types/Message";
import { User } from "../../../personalisation/types/User";
import { Socket } from "socket.io-client";
import { Chat } from "../../types/Chat";
import MyMessageMenu from "./MyMessageMenu";

function MessageMenu({
  screen,
  message,
  user,
  socket,
  chat,
}: {
  screen: { width: number; height: number };
  message: Message;
  user: User;
  socket: Socket;
  chat: Chat;
}): JSX.Element {
  return (
    <>
      {user && message.User && (
        <MyMessageMenu
          screen={screen}
          message={message}
          socket={socket}
          chat={chat}
        />
      )}
    </>
  );
}

export default MessageMenu;
