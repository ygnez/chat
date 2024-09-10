import { Request, Response, Router } from "express";

import { UserService } from "./user.service";
import { ChatService } from "./chat.service";
import { Inject, Injectable } from "../decorators";

@Injectable()
export class ApiService {
  private readonly router = Router();

  constructor(
    @Inject() private readonly chatService: ChatService,
    @Inject() private readonly userService: UserService
  ) {
    this.router.get("/users", this.getUsers.bind(this));
    this.router.get("/chats", this.getChats.bind(this));
  }

  get Router() {
    return this.router;
  }

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
