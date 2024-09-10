import express, { Application } from "express";
import { createServer, Server } from "http";
import { Server as WsServer } from "socket.io";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../events";
import config from "../config";
import { Inject } from "../decorators";
import { ApiService } from "./api.service";
import { EventService } from "./event.service";
import { UserService } from "./user.service";
import { ChatService } from "./chat.service";
import { Chat, UserStatus } from "../entities";

export class BootstrapService {
  private app: Application;
  private http: Server;
  private ws: WsServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;

  constructor(
    @Inject() private readonly apiService: ApiService,
    @Inject() private readonly userService: UserService,
    @Inject() private readonly chatService: ChatService
  ) {}

  private async createServer() {
    this.app = express();
    this.http = createServer(this.app);
    this.ws = new WsServer<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(this.http, {});
  }

  private async initRoutes() {
    this.app.use("/", this.apiService.Router);
  }

  private async initSocket() {
    this.ws.use((socket, next) => {
      const token = socket.handshake.headers.token as string;
      if (!token) {
        return next(new Error("No token"));
      }
      const user = this.userService.fetchUserByToken(token);

      if (user) {
        socket.data.user = user;
        return next();
      }

      next(new Error("No user with token " + token));
    });

    this.ws.on("connection", (socket) => {
      const eventService = new EventService(
        this.chatService,
        this.userService,
        socket
      );

      this.userService.updateStatus(socket.data.user, UserStatus.ONLINE);

      socket.on("joinChat", async (payload) => {
        const chat = (await eventService.onJoinChat(
          payload.userId,
          payload.chatId
        )) as Chat;
        socket.broadcast.emit("joiningChat", {
          chat,
          user: socket.data.user,
        });
      });
    });
  }

  async start() {
    await this.createServer();

    this.app.use(express.json());

    await this.initRoutes();
    await this.initSocket();

    this.http.listen(config.httpPort, config.hostname, () => {
      console.log(
        `[Chat] 💬🚀 Server started on http://${config.hostname}:${config.httpPort}`
      );
    });
  }
}
