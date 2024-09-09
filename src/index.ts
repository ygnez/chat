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
import { UserService } from "./services/user.service";

const app = express();
const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {});

const userService = new UserService();

app.use(express.json());
app.use("/", apiRoutes);

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

io.on("connection", () => {});

httpServer.listen(config.httpPort, config.hostname, () => {
  console.log(
    `[Chat] 💬🚀 Server started on http://${config.hostname}:${config.httpPort}`
  );
});
