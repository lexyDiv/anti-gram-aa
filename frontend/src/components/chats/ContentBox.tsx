import React from "react";
import ChatItem from "./ChatItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ContentBox({
  screen,
}: {
  screen: { width: number; height: number };
}): JSX.Element {
  const { chats } = useSelector((state: RootState) => state.chats);

  return (
    <div id="content-box" style={{ height: `${screen.height - 80}px` }}>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} screen={screen} />
      ))}
    </div>
  );
}

export default ContentBox;
