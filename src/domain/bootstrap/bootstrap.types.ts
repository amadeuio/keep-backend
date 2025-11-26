import { LabelAPI } from "../labels/label.types";
import { NoteAPI } from "../notes/note.types";

export interface BootstrapAPI {
  notesById: Record<string, NoteAPI>;
  notesOrder: string[];
  labelsById: Record<string, LabelAPI>;
}
