import express, { Request, Response } from "express";
import { bootstrapService } from "../domain/bootstrap/bootstrap.service";

const router = express.Router();

const getBootstrap = async (_req: Request, res: Response) => {
  try {
    const bootstrap = await bootstrapService.findAll();
    res.json(bootstrap);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bootstrap data" });
  }
};

router.get("/", getBootstrap);

export default router;
