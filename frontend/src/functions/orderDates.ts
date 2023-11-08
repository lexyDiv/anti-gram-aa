import { Message } from "../components/chats/types/Message";

export function oerderDates({ messages }: { messages: Message[] }): Message[] {
  if (!messages.length) {
    return [];
  }
  messages = messages.filter((message) => !message.isDate);

  let messageDate = JSON.parse(messages[0].date);
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const actualDate = JSON.parse(message.date);
    if (!i) {
      const newDate = JSON.parse(JSON.stringify(message));
      newDate.id = -message.id;
      newDate.isDate = true;
      messages.unshift(newDate);
      i++;
    } else if (
      messageDate.year !== actualDate.year ||
      messageDate.month !== actualDate.month ||
      messageDate.day !== actualDate.day
    ) {
      const newDate = JSON.parse(JSON.stringify(message));
      newDate.id = -message.id;
      newDate.isDate = true;
      messageDate = JSON.parse(messages[i].date);
      messages.splice(i, 0, newDate);
      i++;
    }
  }
  return messages;
}
