import { Chat, User } from "../entities";
import { randomUUID } from "crypto";

export class ChatService {
  private chats: Set<Chat> = new Set<Chat>();

  async createChat(creator: User, participants: User[]) {
    const createdAt = new Date();
    const uuid = randomUUID();

    const chat: Chat = {
      uuid,
      createdBy: creator,
      participants,
      messages: [],
      createdAt,
    };
    this.chats.add(chat);

    return chat;
  }

  async createChatWithUser(creator: User, pal: User) {
    return this.createChat(creator, [creator, pal]);
  }

  async findChatById(chatId: string) {
    return [...this.chats].find((chat) => {
      return chat.uuid === chatId;
    });
  }

  async findAll() {
    return [...this.chats];
  }
}

export const chatService = new ChatService();
