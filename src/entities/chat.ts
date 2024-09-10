import { Message } from "./message";
import { User } from "./user";

export class Chat {
  uuid: string;
  messages: Message[];
  participants: User[];
  createdBy: User;
  createdAt: Date;
}
