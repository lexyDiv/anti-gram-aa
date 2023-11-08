import React, { useState } from "react";
import { addMessage } from "../../functions/addMessage";
import { Chat } from "./types/Chat";
import ImageField from "./ImageField";
import EmojiField from "./EmojiField";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { Socket } from "socket.io-client";

function MessageField({
  screen,
  setWright,
  socket,
  chat,
}: {
  screen: { width: number; height: number };
  setWright: (value: boolean) => void;
  socket: Socket;
  chat: Chat;
}): JSX.Element {
  const [messageData, setMessageData] = useState("");
  const [image, setImage] = useState("");
  const [emojiId, setEmojiId] = useState(0);
  const [imageField, setImageField] = useState(false);
  const [emojiField, setEmojiField] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div
      id="add-message"
      style={{
        marginTop: `${screen.height - 220}px`,
      }}
    >
      <form
        id="add-message-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setWright(false);
          user &&
            addMessage({
              chat,
              text: messageData,
              image,
              emojiId,
              socket,
              user_id: user.id,
              dispatch,
            });
        }}
      >
        <textarea
          name="text-area"
          id="text-area"
          style={{
            width: `${
              screen.width < 760 ? screen.width - screen.width / 3 : 400
            }px`,
          }}
          value={messageData}
          onChange={(e) => {
            setMessageData(e.target.value);
          }}
        ></textarea>
        <div id="add-message-btns">
          <button
            id="btn-add-smile"
            className="btn-message"
            type="button"
            onClick={() => {
              setEmojiField((prev) => !prev);
              setImageField(false);
            }}
          >
            <img
              style={{
                borderColor: `${emojiId ? "blue" : "rgb(129, 128, 128, 0)"}`,
              }}
              className="btn-img"
              src="https://avatars.mds.yandex.net/i?id=ec105478659a8fa231cf971fbcb7a97a_l-5315783-images-thumbs&n=13"
              alt="img"
            />
          </button>

          <button
            id="btn-add-foto"
            className="btn-message"
            type="button"
            onClick={() => {
              setImageField((prev) => !prev);
              setEmojiField(false);
            }}
          >
            <img
              className="btn-img"
              style={{
                borderColor: `${image ? "blue" : "rgb(129, 128, 128, 0)"}`,
              }}
              src="https://www.pinclipart.com/picdir/big/581-5812140_area-purple-text-galery-icon-png-clipart.png"
              alt="img"
            />
          </button>

          {(emojiId || image || messageData) && (
            <button id="btn-add-massage" className="btn-message" type="submit">
              <img
                className="btn-img"
                src="https://moondiamondsmadrid.com/frontend/img/whatsappSendButton.png"
                alt="img"
              />
            </button>
          )}
        </div>
      </form>

      <div id="wright-off" onClick={() => setWright(false)}>
        x
      </div>

      {imageField && (
        <ImageField
          setImage={setImage}
          image={image}
          setImageField={setImageField}
        />
      )}

      {emojiField && <EmojiField setEmojiId={setEmojiId} emojiId={emojiId} />}
    </div>
  );
}

export default MessageField;
