import React, { MutableRefObject } from "react";
import { Chat } from "./types/Chat";
import { AppDispatch, RootState, TimeOut } from "../../store";
import { changeForvard, clickOnChat, scrollTopChat } from "./slices/chatsSlice";
import { scrollOrder } from "../../functions/scrollOrder";
import { Message } from "./types/Message";
import { Socket } from "socket.io-client";
import { User } from "../personalisation/types/User";
import { useSelector } from "react-redux";

function ActualBtn({
  screen,
  chat,
  messageBox,
  dispatch,
  stopScroll,
  setClickOnActual,
  messages,
  socket,
  user,
  setActual,
}: {
  screen: { width: number; height: number };
  chat: Chat;
  messageBox: MutableRefObject<HTMLElement | null>;
  dispatch: AppDispatch;
  stopScroll: { current: TimeOut | null };
  setClickOnActual: (value: boolean) => void;
  messages: Message[];
  socket: Socket;
  user: User;
  setActual: (value: boolean) => void;
  clickOnActual: boolean;
}): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  return (
    <>
      <img
        id="actual-btn"
        onClick={() => {
          if (stopScroll.current) {
            clearTimeout(stopScroll.current);
            stopScroll.current = null;
          }
          dispatch(scrollTopChat({ chatId: chat.id, scrollTop: -1 }));
          dispatch(clickOnChat({ chatId: chat.id, click: true }));
          dispatch(changeForvard({ chatId: chat.id, forvard: 1 }));
          scrollOrder({
            messageBox,
            messages,
            user,
            socket,
            stopScroll,
            chat,
            setActual,
            clickOnActual: true,
            setClickOnActual,
            userClick: true,
          });
        }}
        style={{ top: `${screen.height - 65}px` }}
        src={images.down}
        alt="img"
      />
    </>
  );
}

export default ActualBtn;
