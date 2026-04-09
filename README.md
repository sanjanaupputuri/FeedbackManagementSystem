# Feedback Management System

A web application for managing complaints and feedback with user and admin roles.

## Features

- User registration and login
- Submit complaints with categories and priorities
- Track complaint status in real-time
- Admin dashboard to manage all complaints
- Search and filter functionality

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, React  
**Backend:** Node.js, Express  
**Database:** MySQL  
**Auth:** JWT

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
mysql -u root -p < database/schema.sql

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start server
npm start
```

## Database Tables

**users:** id, name, email, password, role, created_at  
**complaints:** id, user_id, title, description, category, priority, status, created_at, updated_at

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
├── client/          # React frontend
├── server/          # Express backend
├── database/        # SQL schema
└── .env            # Environment config
```

For detailed documentation, see `/docs` folder.