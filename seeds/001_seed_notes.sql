TRUNCATE notes CASCADE;

INSERT INTO notes (title, content, color_id, is_pinned, is_archived, is_trashed) VALUES 
  ('Welcome Note', 'This is your first note! Start writing...', 'default', false, false, false),
  ('Shopping List', 'Milk, Eggs, Bread, Cheese', 'yellow', false, false, false),
  ('Meeting Notes', 'Discuss project timeline and deliverables', 'blue', true, false, false),
  ('Personal Reminder', 'Call mom this weekend', 'green', false, false, false),
  ('Ideas for Project', 'Feature ideas: dark mode, search, filters', 'purple', false, false, false),
  ('Archived Note', 'This note is archived', 'default', false, true, false),
  ('Important Task', 'Complete the backend API by Friday', 'red', true, false, false)

