import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";

export function checkVieweds({
  messages,
  user,
}: {
  messages: Message[];
  user: User;
}): number {
  let newMessages = 0;
  user &&
    messages.forEach((message) =>
      !message.Vieweds.length && message.user_id !== user.id
        ? (newMessages += 1)
        : false
    );
  return newMessages;
}
