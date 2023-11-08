import { User } from "./User";

export type UserState = {
  user: User;
  error: string | undefined;
  acssessToken: string | null;
};
