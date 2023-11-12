import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { updateFocusChat } from "./slices/listingSlice";
import BasickMenu from "./BasickMenu";
import { Socket } from "socket.io-client";
import { headerNewMessages } from "../../functions/headerNewMessages";
import GlobalError from "../GlobalError";

function Header({
  screen,
  socket,
}: {
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const { focusChat } = useSelector((state: RootState) => state.listing);
  const { globalError } = useSelector((state: RootState) => state.listing);
  const dispatch = useAppDispatch();
  const [menu, setMenu] = useState(false);
  const [gabarit, setGabarit] = useState({ width: 50, height: 50 });
  const { images } = useSelector((state: RootState) => state.listing);
  const foto =
    user && user.foto
      ? user.foto
      : images.clearFoto;
  const newMessagesIs = headerNewMessages({ user, chats });
  return (
    <>
      <div id="menu-box">
        <div id="user-menu-box">
          <img
            src={foto}
            alt="img"
            style={{
              width: `${gabarit.width}px`,
              height: `${gabarit.height}px`,
              borderRadius: `${gabarit.width / 2}px`,
            }}
            onClick={() => {
              gabarit.width === 50
                ? setGabarit({ width: 300, height: 300 })
                : setGabarit({ width: 50, height: 50 });
            }}
          />
        </div>

        <img
          id="menu-image"
          src={images.menu}
          alt="img"
          style={{ borderColor: `${menu ? "rgb(255,0,0,1)" : "rgb(0,0,0,0)"}` }}
          onClick={() => {
            setMenu((prev) => !prev);
          }}
        />

        {focusChat ? (
          <img
            id="back-to-chats"
            src={images.back}
            onClick={() => {
              dispatch(updateFocusChat(0));
            }}
          />
        ) : (
          <div id="back-to-chats"></div>
        )}
        <div id="header-messages-info">
          {newMessagesIs ? (
            <>
              <p style={{ color: "white", display: 'flex' }}>Есть новые сообщения!</p>
              <div>
                <p>{newMessagesIs}</p>
              </div>
            </>
          ) : (
            false
          )}
        </div>
      </div>
      {menu && <BasickMenu setMenu={setMenu} screen={screen} socket={socket} />}
      {globalError && <GlobalError />}
    </>
  );
}

export default Header;
