import React from "react";
import "./GlobalLoading.css";

export function GlobalLoading(): JSX.Element {
  return (
    <div id="global-loading">
      <img
        id="global-loading-gif"
        src="https://vektor-penza.ru/catalog/view/image/loading.gif"
        alt=""
      />
    </div>
  );
}

export default GlobalLoading;
