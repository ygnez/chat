import { Chat } from "./chat";
import { User } from "./user";

export class Message {
  uuid: string;
  chat: Chat;
  text: string;
  format: string;
  createdBy: User;
  createdAt: Date;
}
