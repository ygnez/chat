import { Socket } from "socket.io";

import { Message } from "../entities";
import { UserService } from "./user.service";
import { ChatService } from "./chat.service";

export class EventService {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly socket: Socket
  ) {}

  async onPostMessage(message: Message) {}

  async onReadMessage(messageId: string) {}

  async onJoinChat(userId: string, chatId?: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!chatId) {
      return this.chatService.createChatWithUser(this.socket.data.user, user);
    }
    return this.chatService.findChatById(chatId);
  }

  async onLeaveChat(chatId: string, userId: string): Promise<void> {}

  async emitNewMessage(message: Message): Promise<void> {}

  async emitUserJoinChat(chatId: string, userId: string): Promise<void> {}

  async emitUserLeaveChat(chatId: string, userId: string): Promise<void> {}

  async emitUserReadMessage(messageId: string, userId: string): Promise<void> {}
}
