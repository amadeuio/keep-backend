TRUNCATE note_labels CASCADE;

INSERT INTO note_labels (note_id, label_id)
SELECT n.id, l.id
FROM (VALUES
  ('Welcome Note', 'Work'),
  ('Welcome Note', 'Personal'),
  ('Shopping List', 'Shopping'),
  ('Meeting Notes', 'Work'),
  ('Meeting Notes', 'Important'),
  ('Personal Reminder', 'Personal'),
  ('Ideas for Project', 'Ideas'),
  ('Important Task', 'Important'),
  ('Important Task', 'Urgent'),
  ('Archived Note', 'Archive')
) AS pairs(note_title, label_name)
JOIN notes n ON n.title = pairs.note_title
JOIN labels l ON l.name = pairs.label_name;