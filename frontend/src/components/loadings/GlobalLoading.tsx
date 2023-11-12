import React from "react";
import "./GlobalLoading.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function GlobalLoading(): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  return (
    <div id="global-loading">
      <img
        id="global-loading-gif"
        src={images.loading}
        alt=""
      />
    </div>
  );
}

export default GlobalLoading;
