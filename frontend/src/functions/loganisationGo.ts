import { messageReg } from "../objects/messagesReg";
import { User } from "../components/personalisation/types/User";
import { addFetch } from "./addFetch";
import { NavigateFunction } from "react-router-dom";

export async function loganisationGo({
  nick,
  password,
  setMessage,
  navigate,
  setLoad,
}: {
  nick: string;
  password: string;
  setMessage: (value: string) => void;
  navigate: NavigateFunction;
  setLoad: (value: boolean) => void;
}): Promise<User> {
  setLoad(true);
  return addFetch("/pers", "PUT", {
    nick,
    password,
  })
    .then((response) => response.json())
    .then((data) => {
      setLoad(false);
      if (!data.err) {
        if (data.message === "ok") {
          navigate("/chats");
          return data.user;
        } else {
          setMessage(messageReg(data.message));
          return null;
        }
      }
      setMessage(messageReg("load"));
      return data.err;
    });
}
