import React from "react";
import "../../chats/styles/UserItem.css";
import { User } from "../../personalisation/types/User";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { addPersonalChat } from "../../../functions/addPersonalChat";
import { Socket } from "socket.io-client";

function UserItem({
  alien,
  setMenu,
  socket,
}: {
  alien: User;
  setMenu: (value: boolean) => void;
  socket: Socket;
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const dispatch = useAppDispatch();
  const foto =
    alien && alien.foto
      ? alien.foto
      : "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13";
  const nickName =
    alien && alien.nickName.length <= 10
      ? alien.nickName
      : alien && alien.nickName.slice(0, 10) + "...";
  return (
    <div
      className="user-item"
      onClick={() => {
        setMenu(false);
        addPersonalChat({ alien, socket, user, dispatch, chats });
      }}
    >
      <img src={foto} alt="img" />
      {alien && <p>{nickName}</p>}
    </div>
  );
}

export default UserItem;
