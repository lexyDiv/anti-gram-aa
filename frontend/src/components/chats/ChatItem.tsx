import React, { useEffect, useState } from "react";
import "./styles/Chat.css";
import { Chat } from "./types/Chat";
import TypeAll from "./TypeAll";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { updateFocusChat, updateMenuFocusChat } from "./slices/listingSlice";
import { clickOnChat, updateStepsPlan } from "./slices/chatsSlice";
import TypePersonal from "./TypePersonal";
import { getStepsPlan } from "../../functions/getStepsPlan";

function ChatItem({
  chat,
  screen,
}: {
  chat: Chat;
  screen: { width: number; height: number };
}): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { menuFocusChatId } = useSelector((state: RootState) => state.listing);
  const [out, setOut] = useState(true);
  const { images } = useSelector((state: RootState) => state.listing);

  useEffect(() => {
    !chat.stepsPlan.length &&
      dispatch(
        updateStepsPlan({
          chatId: chat.id,
          stepsPlan: getStepsPlan({ chat, koof: 0 }),
        })
      );
  }, []);

  return (
    <div
      style={{
        borderColor: `${
          menuFocusChatId === chat.id
            ? "red"
            : out
            ? "rgb(34, 43, 43)"
            : "rgb(74, 95, 88)"
        }`,
      }}
      onMouseEnter={() => {
        setOut(false);
      }}
      onMouseLeave={() => {
        setOut(true);
      }}
      className="chat-item"
      onClick={() => {
        dispatch(updateFocusChat(chat.id));
        dispatch(clickOnChat({ chatId: chat.id, click: true }));
      }}
    >
      <div style={{ display: "flex" }}>
        {chat.type === "all" && (
          <TypeAll chat={chat} screen={screen} user={user} />
        )}
        {chat.type === "personal" && (
          <TypePersonal chat={chat} screen={screen} user={user} />
        )}
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

export default ChatItem;
