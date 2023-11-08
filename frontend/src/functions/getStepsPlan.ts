import { Chat } from "../components/chats/types/Chat";

export function getStepsPlan({
  chat,
  koof,
}: {
  chat: Chat;
  koof: number;
}): number[] {
  const allMessages = chat.allMessages;
  const actualMessages = chat.messages.filter(
    (message) => !message.isDate
  ).length;
  const oldMessagesData = allMessages - koof - actualMessages;
  const defaultSteps = Math.floor(oldMessagesData / 50);
  let stepsPlan = [];
  for (let i = 0; i < defaultSteps - 1; i++) {
    stepsPlan.push(50);
  }
  stepsPlan.push(oldMessagesData - stepsPlan.reduce((acc, el) => acc + el, 0));
  stepsPlan.unshift(chat.messages.length);
  allMessages < 100 ? (stepsPlan = [allMessages]) : false;
  return stepsPlan.filter((el) => el > 0);
}
