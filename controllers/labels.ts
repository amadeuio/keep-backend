import { Request, Response } from "express";
import Label from "../models/Label";
import { CreateLabelRequest } from "../types/labels";

const getAllLabels = async (_req: Request, res: Response): Promise<void> => {
  try {
    const labels = await Label.findAll();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: "get_all_labels_failed" });
  }
};

const createLabel = async (
  req: Request<{}, {}, CreateLabelRequest>,
  res: Response
): Promise<void> => {
  try {
    const labelData = req.body;

    if (!labelData.id) {
      res.status(400).json({ error: "Label id is required" });
      return;
    }

    if (!labelData.name) {
      res.status(400).json({ error: "Label name is required" });
      return;
    }

    const label = await Label.create(labelData.id, labelData.name);
    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: "create_label_failed" });
  }
};

const updateLabel = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const label = await Label.update(id, name);

    if (!label) {
      res.status(404).json({ error: "Label not found" });
      return;
    }

    res.json(label);
  } catch (error) {
    res.status(500).json({ error: "update_label_failed" });
  }
};

const deleteLabel = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const label = await Label.deleteById(id);

    if (!label) {
      res.status(404).json({ error: "Label not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "delete_label_failed" });
  }
};

export { createLabel, deleteLabel, getAllLabels, updateLabel };
