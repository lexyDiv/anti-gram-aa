import React, { useEffect, useState } from "react";
import { emojis } from "../../objects/emojis";
import EmojiItem from "./EmojiItem";

function EmojiField({
  setEmojiId,
  emojiId,
}: {
  setEmojiId: (value: number) => void;
  emojiId: number;
}): JSX.Element {
  const [emojiField, setEmojiField] = useState(
    document.getElementById("emoji-field")
  );
  const [scroll, setScroll] = useState(false);
  const fieldMax = (emojis.length - 4) * 50;

  useEffect(() => {
    setTimeout(() => {
      setEmojiField(document.getElementById("emoji-field"));
    }, 1);
  }, []);

  return (
    <div
      id="emoji-box"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="vector"
        onClick={() => {
          setScroll((prev) => !prev);
          emojiField ? (emojiField.scrollLeft -= 50) : false;
        }}
      >
        {emojiField && emojiField.scrollLeft > 0 && <h1>{`<`}</h1>}
      </div>
      <div
        id="emoji-field"
        onWheel={(e) => {
          setScroll((prev) => !prev);
          const container = document.getElementById("emoji-field");
          if (container) {
            e.deltaY > 0
              ? (container.scrollLeft += 50)
              : (container.scrollLeft -= 50);
          }
        }}
      >
        {emojis.map((emoji) => (
          <EmojiItem
            key={emoji.id}
            emoji={emoji}
            setEmojiId={setEmojiId}
            emojiId={emojiId}
          />
        ))}
      </div>
      <div
        className="vector"
        onClick={() => {
          setScroll((prev) => !prev);
          emojiField ? (emojiField.scrollLeft += 50) : false;
        }}
      >
        {emojiField && emojiField.scrollLeft < fieldMax && <h1>{`>`}</h1>}
      </div>
      {scroll && <p></p>}
    </div>
  );
}

export default EmojiField;
