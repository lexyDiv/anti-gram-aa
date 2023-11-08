import React, { useState } from "react";
import "./styles/ChatMenu.css";
import { Chat } from "./types/Chat";
import { AppDispatch, RootState } from "../../store";
import { updateMenuFocusChat } from "./slices/listingSlice";
import { deleteChat } from "../../functions/deleteChat";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import ChatInfo from "./ChatInfo";

function ChatMenu({
  menuFocusChat,
  dispatch,
  socket,
}: {
  menuFocusChat: Chat;
  dispatch: AppDispatch;
  socket: Socket;
}): JSX.Element {
  const [del, setDel] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [info, setInfo] = useState(false);
  return (
    <div
      id="chat-menu-screen"
      onClick={() => {
        !info ? dispatch(updateMenuFocusChat(null)) : setInfo(false);
      }}
    >
      {!info ? (
        <>
          <div
            id="my-message-menu-body"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {menuFocusChat.type === "all" && (
              <p
                className="my-message-menu-item"
                onClick={() => {
                  setInfo(true);
                }}
              >
                о чате
              </p>
            )}
            {!del ? (
              <p
                className="my-message-menu-item"
                onClick={() => {
                  setDel(true);
                }}
              >
                удалить
              </p>
            ) : (
              <>
                <p id="q-del">удалить ?</p>
                <div id="my-message-menu-del">
                  <h5
                    id="del-y"
                    className="my-message-menu-item"
                    onClick={() => {
                      user &&
                        deleteChat({
                          userId: user.id,
                          chatId: menuFocusChat.id,
                          userNickName: user.nickName,
                          socket,
                          dispatch,
                        });
                    }}
                  >
                    да
                  </h5>
                  <h5
                    id="del-n"
                    className="my-message-menu-item"
                    onClick={() => {
                      setDel(false);
                    }}
                  >
                    нет
                  </h5>
                </div>
              </>
            )}
          </div>
          <div
            id="my-message-menu-closed"
            onClick={() => {
              dispatch(updateMenuFocusChat(null));
            }}
          >
            <p>x</p>
          </div>
        </>
      ) : (
        <ChatInfo chat={menuFocusChat}/>
      )}
    </div>
  );
}

export default ChatMenu;
