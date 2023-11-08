import { messageReg } from "../objects/messagesReg";
import { addFetch } from "./addFetch";

export function changePassword({
  password,
  newPassword,
  setUserInfoErr,
  userId,
  setComplite,
  setMenuLoading,
}: {
  password: string;
  newPassword: string;
  setUserInfoErr: (value: string) => void;
  userId: number;
  setComplite: (value: boolean) => void;
  setMenuLoading: (value: boolean) => void;
}): void {
  if (password.length < 4 || newPassword.length < 4) {
    setUserInfoErr(messageReg("password"));
  } else {
    setMenuLoading(false);
    addFetch("pers/rePass", "PUT", { password, newPassword, userId }).then(
      async (response) => {
        setMenuLoading(true);
        const data = await response.json();
        if (response.status === 200) {
          if (data.message === "ok") {
            setComplite(true);
          } else {
            setUserInfoErr(data.message);
          }
        } else {
          setUserInfoErr(messageReg("load"));
        }
      }
    );
  }
}
