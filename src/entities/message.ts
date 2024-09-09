import { Profile } from "./profile";
import { Chat } from "./chat";

export class Message {
  id: string;
  chat: Chat;
  text: string;
  format: string;
  createdBy: Profile;
  createdAt: Date;
}
