import React, { useEffect, useRef, useState } from "react";
import PasswordPoint from "./basickMenuPoints/PasswordPoint";
import AvatarPoint from "./basickMenuPoints/AvatarPoint";
import GetUsers from "./basickMenuPoints/GetUsers";
import { Socket } from "socket.io-client";
import MenuLoading from "./basickMenuPoints/MenuLoading";
import GetChats from "./basickMenuPoints/GetChats";
import NewChatPoint from "./basickMenuPoints/NewChatPoint";
import StatusPassword from "./basickMenuPoints/StatusPassword";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { EnterPass } from "./types/EntarPass";
import { SetEnterPass } from "./types/SetEntarPass";
import LogOutPiont from "./basickMenuPoints/LogOutPoint";

function BasickMenuPoint({
  setMenuPoint,
  outPoint,
  setOutPoint,
  menuPoint,
  screen,
  setMenu,
  socket,
  setEnterPass,
  enterPass,
}: {
  setMenuPoint: (value: string) => void;
  outPoint: boolean;
  setOutPoint: (value: boolean) => void;
  menuPoint: string;
  screen: { width: number; height: number };
  setMenu: (value: boolean) => void;
  setEnterPass: SetEnterPass;
  enterPass: EnterPass;
  socket: Socket;
}): JSX.Element {
  const [left, setLeft] = useState(-300);
  const menuBoxPoint = useRef<HTMLDivElement>(null);
  const [menuLoading, setMenuLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { chats } = useSelector((state: RootState) => state.chats);
  const { user } = useSelector((state: RootState) => state.user);
  //const [enterPass, setEnterPass] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLeft(0);
    }, 20);
  }, []);

  useEffect(() => {
    if (outPoint) {
      setLeft(-300);
      setTimeout(() => {
        setMenuPoint("");
        setOutPoint(false);
      }, 500);
    }
  }, [outPoint]);

  const heightRes = screen.height < 500;
  const overflowY =
    heightRes &&
    menuPoint !== "user" &&
    menuPoint !== "get" &&
    menuPoint !== "add"
      ? "scroll"
      : "hidden";
  return (
    <div
      id="basick-menu-body"
      style={{
        left: `${left}px`,
        height: `${heightRes ? String(`${screen.height - 70}px`) : "440px"}`,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div id="basick-box-point" style={{ overflowY: `${overflowY}` }} ref={menuBoxPoint}>
        {menuPoint === "pass" && (
          <PasswordPoint setMenuLoading={setMenuLoading} />
        )}
        {menuPoint === "foto" && <AvatarPoint />}
        {menuPoint === "user" && (
          <GetUsers
            setMenu={setMenu}
            socket={socket}
            setMenuLoading={setMenuLoading}
          />
        )}
        {menuPoint === "get" && (
          <GetChats
            setMenuLoading={setMenuLoading}
            socket={socket}
            setMenu={setMenu}
            enterPass={enterPass}
            setEnterPass={setEnterPass}
          />
        )}
        {menuPoint === "add" && (
          <NewChatPoint socket={socket} setMenu={setMenu} />
        )}
        {!menuLoading && <MenuLoading />}
        {enterPass.id && (
          <StatusPassword
            setMenu={setMenu}
            enterPass={enterPass}
            socket={socket}
            dispatch={dispatch}
            chats={chats}
          />
        )}
        {menuPoint === 'out' &&
        <LogOutPiont setMenuPoint={setMenuPoint} user={user} dispatch={dispatch}/>
        }
      </div>
    </div>
  );
}

export default BasickMenuPoint;
