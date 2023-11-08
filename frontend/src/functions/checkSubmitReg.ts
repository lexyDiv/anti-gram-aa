import { messageReg } from "../objects/messagesReg";
import { registration } from "../components/personalisation/slises/userSlice";
import { AppDispatch } from "../store";
import { regFormValid } from "./regFormValid";

export function checkSubmitReg({
  password,
  nick,
  nickValid,
  setMessage,
  dispatch,
  setLoad,
  navigate,
}: {
  password: string;
  nick: string;
  nickValid: string;
  dispatch: AppDispatch;
  setMessage: (value: string) => void;
  setLoad: (value: boolean) => void;
  navigate: NavigationTimingType;
}): void {
  const res = regFormValid({ password, nick });
  if (nick.length) {
    if (nickValid === "ok" && res === "ok") {
      dispatch(
        registration({
          password,
          nick,
          setLoad,
          setMessage,
          navigate,
        })
      );
    } else if (nickValid !== "ok") {
      setMessage(messageReg(nickValid));
    } else if (res !== "ok") {
      setMessage(messageReg(res));
    }
  } else {
    setMessage(messageReg(res));
  }
}
