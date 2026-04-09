CREATE DATABASE IF NOT EXISTS feedback_db;
USE feedback_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Electrical', 'Network', 'Maintenance', 'Others') NOT NULL,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_user_id ON complaints(user_id);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);

CREATE TABLE complaint_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    complaint_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE complaint_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    complaint_id INT NOT NULL,
    changed_by INT NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_complaint ON complaint_comments(complaint_id);
CREATE INDEX idx_history_complaint ON complaint_history(complaint_id);
