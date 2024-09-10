import { Chat, User } from "../entities";

export class ClientJoinChatDto {
  chatId?: string;
  userId: string;
}

export class ClientJoiningChatDto {
  chat: Chat;
  user: User;
}
