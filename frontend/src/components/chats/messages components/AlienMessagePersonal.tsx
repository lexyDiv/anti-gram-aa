import React, { MutableRefObject } from "react";
import { Message } from "../types/Message";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";
import { getMessageContent } from "../../../functions/getMessageContent";
import { useAppDispatch } from "../../../store";
import "./styles/AlienMessagePersonal.css";
import About from "./subComponents/About";
import MessageComponent from "./subComponents/MessageComponent";
import { emojis } from "../../../objects/emojis";
import { updateFocusMessage } from "../slices/listingSlice";

function AlienMessagePersonal({
  socket,
  message,
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
  const content = getMessageContent({ string: message.body });
  const dispatch = useAppDispatch();
  const date = JSON.parse(message.date);

  return (
    <div
      className="alien-message-personal-line"
      data-messageid={message.id}
      data-vieweds={message.Vieweds.length}
      data-type="alien"
      style={{ display: "flex" }}
    >
      <div
        className="alien-message-personal-body"
        style={{
          borderColor: `${
            focusMessage === message.id ? "red" : "rgb(61, 61, 126)"
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
              src="https://linoplanet.ru/assets/template/linoplanet/img/png/list.png"
              alt="img"
            />
          </div>
          <div className="my-gets-personal">
            <p className="my-time my-time-personal">{date.time.slice(0, -3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlienMessagePersonal;
