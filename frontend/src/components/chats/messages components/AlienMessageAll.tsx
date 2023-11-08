import React, { MutableRefObject } from "react";
import { Message } from "../types/Message";
import { Socket } from "socket.io-client";
import { Chat } from "../types/Chat";
import { getMessageContent } from "../../../functions/getMessageContent";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { canLike } from "../../../functions/canLike";
import { stringFormat } from "../../../functions/stringFormate";
import MessageComponent from "./subComponents/MessageComponent";
import { emojis } from "../../../objects/emojis";
import { clickLike } from "../../../functions/clikLike";
import { updateFocusMessage } from "../slices/listingSlice";
import About from "./subComponents/About";

function AlienMessageAll({
  message,
  socket,
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
  const foto =
    message.User?.foto ||
    "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13";
  const date = JSON.parse(message.date);
  const content = getMessageContent({ string: message.body });
  const { user } = useSelector((state: RootState) => state.user);
  const canLikeData = canLike({ message, user });
  const dispatch = useAppDispatch();

  return (
    <div
      className="alien-message"
      data-messageid={message.id}
      data-vieweds={message.Vieweds.length}
      data-type="alien"
      style={{ display: "flex" }}
    >
      <img className="message-user-foto" src={foto} alt="img" />
      <div
        className="alien-message-basick"
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
        <h5 className="alien-by">{`${
          message.User &&
          stringFormat({ type: 2, str: message.User.nickName, screen })
        } : `}</h5>
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
            {
              <>
                {!chat.alien && (
                  <>
                    <div className={canLikeData ? "alien-likes" : "my-likes"}>
                      <img
                        onClick={() => {
                          canLikeData &&
                            clickLike({
                              message,
                              user,
                              socket,
                              type: "like",
                              dispatch,
                            });
                        }}
                        src="https://www.pinclipart.com/picdir/big/39-397673_daumen-hoch-like-button-png-clipart.png"
                        alt="img"
                      />
                      <p>{message.Likes.length}</p>
                    </div>

                    <div className={canLikeData ? "alien-likes" : "my-likes"}>
                      <img
                        onClick={() => {
                          canLikeData &&
                            clickLike({
                              message,
                              user,
                              socket,
                              type: "dislike",
                              dispatch,
                            });
                        }}
                        src="https://webstockreview.net/images/reflection-clipart-self-assessment-14.png"
                        alt="img"
                      />
                      <p>{message.Dislikes.length}</p>
                    </div>
                  </>
                )}
              </>
            }
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlienMessageAll;
