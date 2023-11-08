import { Chat } from "../components/chats/types/Chat";
import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";
import { checkVieweds } from "./checkVieweds";

export function headerNewMessages({
  chats,
  user,
}: {
  chats: Chat[];
  user: User;
}): number {
  let messages: Message[] = [];
  chats.forEach((chat) => (messages = messages.concat(chat.messages)));
  return checkVieweds({ messages, user });
}
