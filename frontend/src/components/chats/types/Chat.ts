import { User } from "../../personalisation/types/User";
import { Message } from "./Message";

export type Chat = {
  type: string;
  creator_id: number;
  status: string;
  foto: string;
  name: string;
  forvard: number;
  id: number;
  messages: Message[];
  oldMessages: Message[];
  allMessages: number;
  scrollTop: number;
  click: boolean;
  newMessage: boolean;
  deleteMessage: boolean;
  users: string;
  user: User;
  alien: User;
  scrollFocusMessageId: number;
  stepsPlan: number[];
  online: boolean;
  allUsers: number;
};
