import { Contact } from "./Contact";

export type User = {
  nickName: string;
  id: number;
  foto: string;
  Contacts: Contact[];
} | null;
