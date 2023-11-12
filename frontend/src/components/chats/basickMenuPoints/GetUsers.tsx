import React, { useRef, useState } from "react";
import { User } from "../../personalisation/types/User";
import { getUsers } from "../../../functions/getUsers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserItem from "./UserItem";
import { Socket } from "socket.io-client";

function GetUsers({
  setMenu,
  socket,
  setMenuLoading,
}: {
  setMenu: (value: boolean) => void;
  socket: Socket;
  setMenuLoading: (value: boolean) => void;
}): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const nick = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [err, setErr] = useState("");
  const { images } = useSelector((state: RootState) => state.listing);

  return (
    <div id="get-users">
      <p style={{ color: "white", marginLeft: '-35px' }}>веедите ник</p>
      <div id="get-box">
        <input type="text" ref={nick} onClick={() => setErr("")} />
        <img
          src={images.scan}
          alt="img"
          onClick={() => {
            user &&
              getUsers({
                nick,
                userId: user.id,
                setUsers,
                setErr,
                setMenuLoading,
              });
          }}
        />
      </div>
      {users.length ? (
        <div id="users-box">
          {users.map((user) => (
            <UserItem
              key={user?.id}
              alien={user}
              setMenu={setMenu}
              socket={socket}
            />
          ))}
        </div>
      ) : (
        err && (
          <div id="users-err">
            <p>{err}</p>
          </div>
        )
      )}
    </div>
  );
}

export default GetUsers;
