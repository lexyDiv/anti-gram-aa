import React, { MutableRefObject } from "react";
import { getMessageContent } from "../../../../functions/getMessageContent";
import { Message } from "../../types/Message";
import { stringFormat } from "../../../../functions/stringFormate";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { Chat } from "../../types/Chat";
import { Socket } from "socket.io-client";
import { goToAboutMessageFetch } from "../../slices/chatsSlice";

function About({
  message,
  screen,
  chat,
  dispatch,
  messageBox,
}: {
  message: Message;
  screen: { width: number; height: number };
  chat: Chat;
  socket: Socket;
  dispatch: AppDispatch;
  messageBox: MutableRefObject<HTMLElement | null>;
}): JSX.Element {
  const string = message.aboutMessage
    ? getMessageContent({ string: message.aboutMessage.body }).find(
        (el) => el.teg === "p" && el.data.length
      )?.data
    : "Автор удалил сообщение";
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {user && message.user_id === user.id ? (
        <>
          <div
            className="about"
            onClick={() => {
              message.aboutMessage &&
                user &&
                dispatch(
                  goToAboutMessageFetch({
                    dispatch,
                    aboutMessage: message.aboutMessage,
                    chat,
                    messageBox,
                    userId: user.id,
                  })
                );
            }}
          >
            <div className="about-line"></div>

            <div className="about-data">
              <h5 style={{ color: "violet" }}>
                {message.aboutMessage && message.aboutMessage.User
                  ? `${stringFormat({
                      type: 1,
                      str: message.aboutMessage.User.nickName,
                      screen,
                    })}`
                  : ""}
              </h5>
              <p>{string && stringFormat({ type: 1, str: string, screen })}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="about-alien"
            onClick={() => {
              message.aboutMessage &&
                user &&
                dispatch(
                  goToAboutMessageFetch({
                    dispatch,
                    aboutMessage: message.aboutMessage,
                    chat,
                    messageBox,
                    userId: user.id,
                  })
                );
            }}
          >
            <div className="about-line-alien"></div>

            <div className="about-data-alien">
              <h5 style={{ color: "yellow" }}>
                {message.aboutMessage && message.aboutMessage.User
                  ? `${stringFormat({
                      type: 1,
                      str: message.aboutMessage.User.nickName,
                      screen,
                    })}`
                  : ""}
              </h5>
              <p>{string && stringFormat({ type: 1, str: string, screen })}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default About;
