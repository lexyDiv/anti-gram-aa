import React from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { Like } from "../../types/Like";
import { RootState, useAppDispatch } from "../../../../store";
import { stringFormat } from "../../../../functions/stringFormate";
import { addPersonalChat } from "../../../../functions/addPersonalChat";

function MessageLikeItem({
  like,
  screen,
  socket,
}: {
  like: Like;
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  const foto =
    like.User &&
    (like.User.foto ||
      images.clearFoto);
  const date = JSON.parse(like.date);
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const dispatch = useAppDispatch();

  return (
    <div className="message-like-item">
      {foto && <img className="l-d-user-img" src={foto} alt="img" />}

      <img
        className="l-img"
        src={images.like}
        alt="img"
      />
      <div className="message-like-item-body">
        <div className="message-like-item-left">
          <p className="l-name">
            {like.User && (
              <>
                {like.User.nickName.length > 7
                  ? stringFormat({ type: 3, str: like.User.nickName, screen })
                  : like.User.nickName}
              </>
            )}
            :
          </p>
          <p className="l-date">{`${date.year} ${date.month} ${date.day}`}</p>
          <p className="l-date">{`${date.time}`}</p>
        </div>
        {user && like.User && (
          <>
            {user.id !== like.User.id ? (
              <div className="like-write">
                <img
                  src={images.pen}
                  alt="img"
                  onClick={() => {
                    addPersonalChat({
                      user,
                      alien: like.User,
                      socket,
                      chats,
                      dispatch,
                    });
                  }}
                />
              </div>
            ) : (
              <div className="blick-menu">
                <p>вы</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MessageLikeItem;
