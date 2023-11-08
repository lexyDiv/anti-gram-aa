import React, { useEffect, useRef, useState } from "react";
import "./styles/BasickMenu.css";
import BasickMenuPoint from "./BasickMenuPoint";
import { Socket } from "socket.io-client";
import { EnterPass } from "./types/EntarPass";

function BasickMenu({
  setMenu,
  screen,
  socket,
}: {
  setMenu: (value: boolean) => void;
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  const [left, setLeft] = useState(-300);
  const [out, setOut] = useState(false);
  const [outPoint, setOutPoint] = useState(false);
  const menuBox = useRef(document.getElementById("basick-box"));

  const [menuPoint, setMenuPoint] = useState("");
  const [enterPass, setEnterPass] = useState<EnterPass>({id: 0, status: ''});

  useEffect(() => {
    setTimeout(() => {
      menuBox.current = document.getElementById("basick-box");
    }, 0);
  }, []);

  useEffect(() => {
    if (!out) {
      setTimeout(() => {
        setLeft(0);
      }, 10);
    } else {
      setLeft(-300);
      setTimeout(() => {
        setMenu(false);
      }, 500);
    }
  }, [out]);

  const heightRes = screen.height < 500;
  const overflowY = heightRes ? "scroll" : "hidden";

  return (
    <div
      id="basick-menu"
      onClick={() => {
        enterPass.id
          ? setEnterPass({id: 0, status: ''})
          : !menuPoint
          ? setOut(true)
          : setOutPoint(true);
      }}
    >
      {!out && (
        <div className="basick-closed">
          <p>x</p>
        </div>
      )}

      <div
        id="basick-menu-body"
        style={{
          left: `${left}px`,
          height: `${
            heightRes ? String(`${screen.height - 70}px`) : "fit-content"
          }`,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div id="basick-box" style={{ overflowY: `${overflowY}` }}>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("pass");
            }}
          >
            поменять пароль
          </p>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("foto");
            }}
          >
            поменять аватарку
          </p>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("user");
            }}
          >
            найти пользователя
          </p>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("get");
            }}
          >
            найти чат
          </p>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("add");
            }}
          >
            создать чат
          </p>
          <p
            className="basick-menu-item"
            onClick={() => {
              !menuPoint && setMenuPoint("out");
            }}
          >
            выйти
          </p>
        </div>
      </div>
      {menuPoint && (
        <BasickMenuPoint
          setMenuPoint={setMenuPoint}
          outPoint={outPoint}
          setOutPoint={setOutPoint}
          menuPoint={menuPoint}
          screen={screen}
          setMenu={setMenu}
          socket={socket}
          setEnterPass={setEnterPass}
          enterPass={enterPass}
        />
      )}
    </div>
  );
}

export default BasickMenu;
