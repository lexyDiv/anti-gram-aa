import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import AvatarPointIn from "./AvatarPointIn";
import AvatarPointClear from "./AvatarPointClear";
import AvatarPointOut from "./AvatarPointOut";

function AvatarPoint(): JSX.Element {
  const imageInput = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [avatarState, setAvatarState] = useState("");
  return (
    <>
      {!avatarState ? (
        <AvatarPointClear setAvatarState={setAvatarState} />
      ) : avatarState === "in" ? (
        <AvatarPointIn
          dispatch={dispatch}
          user={user}
          imageInput={imageInput}
          setAvatarState={setAvatarState}
        />
      ) : (
        <AvatarPointOut setAvatarState={setAvatarState} />
      )}
    </>
  );
}

export default AvatarPoint;
