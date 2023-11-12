import React, { useEffect, useState } from "react";
import LikeDislikeList from "./LikeDislikeList";
import PutMessageField from "./PutMessageField";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { Message } from "../../types/Message";
import { Chat } from "../../types/Chat";
import { RootState, useAppDispatch } from "../../../../store";
import { updateFocusMessage } from "../../slices/listingSlice";
import { addPersonalChat } from "../../../../functions/addPersonalChat";
import { deleteMessage } from "../../../../functions/deleteMessage";

function MyMessageMenu({
  screen,
  message,
  socket,
  chat,
}: {
  screen: { width: number; height: number };
  message: Message;
  socket: Socket;
  chat: Chat;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const [backgroundColor, setBackgroundColor] = useState("rgb(0, 0, 255, 0)");
  const [del, setDel] = useState(false);
  const [localState, setLocalState] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const { images } = useSelector((state: RootState) => state.listing);

  const type = user && user.id === message.user_id ? "my" : "alien";

  useEffect(() => {
    setTimeout(() => {
      setBackgroundColor("rgb(0, 0, 255, 0.15)");
    }, 0);
  }, []);
  return (
    <>
      <div
        id="my-message-menu"
        onClick={() => {
          !localState
            ? dispatch(updateFocusMessage(0))
            : localState !== "response" &&
              localState !== "put" &&
              setLocalState("");
        }}
        style={{
          height: `${screen.height}px`,
          backgroundColor: `${backgroundColor}`,
        }}
      >
        {!localState && (
          <>
            <div
              id="my-message-menu-body"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!del ? (
                <>
                  {type === "my" ? (
                    <p
                      className="my-message-menu-item"
                      onClick={() => {
                        setLocalState("put");
                      }}
                    >
                      редактировать
                    </p>
                  ) : (
                    <p
                      className="my-message-menu-item"
                      onClick={() => {
                        setLocalState("response");
                      }}
                    >
                      ответить
                    </p>
                  )}
                  <>
                    {!chat.alien && (
                      <>
                        {message.Likes.length ? (
                          <p
                            className="my-message-menu-item"
                            onClick={() => {
                              setLocalState("like");
                            }}
                          >
                            смотреть лайки
                          </p>
                        ) : (
                          false
                        )}
                        {message.Dislikes.length ? (
                          <p
                            className="my-message-menu-item"
                            onClick={() => {
                              setLocalState("dislike");
                            }}
                          >
                            смотреть дизлайки
                          </p>
                        ) : (
                          false
                        )}
                      </>
                    )}
                  </>
                  {type === "my" ? (
                    <p
                      className="my-message-menu-item"
                      onClick={() => {
                        setDel(true);
                      }}
                    >
                      удалить
                    </p>
                  ) : (
                    chat.type !== "personal" && (
                      <p
                        className="my-message-menu-item"
                        onClick={() => {
                          addPersonalChat({
                            user,
                            alien: message.User,
                            socket,
                            chats,
                            dispatch,
                          });
                        }}
                      >
                        написать автору
                      </p>
                    )
                  )}
                </>
              ) : (
                <>
                  <p id="q-del">удалить ?</p>
                  <div id="my-message-menu-del">
                    <h5
                      id="del-y"
                      className="my-message-menu-item"
                      onClick={() => {
                        user &&
                          deleteMessage({
                            socket,
                            message,
                            chat,
                            userId: user.id,
                            dispatch,
                          });
                      }}
                    >
                      да
                    </h5>
                    <h5
                      id="del-n"
                      className="my-message-menu-item"
                      onClick={() => {
                        setDel(false);
                      }}
                    >
                      нет
                    </h5>
                  </div>
                </>
              )}
            </div>
            <div
              id="my-message-menu-closed"
              onClick={() => {
                dispatch(updateFocusMessage(0));
              }}
            >
              <img className="new-closed" src={images.closed} alt="img" />
            </div>
          </>
        )}
        {(localState === "like" || localState === "dislike") && (
          <LikeDislikeList
            message={message}
            localState={localState}
            screen={screen}
            socket={socket}
          />
        )}
        {localState === "put" && (
          <PutMessageField
            screen={screen}
            socket={socket}
            message={message}
            setLocalState={setLocalState}
            type={null}
          />
        )}
        {localState === "response" && (
          <PutMessageField
            screen={screen}
            socket={socket}
            message={message}
            setLocalState={setLocalState}
            type={"response"}
          />
        )}
      </div>
    </>
  );
}

export default MyMessageMenu;
