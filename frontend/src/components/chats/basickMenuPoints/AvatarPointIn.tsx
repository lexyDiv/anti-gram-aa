import React, { RefObject, useState } from "react";
import { addFile } from "../../../functions/addFile";
import { User } from "../../personalisation/types/User";
import { AppDispatch } from "../../../store";
import { validFotoFormat } from "../../../functions/validFotoFormat";

function AvatarPointIn({
  user,
  imageInput,
  dispatch,
  setAvatarState,
}: {
  user: User;
  imageInput: RefObject<HTMLInputElement>;
  dispatch: AppDispatch;
  setAvatarState: (value: string) => void;
}): JSX.Element {
  const [canSubmit, setCanSubmit] = useState("");
  return (
    <form
      id="point-avatar"
      method="post"
      encType="multipart/form-data"
      onSubmit={(e) => {
        user && addFile({ e, imageInput, userId: user.id, dispatch });
        setAvatarState("");
      }}
    >
      <label className="input-file">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            onChange={(e) => setCanSubmit(e.target.value)}
            id="file"
            type="file"
            name="file"
            ref={imageInput}
            multiple
            required
          />
          <span>Выбрать фотку</span>
          {canSubmit && validFotoFormat({ str: canSubmit }) ? (
            <button type="submit" id="btn-avatar-in">
              поменять
            </button>
          ) : (
            canSubmit && (
              <h5 style={{ color: "red", marginLeft: "40px" }}>
                это не картинка!
              </h5>
            )
          )}
        </div>
      </label>
    </form>
  );
}

export default AvatarPointIn;
