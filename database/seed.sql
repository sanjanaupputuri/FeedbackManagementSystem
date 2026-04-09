USE feedback_db;

-- Seed flow for this lab project:
-- 1. Register these users through the API with password: 1234
--    admin@feedback.com
--    john@example.com
--    jane@example.com
-- 2. Run the statements below.

UPDATE users
SET role = 'admin'
WHERE email = 'admin@feedback.com';

-- Insert sample complaints
INSERT INTO complaints (user_id, title, description, category, priority, status)
SELECT id, 'WiFi not working in Room 301', 'The WiFi connection keeps dropping every few minutes. Unable to attend online classes.', 'Network', 'High', 'Pending'
FROM users
WHERE email = 'john@example.com';

INSERT INTO complaints (user_id, title, description, category, priority, status)
SELECT id, 'Broken light in corridor', 'The light on the 3rd floor corridor has been broken for 2 days.', 'Electrical', 'Medium', 'In Progress'
FROM users
WHERE email = 'john@example.com';

INSERT INTO complaints (user_id, title, description, category, priority, status)
SELECT id, 'AC not cooling properly', 'The air conditioner in Room 205 is not cooling properly despite being on full blast.', 'Maintenance', 'High', 'Pending'
FROM users
WHERE email = 'jane@example.com';

INSERT INTO complaints (user_id, title, description, category, priority, status)
SELECT id, 'Projector issue in Lab 4', 'The projector in Computer Lab 4 is not displaying properly.', 'Others', 'Low', 'Resolved'
FROM users
WHERE email = 'jane@example.com';
