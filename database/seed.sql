USE feedback_db;

-- Insert admin user (password: 1234)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@feedback.com', '$2b$10$rKz8qH8X8X8X8X8X8X8X8uYvN5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'admin');

-- Insert sample users (password: 1234)
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', '$2b$10$rKz8qH8X8X8X8X8X8X8X8uYvN5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'user'),
('Jane Smith', 'jane@example.com', '$2b$10$rKz8qH8X8X8X8X8X8X8X8uYvN5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'user');

-- Insert sample complaints
INSERT INTO complaints (user_id, title, description, category, priority, status) VALUES
(2, 'WiFi not working in Room 301', 'The WiFi connection keeps dropping every few minutes. Unable to attend online classes.', 'Network', 'High', 'Pending'),
(2, 'Broken light in corridor', 'The light on the 3rd floor corridor has been broken for 2 days.', 'Electrical', 'Medium', 'In Progress'),
(3, 'AC not cooling properly', 'The air conditioner in Room 205 is not cooling properly despite being on full blast.', 'Maintenance', 'High', 'Pending'),
(3, 'Projector issue in Lab 4', 'The projector in Computer Lab 4 is not displaying properly.', 'Others', 'Low', 'Resolved');
