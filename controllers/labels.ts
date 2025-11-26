import { Request, Response } from "express";
import LabelModel from "../models/Label";
import { LabelCreateRequest, LabelUpdateRequest } from "../types/labels";

const getAllLabels = async (_req: Request, res: Response) => {
  try {
    const labels = await LabelModel.findAll();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch labels" });
  }
};

const createLabel = async (
  req: Request<{}, {}, LabelCreateRequest>,
  res: Response
) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      res.status(400).json({ error: "id and name are required" });
      return;
    }

    const label = await LabelModel.create(id, name);
    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: "Failed to create label" });
  }
};

const updateLabel = async (
  req: Request<{ id: string }, {}, LabelUpdateRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const label = await LabelModel.update(id, name);

    if (!label) {
      res.status(404).json({ error: "Label not found" });
      return;
    }

    res.json(label);
  } catch (error) {
    res.status(500).json({ error: "Failed to update label" });
  }
};

const deleteLabel = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const label = await LabelModel.delete(id);

    if (!label) {
      res.status(404).json({ error: "Label not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete label" });
  }
};

export { createLabel, deleteLabel, getAllLabels, updateLabel };
