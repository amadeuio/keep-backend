import express, { Request, Response } from "express";
import { userService } from "../domain/users/user.service";

const router = express.Router();

const register = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const result = await userService.register({ email, password });
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ error: "User already exists" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
};

const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const result = await userService.login({ email, password });
    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: "Failed to login" });
    }
  }
};

router.post("/register", register);
router.post("/login", login);

export default router;
