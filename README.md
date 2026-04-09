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

**Complaints:**
- POST /api/complaints - Submit complaint
- GET /api/complaints/my - Get user's complaints
- GET /api/admin/complaints - Get all complaints (admin)
- PUT /api/admin/complaints/:id - Update complaint (admin)

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── database/        # SQL schema
└── .env            # Environment config
```

For detailed documentation, see `/docs` folder.