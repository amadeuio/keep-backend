import { Request, Response } from "express";
import LabelModel from "../models/Label";
import NoteModel from "../models/Note";
import NoteLabelModel from "../models/NoteLabel";
import { LabelCreateRequest } from "../types/labels";
import { NoteCreateRequest, NoteUpdateRequest } from "../types/notes";

const getAllNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await NoteModel.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

const createNote = async (
  req: Request<{}, {}, NoteCreateRequest>,
  res: Response
) => {
  try {
    const { id, title, content, colorId, isPinned, isArchived, labelIds } =
      req.body;

    if (!id) {
      res.status(400).json({ error: "id is required" });
      return;
    }

    const note = await NoteModel.create(
      id,
      title,
      content,
      colorId,
      isPinned,
      isArchived
    );

    if (Array.isArray(labelIds) && labelIds.length > 0) {
      await NoteLabelModel.addLabelsToNote(note.id, labelIds);
    }

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

const updateNote = async (
  req: Request<{ id: string }, {}, NoteUpdateRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, content, colorId, isPinned, isArchived } = req.body;

    const note = await NoteModel.update(
      id,
      title,
      content,
      colorId,
      isPinned,
      isArchived
    );

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

const deleteNote = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.delete(id);

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

const addLabelToNote = async (
  req: Request<{ id: string; labelId: string }>,
  res: Response
) => {
  try {
    const { id, labelId } = req.params;

    if (!id || !labelId) {
      res.status(400).json({ error: "id and labelId are required" });
      return;
    }

    await NoteLabelModel.addLabelToNote(id, labelId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to add label to note" });
  }
};

const removeLabelFromNote = async (
  req: Request<{ id: string; labelId: string }>,
  res: Response
) => {
  try {
    const { id, labelId } = req.params;

    if (!id || !labelId) {
      res.status(400).json({ error: "id and labelId are required" });
      return;
    }

    await NoteLabelModel.removeLabelFromNote(id, labelId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to remove label from note" });
  }
};

const createLabelAndAddToNote = async (
  req: Request<{ id: string }, {}, LabelCreateRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { id: labelId, name } = req.body;

    if (!id || !labelId || !name) {
      res.status(400).json({ error: "id, labelId and name are required" });
      return;
    }

    const label = await LabelModel.create(labelId, name);
    await NoteLabelModel.addLabelToNote(id, labelId);

    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: "Failed to create label and add to note" });
  }
};

export {
  addLabelToNote,
  createLabelAndAddToNote,
  createNote,
  deleteNote,
  getAllNotes,
  removeLabelFromNote,
  updateNote,
};
