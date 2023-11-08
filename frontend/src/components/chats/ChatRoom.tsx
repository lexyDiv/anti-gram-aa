import React, { useRef } from "react";
import "./styles/ChatRoom.css";
import Header from "./Header";
import GlobalLoading from "../loadings/GlobalLoading";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import ContentBox from "./ContentBox";

import MessageBox from "./MessageBox";
import { Socket } from "socket.io-client";
import FocusChatAll from "./FocusChatAll";
import FocusChatPersonal from "./FocusChatPersonal";
import ChatMenu from "./ChatMenu";
import GlobalError from "../GlobalError";

function ChatRoom({
  screen,
  socket,
}: {
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const { chats } = useSelector((state: RootState) => state.chats);
  const { globalError } = useSelector((state: RootState) => state.listing);
  const { focusChat, loading, focusMessage, menuFocusChatId } = useSelector(
    (state: RootState) => state.listing
  );
  const actualFocusMessage = useRef(focusMessage);
  actualFocusMessage.current = focusMessage;
  const actualChats = useRef(chats);
  actualChats.current = chats;
  const actualState = useRef(useSelector((state: RootState) => state.chats));
  actualState.current = useSelector((state: RootState) => state.chats);

  const chat = chats.find((chat) => chat.id === focusChat);
  const menuFocusChat = chats.find((chat) => chat.id === menuFocusChatId);

  return (
    <div id="chat-room">
      <Header screen={screen} socket={socket} />
      {chat && !chat.alien ? (
        <FocusChatAll chat={chat} screen={screen} />
      ) : (
        chat && <FocusChatPersonal chat={chat} screen={screen} />
      )}
      {!focusChat && <ContentBox screen={screen} />}
      {chat && <MessageBox chat={chat} socket={socket} screen={screen} />}
      {!loading && <GlobalLoading />}
      {menuFocusChatId && menuFocusChat && (
        <ChatMenu
          dispatch={dispatch}
          menuFocusChat={menuFocusChat}
          socket={socket}
        />
      )}
      {globalError && <GlobalError />}
    </div>
  );
}

export default ChatRoom;
