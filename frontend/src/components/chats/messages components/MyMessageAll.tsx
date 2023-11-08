import React, { MutableRefObject } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { Message } from "../types/Message";
import About from "./subComponents/About";
import { getMessageContent } from "../../../functions/getMessageContent";
import MessageComponent from "./subComponents/MessageComponent";
import { emojis } from "../../../objects/emojis";
import { updateFocusMessage } from "../slices/listingSlice";
import { Chat } from "../types/Chat";
import { Socket } from "socket.io-client";

function MyMessageAll({
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
  const { user } = useSelector((state: RootState) => state.user);

  const foto =
    user && user.foto
      ? user.foto
      : "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13";

  return (
    <div className="message" data-messageid={message.id}>
      <img className="message-user-foto" src={foto} alt="img" />
      <div
        className="my-message-basick"
        style={{
          borderColor: `${
            focusMessage === message.id
              ? "rgb(255, 0, 0, 1)"
              : "rgb(255, 0, 0, 0)"
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
        <h5 className="my-by">Вы : </h5>
        {message.image && (
          <img className="my-message-img" src={message.image} />
        )}
        <div className="message-body">
          {content.map((el, i) => (
            <MessageComponent key={i} obj={el} chat={chat} />
          ))}
        </div>

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
        <div className="my-info-time">
          <div className="my-info">
            <>
              <div className="my-likes">
                <img
                  src="https://www.pinclipart.com/picdir/big/39-397673_daumen-hoch-like-button-png-clipart.png"
                  alt="img"
                />
                <p>{message.Likes.length}</p>
              </div>

              <div className="my-likes">
                <img
                  src="https://webstockreview.net/images/reflection-clipart-self-assessment-14.png"
                  alt="img"
                />
                <p>{message.Dislikes.length}</p>
              </div>
            </>

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
          </div>
          <div className="my-time-gets">
            <p className="my-time">{date.time.slice(0, -3)}</p>
            <div className="my-gets">
              <img
                className="green"
                src="https://www.pngarts.com/files/10/Check-Mark-Free-PNG-Image.png"
                alt="img"
              />
              {message.seengs ? (
                <img
                  className="green"
                  src="https://www.pngarts.com/files/10/Check-Mark-Free-PNG-Image.png"
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

export default MyMessageAll;
