import React from "react";
import { Emoji } from "../../objects/types/Emoji";

function EmojiItem({
  emoji,
  setEmojiId,
  emojiId,
}: {
  emoji: Emoji;
  setEmojiId: (value: number) => void;
  emojiId: number;
}): JSX.Element {
  return (
    <img
      className="emoji-image"
      src={emoji.image}
      alt="img"
      style={{
        borderStyle: `${emojiId && emojiId === emoji.id ? "solid" : "none"}`,
      }}
      onClick={() => {
        !emojiId || emojiId !== emoji.id ? setEmojiId(emoji.id) : setEmojiId(0);
      }}
    />
  );
}

export default EmojiItem;
