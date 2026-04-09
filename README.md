# Feedback Management System Backend

Backend and database setup for a complaint and feedback management system with user and admin roles.

## Features

- User registration and login
- Submit complaints with categories and priorities
- Track complaint status
- Admin APIs to manage all complaints
- Comments and audit history
- Search and filter support for admin views

## Tech Stack

**Backend:** Node.js, Express  
**Database:** MySQL  
**Auth:** JWT

## Quick Start

```bash
# Install dependencies
npm install

# Setup database schema
mysql -u root -p < database/schema.sql

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Optional sample data:
# 1. Register users with password 1234
# 2. Then run:
mysql -u root -p < database/seed.sql

# Start server
npm start
```

## Database Tables

**users:** id, name, email, password, role, created_at  
**complaints:** id, user_id, title, description, category, priority, status, created_at, updated_at  
**complaint_comments:** id, complaint_id, user_id, comment, created_at  
**complaint_history:** id, complaint_id, changed_by, field_name, old_value, new_value, changed_at

## API Endpoints

**Auth:**
- POST /api/auth/register
- POST /api/auth/login

**Complaints (User):**
- POST /api/complaints - Submit complaint (with optional image)
- GET /api/complaints/my - Get user's complaints
- GET /api/complaints/:id - Get complaint details
- POST /api/complaints/:id/comments - Add comment
- GET /api/complaints/:id/comments - Get comments
- GET /api/complaints/:id/history - Get audit history

**Admin:**
- GET /api/admin/complaints - Get all complaints (paginated, filterable)
- GET /api/admin/stats - Get statistics
- PUT /api/admin/complaints/:id - Update complaint
- DELETE /api/admin/complaints/:id - Delete complaint

## Project Structure

```
├── config/          # MySQL connection pool
├── controllers/     # Route handlers
├── database/        # Schema and sample data
├── middleware/      # Auth, validation, upload
├── models/          # Database queries
├── routes/          # Auth, complaint, admin routes
├── utils/           # JWT and logging helpers
└── server.js        # Entry point
```

For detailed documentation, see `/docs` folder.
