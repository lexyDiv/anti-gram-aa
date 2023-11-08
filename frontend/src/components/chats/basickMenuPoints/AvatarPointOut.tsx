import React, { useState } from "react";
import { addAvatar } from "../../../functions/addAvatar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";

function AvatarPointOut({
  setAvatarState,
}: {
  setAvatarState: (value: string) => void;
}): JSX.Element {
  const [input, setInput] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div id="point-avatar">
      <form
        id="point-password-form"
        onSubmit={(e) => {
          e.preventDefault();
          addAvatar({ input, user, dispatch });
          setAvatarState("");
        }}
      >
        <p style={{ color: "white" }}>вставте ссылку</p>
        <input
          type="text"
          value={input}
          style={{ margin: "20px" }}
          onChange={(e) => setInput(e.target.value)}
        />
        <div style={{ display: "flex", height: "30px" }}>
          {input ? (
            <button type="submit" id="btn-avatar-in">
              изменить
            </button>
          ) : (
            input && (
              <h5 style={{ color: "red", marginLeft: "-10px" }}>
                это не картинка!
              </h5>
            )
          )}
        </div>
      </form>
    </div>
  );
}

export default AvatarPointOut;
