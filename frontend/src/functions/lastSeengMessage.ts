import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";

export function lastSeengMessage({
  messages,
  user,
}: {
  messages: Message[];
  user: User;
}): Message | undefined {
  return messages.find(
    (message) =>
      !message.isDate && message.user_id !== user?.id && !message.Vieweds.length
  );
}
