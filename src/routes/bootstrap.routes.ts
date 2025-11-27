import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { bootstrapService } from "../domain/bootstrap/bootstrap.service";

const router = express.Router();

const getBootstrap = async (req: Request, res: Response) => {
  try {
    const bootstrap = await bootstrapService.findAll(req.userId!);
    res.json(bootstrap);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bootstrap data" });
  }
};

router.get("/", authenticate, getBootstrap);

export default router;
