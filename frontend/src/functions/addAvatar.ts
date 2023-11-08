import { newAvatar } from "../components/personalisation/slises/userSlice";
import { User } from "../components/personalisation/types/User";
import { AppDispatch } from "../store";
import { addFetch } from "./addFetch";

export function addAvatar({
  user,
  input,
  dispatch,
}: {
  user: User;
  input: string;
  dispatch: AppDispatch;
}): void {
  user &&
    addFetch("/pers/newAvatarOut", "PUT", {
      userId: user.id,
      input,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "ok") {
          dispatch(newAvatar(data.input));
        }
      });
}
