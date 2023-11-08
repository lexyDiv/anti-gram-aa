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
  const foto =
    like.User &&
    (like.User.foto ||
      "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13");
  const date = JSON.parse(like.date);
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const dispatch = useAppDispatch();

  return (
    <div className="message-like-item">
      {foto && <img className="l-d-user-img" src={foto} alt="img" />}

      <img
        className="l-img"
        src="https://www.pinclipart.com/picdir/big/39-397673_daumen-hoch-like-button-png-clipart.png"
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
                  src="https://icon-library.com/images/pencil-png-icon/pencil-png-icon-1.jpg"
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
