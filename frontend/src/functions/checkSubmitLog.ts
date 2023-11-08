import { messageReg } from "../objects/messagesReg";
import { loganisation } from "../components/personalisation/slises/userSlice";
import { AppDispatch } from "../store";
import { logFormValid } from "./logFormValid";
import { NavigateFunction } from "react-router-dom";

export function checkSubmitLog({
  nick,
  password,
  setMessage,
  dispatch,
  navigate,
  setLoad,
}: {
  nick: string;
  password: string;
  setMessage: (value: string) => void;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  setLoad: (value: boolean) => void;
}): void {
  const res = logFormValid({ nick, password });
  if (res === "ok") {
    dispatch(loganisation({ nick, password, setMessage, navigate, setLoad }));
  } else {
    setMessage(messageReg(res));
  }
}
