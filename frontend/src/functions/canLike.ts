import { Message } from "../components/chats/types/Message";
import { User } from "../components/personalisation/types/User";

export function canLike({
  message,
  user,
}: {
  message: Message;
  user: User;
}): boolean {
  if (
    message.Likes.find((like) => like.user_id === user?.id) ||
    message.Dislikes.find((disLike) => disLike.user_id === user?.id)
  ) {
    return false;
  }
  return true;
}
