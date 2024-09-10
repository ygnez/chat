import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import config from "./config";
import apiRoutes from "./api-routes";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./events";
import { ApiService, ChatService, EventService, UserService } from "./services";
import { Chat, UserStatus } from "./entities";
import { DependencyContainer } from "./di/dependency.container";

const app = express();
const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {});

const userService = new UserService();
const chatService = new ChatService();
const apiService = new ApiService(userService, chatService);

app.use(express.json());
app.use("/", apiRoutes);

DependencyContainer.register(ApiService);
const resolved = DependencyContainer.resolve(ApiService);
console.log(resolved);

io.use((socket, next) => {
  const token = socket.handshake.headers.token as string;
  if (!token) {
    return next(new Error("No token"));
  }
  const user = userService.fetchUserByToken(token);

  if (user) {
    socket.data.user = user;
    return next();
  }

  next(new Error("No user with token " + token));
});

io.on("connection", (socket) => {
  const eventService = new EventService(socket);

  userService.updateStatus(socket.data.user, UserStatus.ONLINE);

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

httpServer.listen(config.httpPort, config.hostname, () => {
  console.log(
    `[Chat] 💬🚀 Server started on http://${config.hostname}:${config.httpPort}`
  );
});
