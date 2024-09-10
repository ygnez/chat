import { Request, Response } from "express";

import { UserService } from "./user.service";
import { ChatService } from "./chat.service";
import { Inject } from "../di/inject.decorator";

export class ApiService {
  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly chatService: ChatService
  ) {}

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.findAll();

    res.status(200).json({
      items: users,
      totalCount: users.length,
    });
  }

  async getChats(req: Request, res: Response) {
    const chats = await this.chatService.findAll();

    res.status(200).json({
      items: chats,
      totalCount: chats.length,
    });
  }
}
