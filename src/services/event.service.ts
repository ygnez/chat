import { Message } from "../entities";
import { userService } from "./user.service";
import { chatService } from "./chat.service";
import { Socket } from "socket.io";

export class EventService {
  constructor(private readonly socket: Socket) {}

  async onPostMessage(message: Message) {}

  async onReadMessage(messageId: string) {}

  async onJoinChat(userId: string, chatId?: string) {
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!chatId) {
      return chatService.createChatWithUser(this.socket.data.user, user);
    }
    return chatService.findChatById(chatId);
  }

  async onLeaveChat(chatId: string, userId: string): Promise<void> {}

  async emitNewMessage(message: Message): Promise<void> {}

  async emitUserJoinChat(chatId: string, userId: string): Promise<void> {}

  async emitUserLeaveChat(chatId: string, userId: string): Promise<void> {}

  async emitUserReadMessage(messageId: string, userId: string): Promise<void> {}
}
