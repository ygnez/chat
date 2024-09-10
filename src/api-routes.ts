import { Request, Response, Router } from "express";

import { userService } from "./services/user.service";
import { chatService } from "./services/chat.service";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

router.get("/users", async (req: Request, res: Response) => {
  const users = await userService.findAll();

  res.status(200).json({
    items: users,
    totalCount: users.length,
  });
});

router.get("/chats", async (req: Request, res: Response) => {
  const chats = await chatService.findAll();

  res.status(200).json({
    items: chats,
    totalCount: chats.length,
  });
});

export default router;
