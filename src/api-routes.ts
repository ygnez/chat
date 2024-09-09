import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { CreateProfileDto } from "./dto";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

router.post("/profiles", async (req: Request, res: Response) => {
  const transformed = plainToInstance(CreateProfileDto, req.body);
  const validationErrors = await validate(transformed);

  res.status(200).json({
    status: "ok",
    errors: validationErrors.map((error) => {
      return {
        [error.property]: Object.values(error.constraints as object),
      };
    }),
  });
});

router.get("/users", async (req: Request, res: Response) => {
  const users = [];

  res.status(200).json({
    items: users,
    totalCount: users.length,
  });
});

export default router;
