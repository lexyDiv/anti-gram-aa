import { User } from "../../personalisation/types/User";

export type Dislike = {
  User: User;
  date: string;
  user_id: number;
  id: number;
};
