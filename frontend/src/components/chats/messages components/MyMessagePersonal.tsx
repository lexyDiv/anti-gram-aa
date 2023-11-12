import React, { MutableRefObject } from "react";
import "./styles/MyMessagePersonal.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { Message } from "../types/Message";
import { getMessageContent } from "../../../functions/getMessageContent";
import MessageComponent from "./subComponents/MessageComponent";
import { Chat } from "../types/Chat";
import { emojis } from "../../../objects/emojis";
import { updateFocusMessage } from "../slices/listingSlice";
import About from "./subComponents/About";
import { Socket } from "socket.io-client";

function MyMessagePersonal({
  message,
  chat,
  screen,
  socket,
  messageBox,
}: {
  message: Message;
  chat: Chat;
  screen: { width: number; height: number };
  socket: Socket;
  messageBox: MutableRefObject<HTMLElement | null>;
}): JSX.Element {
  const { focusMessage } = useSelector((state: RootState) => state.listing);
  const content = getMessageContent({ string: message.body });
  const dispatch = useAppDispatch();
  const date = JSON.parse(message.date);
  const { images } = useSelector((state: RootState) => state.listing);

  return (
    <div className="my-message-personal-line" data-messageid={message.id}>
      <div
        className="my-message-personal-body"
        style={{
          borderColor: `${
            focusMessage === message.id ? "red" : "rgba(53, 61, 61, 0.98)"
          }`,
        }}
      >
        {message.midi_message_id && (
          <About
            message={message}
            screen={screen}
            chat={chat}
            socket={socket}
            dispatch={dispatch}
            messageBox={messageBox}
          />
        )}
        {message.image && (
          <img
            className="my-message-img-personal"
            src={message.image}
            alt="img"
          ></img>
        )}
        {content.map((el, i) => (
          <MessageComponent key={i} obj={el} chat={chat} />
        ))}
        {message.emojiId ? (
          <div className="my-message-emoji-box">
            <img
              className="my-message-emoji"
              src={emojis[message.emojiId - 1].image}
            />
          </div>
        ) : (
          false
        )}
        <div className="my-message-info-personal">
          <div
            className="my-menu"
            onClick={() => {
              dispatch(updateFocusMessage(message.id));
            }}
          >
            <img
              className="my-menu-img"
              src={images.menu}
              alt="img"
            />
          </div>
          <div className="my-gets-personal">
            <p className="my-time my-time-personal">{date.time.slice(0, -3)}</p>
            <div className="get-message-personal">
              <img
                className="green"
                src={images.green}
                alt="img"
              />
              {message.seengs ? (
                <img
                  className="green"
                  src={images.green}
                />
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMessagePersonal;
