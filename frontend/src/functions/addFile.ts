import { RefObject } from "react";
import { AppDispatch } from "../store";
import { newAvatar } from "../components/personalisation/slises/userSlice";

export function addFile({
  e,
  imageInput,
  userId,
  dispatch,
}: {
  e: React.FormEvent<HTMLFormElement>;
  imageInput: RefObject<HTMLInputElement>;
  userId: number;
  dispatch: AppDispatch;
}): void {
  e.preventDefault();
  if (imageInput.current) {
    const formData = new FormData();
    const image = imageInput.current.files;
    if (image) {
      formData.append("image", image["0"]);
      formData.append("userId", String(userId));
    }
    fetch("/pers/newAvatar", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "ok") {
          dispatch(newAvatar(data.userFoto));
        }
      });
  }
}
