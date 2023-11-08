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
  const foto =
    user && user.foto
      ? user.foto
      : "https://avatars.mds.yandex.net/i?id=374f91d0f4141680cdbe2e9320b311cb_l-8289735-images-thumbs&n=13";
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
          src="https://linoplanet.ru/assets/template/linoplanet/img/png/list.png"
          alt="img"
          style={{ borderColor: `${menu ? "rgb(255,0,0,1)" : "rgb(0,0,0,0)"}` }}
          onClick={() => {
            setMenu((prev) => !prev);
          }}
        />

        {focusChat ? (
          <img
            id="back-to-chats"
            src="https://thypix.com/wp-content/uploads/blue-arrow-24.png"
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
