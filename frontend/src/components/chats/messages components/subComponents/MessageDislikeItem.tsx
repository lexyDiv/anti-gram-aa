import React from "react";

import { useSelector } from "react-redux";

import { Socket } from "socket.io-client";
import { Dislike } from "../../types/Dislike";
import { RootState, useAppDispatch } from "../../../../store";
import { stringFormat } from "../../../../functions/stringFormate";
import { addPersonalChat } from "../../../../functions/addPersonalChat";

function MessageDislikeItem({
  dislike,
  screen,
  socket,
}: {
  dislike: Dislike;
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const { images } = useSelector((state: RootState) => state.listing);
  const dispatch = useAppDispatch();
  const foto =
    dislike.User &&
    (dislike.User.foto ||
      images.clearFoto);
  const date = JSON.parse(dislike.date);
  return (
    <div className="message-like-item">
      {foto && <img className="l-d-user-img" src={foto} alt="img" />}

      <img
        className="l-img"
        src={images.dizlike}
        alt="img"
      />
      <div className="message-like-item-body">
        <div className="message-like-item-left">
          <p className="l-name">
            {dislike.User && (
              <>
                {dislike.User.nickName.length > 7
                  ? stringFormat({
                      type: 3,
                      str: dislike.User.nickName,
                      screen,
                    })
                  : dislike.User.nickName}
              </>
            )}
            :
          </p>
          <p className="l-date">{`${date.year} ${date.month} ${date.day}`}</p>
          <p className="l-date">{`${date.time}`}</p>
        </div>
        <div className="like-write">
          <img
            src={images.pen}
            alt="img"
            onClick={() => {
              addPersonalChat({
                user,
                alien: dislike.User,
                socket,
                chats,
                dispatch,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageDislikeItem;
