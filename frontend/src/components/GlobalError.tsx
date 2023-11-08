import React from "react";
import { useAppDispatch } from "../store";
import { setGlobalError } from "./chats/slices/listingSlice";

function GlobalError(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        dispatch(setGlobalError(false));
      }}
      style={{
        zIndex: "20",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "rgb(255, 255, 255, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        color: "red",
        textAlign: "center",
      }}
    >
      <h1>Проблемы с сервером. Операция не выполнена.</h1>
    </div>
  );
}

export default GlobalError;
