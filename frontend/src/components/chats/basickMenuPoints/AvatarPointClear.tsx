import React from "react";

function AvatarPointClear({
  setAvatarState,
}: {
  setAvatarState: (value: string) => void;
}): JSX.Element {
  return (
    <div id="point-avatar">
      <p className="basick-menu-item" onClick={() => setAvatarState("in")}>
        моя картинка
      </p>
      <p className="basick-menu-item" onClick={() => setAvatarState("out")}>
        стороняя ссылка
      </p>
    </div>
  );
}

export default AvatarPointClear;
