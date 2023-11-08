import { Chat } from "./Chat";

export type ChatsState = {
  chats: Chat[];
  error: undefined | string;
  prevOnline: number[];
  prevOffline: number[];
  loadOK: boolean;
};
