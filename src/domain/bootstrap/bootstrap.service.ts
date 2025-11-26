import { labelService } from "../labels/label.service";
import { noteService } from "../notes/note.service";
import { BootstrapAPI } from "./bootstrap.types";

export const bootstrapService = {
  findAll: async (): Promise<BootstrapAPI> => {
    const [notes, labelsById] = await Promise.all([
      noteService.findAll(),
      labelService.findAll(),
    ]);

    return {
      notesById: notes.notesById,
      notesOrder: notes.notesOrder,
      labelsById: labelsById,
    };
  },
};
