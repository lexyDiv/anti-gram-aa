import { User } from "../../personalisation/types/User";

export type Like = {
  User: User;
  date: string;
  user_id: number;
  id: number;
};
