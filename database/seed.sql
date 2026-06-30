-- Bu dosya ne ise yarar?
-- Gelistirme ve ogrenme icin ornek kategori ve gorev verileri ekler.

INSERT INTO categories (name)
VALUES
  ('Frontend'),
  ('Backend'),
  ('Database'),
  ('Kariyer')
ON CONFLICT (name) DO NOTHING;

INSERT INTO tasks (title, description, status, category_id)
VALUES
  (
    'Vue component yapisini tekrar et',
    'App.vue, component props ve emit mantigini incele.',
    'todo',
    (SELECT id FROM categories WHERE name = 'Frontend')
  ),
  (
    'Express route-controller ayrimini ogren',
    'Route sadece yolu tanimlasin, is mantigi controller icinde olsun.',
    'in_progress',
    (SELECT id FROM categories WHERE name = 'Backend')
  ),
  (
    'PostgreSQL tablo iliskisini incele',
    'tasks.category_id alaninin categories.id alanina baglanmasini anlamaya calis.',
    'done',
    (SELECT id FROM categories WHERE name = 'Database')
  );
