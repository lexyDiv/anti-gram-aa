import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../components/personalisation/instance";
import { registration } from "../components/personalisation/slises/userSlice";
import { AppDispatch } from "../store";

export function getValidUser({
  dispatch,
  navigate,
}: {
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}): void {
  axiosInstance.get("/pers").then((response) => {
    if (response && response.status === 200) {
      dispatch(registration(response.data));
      navigate("/chats");
    } else {
      navigate("/personalisation");
    }
  });
}
