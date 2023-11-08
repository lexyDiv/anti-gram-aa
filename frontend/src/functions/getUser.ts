import { User } from "../components/personalisation/types/User";
import { addFetch } from "./addFetch";

export async function getUser(): Promise<{ user: User; acssessToken: string }> {
  return addFetch("/pers", "GET")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => err);
}
