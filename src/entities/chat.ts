import { Message } from "./message";
import { Profile } from "./profile";

export class Chat {
  id: string;
  messages: Message[];
  createdBy: Profile;
  createdAt: Date;
}
