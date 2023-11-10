import { AppDispatch } from "../../../../store";
import axiosInstance from "../../../personalisation/instance";
import { User } from "../../../personalisation/types/User";
import { changeLoad, setData, setGlobalError } from "../../slices/listingSlice";

export function LogOut({
  user,
  dispatch,
}: {
  user: User;
  dispatch: AppDispatch;
}): void {
  dispatch(changeLoad(false));
  user &&
    axiosInstance
      .delete(`/pers/${user.nickName}`)
      .then((response) => {
        if (response && response.status === 200) {
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          throw response.data;
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(setGlobalError(true));
      });
}
