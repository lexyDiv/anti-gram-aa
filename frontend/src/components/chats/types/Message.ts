import { User } from "../../personalisation/types/User";
import { Dislike } from "./Dislike";
import { Like } from "./Like";

export type Message = {
  id: number;
  chat_id: number;
  user_id: number;
  body: string;
  date: string;
  image: string;
  emojiId: number;
  seengs: number;
  Likes: Like[];
  Dislikes: Dislike[];
  User: User;
  Vieweds: { user_id: number; message_id: number }[];
  isDate: boolean;
  aboutMessage: Message | null;
  midi_message_id: number | null;
};
