import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import config from "./config";
import apiRoutes from "./api-routes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

app.use(express.json());
app.use("/", apiRoutes);

io.on("connection", (socket) => {});

httpServer.listen(config.httpPort, config.hostname, () => {
  console.log(
    `[Chat] 💬🚀 Server started on http://${config.hostname}:${config.httpPort}`
  );
});
