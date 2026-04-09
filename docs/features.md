# Features Documentation

## Core Features

### 1. User Authentication
- Register with name, email, password
- Login with JWT tokens
- Role-based access (user/admin)
- Lab password rule: minimum 4 characters

### 2. Submit Complaint
**Form Fields:**
- Title (required)
- Description (required)
- Category: Electrical, Network, Maintenance, Others
- Priority: High, Medium, Low
- Image upload (optional)

### 3. Track Complaints
**Status Flow:** Pending → In Progress → Resolved

**User Can:**
- View all their complaints
- See current status
- Check timestamps

### 4. Admin Dashboard
**Metrics:**
- Total complaints
- Pending count
- In progress count
- Resolved count

**Actions:**
- View all complaints
- Update status
- Change priority
- Search and filter
- Delete complaints

### 5. Search & Filter
- By category
- By status
- By priority

## Database Schema

### users
```sql
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(100) NOT NULL
email VARCHAR(150) UNIQUE NOT NULL
password VARCHAR(255) NOT NULL
role ENUM('user', 'admin') DEFAULT 'user'
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

### complaints
```sql
id INT PRIMARY KEY AUTO_INCREMENT
user_id INT FOREIGN KEY
title VARCHAR(200) NOT NULL
description TEXT NOT NULL
category ENUM('Electrical', 'Network', 'Maintenance', 'Others')
priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low'
status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending'
image_path VARCHAR(255)
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
```

### complaint_comments
```sql
id INT PRIMARY KEY AUTO_INCREMENT
complaint_id INT FOREIGN KEY
user_id INT FOREIGN KEY
comment TEXT NOT NULL
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

### complaint_history
```sql
id INT PRIMARY KEY AUTO_INCREMENT
complaint_id INT FOREIGN KEY
changed_by INT FOREIGN KEY
field_name VARCHAR(50) NOT NULL
old_value VARCHAR(255)
new_value VARCHAR(255)
changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Complaints (User)
- `POST /api/complaints` - Submit complaint
- `GET /api/complaints/my` - Get user's complaints
- `GET /api/complaints/:id` - Get complaint details
- `POST /api/complaints/:id/comments` - Add comment
- `GET /api/complaints/:id/comments` - Get comments
- `GET /api/complaints/:id/history` - Get complaint history

### Complaints (Admin)
- `GET /api/admin/complaints` - Get all complaints
- `PUT /api/admin/complaints/:id` - Update complaint
- `DELETE /api/admin/complaints/:id` - Delete complaint

## Tech Stack

**Backend:** Node.js, Express  
**Database:** MySQL  
**Auth:** JWT, bcrypt  
**File Upload:** multer

## Setup

```bash
# Install
npm install

# Database
mysql -u root -p < database/schema.sql

# Environment
cp .env.example .env

# Start
npm start
```

## Environment Variables

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=feedback_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```
