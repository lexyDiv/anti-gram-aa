import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

function MenuLoading(): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  return (
    <div id="menu-loaging">
      <img
        id="global-loading-gif"
        src={images.loading}
        alt=""
      />
    </div>
  );
}

export default MenuLoading;
