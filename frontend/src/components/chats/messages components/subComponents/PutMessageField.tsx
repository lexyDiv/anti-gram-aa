import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { Message } from "../../types/Message";
import { RootState, useAppDispatch } from "../../../../store";
import { putMessage } from "../../../../functions/putMessage";
import { addResponse } from "../../../../functions/addResponse";
import ImageField from "../../ImageField";
import EmojiField from "../../EmojiField";

function PutMessageField({
  screen,
  message,
  socket,
  setLocalState,
  type,
}: {
  screen: { width: number; height: number };
  message: Message;
  socket: Socket;
  setLocalState: (value: string) => void;
  type: string | null;
}): JSX.Element {
  const [messageData, setMessageData] = !type
    ? useState(message.body)
    : useState("");
  const [image, setImage] = !type ? useState(message.image) : useState("");
  const [emojiId, setEmojiId] = !type ? useState(message.emojiId) : useState(0);
  const [imageField, setImageField] = useState(false);
  const [emojiField, setEmojiField] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { images } = useSelector((state: RootState) => state.listing);

  return (
    <div id="add-message">
      <form
        id="add-message-form"
        action=""
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          !type
            ? putMessage({ socket, message, text: messageData, image, emojiId, dispatch })
            : user &&
              addResponse({
                socket,
                message,
                body: messageData,
                image,
                emojiId,
                userId: user.id,
                dispatch,
              });
          setLocalState("");
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
              src={images.emojis}
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
              src={images.addImage}
              alt="img"
            />
          </button>

          {(emojiId || image || messageData) && (
            <button id="btn-add-massage" className="btn-message" type="submit">
              <img
                className="btn-img"
                src={images.send}
                alt="img"
              />
            </button>
          )}
        </div>
      </form>

      <div id="wright-off" onClick={() => setLocalState("")}>
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

export default PutMessageField;
