import React from "react";
import "./styles/LikeDislike.css";
import MessageLikeItem from "./MessageLikeItem";
import MessageDislikeItem from "./MessageDislikeItem";
import { Socket } from "socket.io-client";
import { Message } from "../../types/Message";

function LikeDislikeList({
  message,
  localState,
  screen,
  socket,
}: {
  message: Message;
  localState: string;
  screen: { width: number; height: number };
  socket: Socket;
}): JSX.Element {
  return (
    <div id="l-d-box">
      <div
        id="l-d-list"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {localState === "like"
          ? message.Likes.map((like) => (
              <MessageLikeItem
                like={like}
                key={like.id}
                screen={screen}
                socket={socket}
              />
            ))
          : message.Dislikes.map((dislike) => (
              <MessageDislikeItem
                dislike={dislike}
                key={dislike.id}
                screen={screen}
                socket={socket}
              />
            ))}
      </div>
      <div id="likes-closed">
        <p>x</p>
      </div>
    </div>
  );
}

export default LikeDislikeList;
