import React from "react";
import { useEffect, useRef, useState } from "react";
import "./styles/MessageBox.css";
import { Chat } from "./types/Chat";
import MessageField from "./MessageField";
import PenItem from "./PenItem";
import MessageItem from "./messages components/MessageItem";
import { useSelector } from "react-redux";
import { RootState, TimeOut, useAppDispatch } from "../../store";
import { oerderDates } from "../../functions/orderDates";
import { stopScrollOrder } from "../../functions/stopScrollOrder";
import { oldMessagesOrder } from "../../functions/oldMessagesOrder";
import ActualBtn from "./ActualBtn";
import { Socket } from "socket.io-client";
import { messageBoxScroll } from "../../functions/messageBoxScroll";
import { backEndVieweds } from "../../functions/backEndVieweds";
import MessageMenu from "./messages components/subComponents/MessageMenu";
import { vieweds } from "../../functions/vieweds";
import {
  deleteMessageDefault,
  get_oldMessages,
  updateStepsPlan,
} from "./slices/chatsSlice";
import { getStepsPlan } from "../../functions/getStepsPlan";
import { changeLoad } from "./slices/listingSlice";

function MessageBox({
  chat,
  socket,
  screen,
}: {
  chat: Chat;
  socket: Socket;
  screen: { width: number; height: number };
}): JSX.Element {
  const [wright, setWright] = useState(false);
  const [clickOnActual, setClickOnActual] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const messageBoxHeight = screen.height - 110;
  const actualMessages = useRef(chat.messages);
  actualMessages.current = chat.messages;
  const { focusMessage } = useSelector((state: RootState) => state.listing);

  const stopScroll = useRef<null | TimeOut>(null);

  const messageBox = useRef(document.getElementById("message-box"));
  const { loading } = useSelector((state: RootState) => state.listing);
  const [actual, setActual] = useState(false);
  const actualChat = useRef(chat);
  actualChat.current = chat;
  const { viewedsActivate } = useSelector((state: RootState) => state.listing);
  const actualViewedsActivate = useRef(viewedsActivate);
  actualViewedsActivate.current = viewedsActivate;

  const dispatch = useAppDispatch();

  useEffect(() => {
    !chat.deleteMessage &&
      messageBoxScroll({
        messageBox,
        setActual,
        chat,
        actualMessages,
        user,
        socket,
        dispatch,
        stopScroll,
        clickOnActual,
        setClickOnActual,
      });
    dispatch(deleteMessageDefault({ chatId: chat.id }));
    vieweds({
      messageBox,
      user,
      socket,
      dispatch,
      setActual,
      chat: actualChat,
      actualViewedsActivate,
    });
  }, [chat.messages.length]);

  useEffect(() => {
    setTimeout(() => {
      messageBox.current && chat.scrollTop > 0
        ? (messageBox.current.scrollTop = chat.scrollTop)
        : false;
      vieweds({
        messageBox,
        user,
        socket,
        dispatch,
        setActual,
        chat: actualChat,
        actualViewedsActivate,
      });
    }, 0);
  }, [chat.click]);

  useEffect(() => {
    backEndVieweds({
      messageBox,
      user,
      socket,
      dispatch,
      stopScroll,
      chat: actualChat,
      setActual,
      actualViewedsActivate,
    });
  }, []);

  const messages = useRef(
    chat.forvard === 1 ? chat.messages : chat.oldMessages
  );
  messages.current = chat.forvard === 1 ? chat.messages : chat.oldMessages;
  const focusMessageData =
    chat.forvard === 1
      ? chat.messages.find((message) => message.id === focusMessage)
      : chat.oldMessages.find((message) => message.id === focusMessage);
  const { images } = useSelector((state: RootState) => state.listing);

  return (
    <>
      <div
        style={{ height: `${messageBoxHeight}px` }}
        id="message-box"
        onWheel={(e) => {
          stopScrollOrder({ stopScroll, messageBox });
          messageBox.current &&
            user &&
            oldMessagesOrder({
              e,
              messageBox,
              chat,
              dispatch,
              loading,
              userId: user.id,
            });
        }}
      >
        {oerderDates({ messages: messages.current }).map((message) => (
          <MessageItem
            message={message}
            user={user}
            key={message.id}
            socket={socket}
            screen={screen}
            focusMessage={focusMessage}
            chat={chat}
            messageBox={messageBox}
          />
        ))}
      </div>

      {wright ? (
        <MessageField
          screen={screen}
          setWright={setWright}
          socket={socket}
          chat={chat}
        />
      ) : (
        <PenItem screen={screen} setWright={setWright} />
      )}
      {messageBox.current &&
        chat.stepsPlan[chat.forvard] &&
        !messageBox.current.scrollTop && (
          <img
            id="pull-up"
            src={images.down}
            alt="img"
            onClick={() => {
              const stepsPlan =
                !scroll && chat.forvard === 1
                  ? getStepsPlan({ chat, koof: 0 })
                  : chat.stepsPlan;
              !scroll &&
                chat.forvard === 1 &&
                dispatch(updateStepsPlan({ chatId: chat.id, stepsPlan }));

              const forvard = chat.forvard;
              const vector = "up";

              let offset = 0;
              let limit = 0;

              offset = stepsPlan
                .slice(forvard + 1)
                .reduce((acc, el) => acc + el, 0);
              limit = stepsPlan[forvard];

              dispatch(changeLoad(false));
              user &&
                dispatch(
                  get_oldMessages({
                    limit,
                    offset,
                    chatId: chat.id,
                    vector,
                    userId: user.id,
                    messageBox,
                    dispatch,
                  })
                );
            }}
          />
        )}
      {((messageBox.current &&
        messageBox.current.scrollHeight -
          messageBox.current.scrollTop -
          messageBox.current.getBoundingClientRect().height >
          30) ||
        chat.forvard > 1) && (
        <ActualBtn
          screen={screen}
          chat={chat}
          messageBox={messageBox}
          dispatch={dispatch}
          stopScroll={stopScroll}
          messages={actualMessages.current}
          socket={socket}
          user={user}
          setActual={setActual}
          setClickOnActual={setClickOnActual}
          clickOnActual={clickOnActual}
        />
      )}
      {focusMessageData && (
        <MessageMenu
          screen={screen}
          message={focusMessageData}
          user={user}
          socket={socket}
          chat={chat}
        />
      )}
      {actual && <p></p>}
    </>
  );
}

export default MessageBox;
