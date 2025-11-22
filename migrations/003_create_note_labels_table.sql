CREATE TABLE IF NOT EXISTS note_labels (
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, label_id)
);
