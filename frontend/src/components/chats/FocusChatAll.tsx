import React, { useState } from "react";
import { Chat } from "./types/Chat";
import { stringFormat } from "../../functions/stringFormate";
import { checkVieweds } from "../../functions/checkVieweds";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { updateMenuFocusChat } from "./slices/listingSlice";

function FocusChatAll({
  chat,
  screen,
}: {
  chat: Chat;
  screen: { width: number; height: number };
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [gab, setGab] = useState({ width: 45, height: 45, right: 115, top: 0 });
  const { images } = useSelector((state: RootState) => state.listing);

  const foto = chat.foto
    ? chat.foto
    : images.clearFoto;
  return (
    <div id="focus-chat">
              <img
          id="focus-chat-img"
          src={foto}
          alt="img"
          onClick={() => {
            gab.height === 45
              ? setGab({ width: 300, height: 300, right: -225, top: 140 })
              : setGab({ width: 45, height: 45, right: 115, top: 0 });
          }}
          style={{
            width: `${gab.width}px`,
            height: `${gab.height}px`,
            marginLeft: '10px',
            marginTop: `${gab.top}px`,
            zIndex: `${gab.height === 45 ? "10" : "12"}`,
          }}
        />
      <div id="focus-chat-left">
        <div id="focus-clear"></div>
        <div id="focus-chat-info">
          <h5>{stringFormat({ type: 1, str: chat.name, screen })}</h5>
          <p style={{ fontSize: "13px" }}>{`новых : ${checkVieweds({
            messages: chat.messages,
            user,
          })}`}</p>
        </div>
      </div>
      <div
        className="my-menu"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(updateMenuFocusChat(chat.id));
        }}
      >
        <img
          className="my-menu-img"
          src={images.menu}
          alt="img"
        />
      </div>
    </div>
  );
}

export default FocusChatAll;
