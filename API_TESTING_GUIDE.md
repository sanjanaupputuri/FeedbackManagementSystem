# API Testing Guide

This file explains:
- what the project does
- how to set up the database
- how to start the backend server
- how to create a user and admin
- how to test every main API endpoint

## Project Summary

This project is a backend and database implementation for a Feedback Management System.

Main functions:
- user registration and login with JWT authentication
- complaint creation by users
- complaint tracking by status
- admin complaint management
- comments on complaints
- audit history for complaint updates
- image upload support for complaints

Tech stack:
- Node.js
- Express
- MySQL
- JWT
- multer

## Folder Areas

- `server.js`: starts the Express server
- `routes/`: API route definitions
- `controllers/`: request handling logic
- `models/`: database queries
- `middleware/`: auth, validation, upload handling
- `database/schema.sql`: full database schema
- `database/seed.sql`: sample complaint data for registered users

## Test Account Password

Use this lab password for all test users:

`1234`

## Full Setup Flow

### 1. Install dependencies

Run:

```bash
npm install
```

### 2. Create environment file

Run:

```bash
cp .env.example .env
```

Then edit `.env` and set your MySQL details.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=feedback_db
JWT_SECRET=lab_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. Create database tables

Run:

```bash
mysql -u root -p < database/schema.sql
```

This creates:
- `users`
- `complaints`
- `complaint_comments`
- `complaint_history`

### 4. Start the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

When the server starts, it runs on:

`http://localhost:3000`

### 5. Check server health

Request:

```http
GET /api/health
```

Full URL:

`http://localhost:3000/api/health`

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## User and Admin Creation Flow

Important:
- registration always creates a normal `user`
- admin must be promoted manually in MySQL after registration

### Step 1. Register normal user

Endpoint:

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "1234"
}
```

### Step 2. Register admin account

Endpoint:

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Admin User",
  "email": "admin@feedback.com",
  "password": "1234"
}
```

### Step 3. Promote the admin in MySQL

Run this in MySQL:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'admin@feedback.com';
```

### Step 4. Login user/admin

Endpoint:

```http
POST /api/auth/login
```

User login body:

```json
{
  "email": "john@example.com",
  "password": "1234"
}
```

Admin login body:

```json
{
  "email": "admin@feedback.com",
  "password": "1234"
}
```

Save the returned JWT tokens.

Use them in:

```http
Authorization: Bearer YOUR_TOKEN
```

## Optional Sample Data Flow

If you also want sample complaints:

1. Register these users first through the API:
- `john@example.com`
- `jane@example.com`
- `admin@feedback.com`

2. Promote admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@feedback.com';
```

3. Run:

```bash
mysql -u root -p < database/seed.sql
```

## API Endpoints to Test

Base URL:

`http://localhost:3000`

### 1. Register

Request:

```http
POST /api/auth/register
Content-Type: application/json
```

Body:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "1234"
}
```

### 2. Login

Request:

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "jane@example.com",
  "password": "1234"
}
```

### 3. Create Complaint

Request:

```http
POST /api/complaints
Authorization: Bearer USER_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "title": "WiFi not working in Room 301",
  "description": "The WiFi connection is unstable and keeps disconnecting during class.",
  "category": "Network",
  "priority": "High"
}
```

Allowed categories:
- `Electrical`
- `Network`
- `Maintenance`
- `Others`

Allowed priorities:
- `Low`
- `Medium`
- `High`

### 4. Create Complaint With Image

Use `multipart/form-data` instead of raw JSON.

Fields:
- `title`: `Projector issue in lab`
- `description`: `The projector is not displaying clearly in lab 2.`
- `category`: `Others`
- `priority`: `Medium`
- `image`: attach image file

### 5. Get My Complaints

Request:

```http
GET /api/complaints/my
Authorization: Bearer USER_TOKEN
```

### 6. Get Complaint By ID

Request:

```http
GET /api/complaints/1
Authorization: Bearer USER_TOKEN
```

### 7. Add Comment

Request:

```http
POST /api/complaints/1/comments
Authorization: Bearer USER_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "comment": "Please resolve this issue as soon as possible."
}
```

### 8. Get Comments

Request:

```http
GET /api/complaints/1/comments
Authorization: Bearer USER_TOKEN
```

### 9. Get Complaint History

Request:

```http
GET /api/complaints/1/history
Authorization: Bearer USER_TOKEN
```

Note:
- normal users can access history only for their own complaints
- admins can access any complaint history

### 10. Admin: Get All Complaints

Request:

```http
GET /api/admin/complaints
Authorization: Bearer ADMIN_TOKEN
```

With filters:

```http
GET /api/admin/complaints?page=1&limit=10&status=Pending&category=Network&priority=High
Authorization: Bearer ADMIN_TOKEN
```

### 11. Admin: Get Stats

Request:

```http
GET /api/admin/stats
Authorization: Bearer ADMIN_TOKEN
```

### 12. Admin: Update Complaint

Request:

```http
PUT /api/admin/complaints/1
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "status": "In Progress",
  "priority": "High"
}
```

Allowed statuses:
- `Pending`
- `In Progress`
- `Resolved`

### 13. Admin: Delete Complaint

Request:

```http
DELETE /api/admin/complaints/1
Authorization: Bearer ADMIN_TOKEN
```

## Suggested Testing Order

Follow this order:

1. `GET /api/health`
2. `POST /api/auth/register` for `john@example.com`
3. `POST /api/auth/register` for `jane@example.com`
4. `POST /api/auth/register` for `admin@feedback.com`
5. promote admin in MySQL
6. `POST /api/auth/login` for user
7. `POST /api/auth/login` for admin
8. `POST /api/complaints`
9. `GET /api/complaints/my`
10. `POST /api/complaints/:id/comments`
11. `GET /api/complaints/:id/comments`
12. `GET /api/admin/complaints`
13. `PUT /api/admin/complaints/:id`
14. `GET /api/complaints/:id/history`
15. `GET /api/admin/stats`
16. `DELETE /api/admin/complaints/:id`

## Common Notes

- all protected routes need a Bearer token
- users can only access their own complaint details, comments, and history
- admins can manage all complaints
- complaint history is created when admin updates status or priority
- registration password rule is simple for lab use: minimum 4 characters

## Quick Postman Headers

For JSON requests:

```http
Content-Type: application/json
```

For authorized requests:

```http
Authorization: Bearer YOUR_TOKEN
```

## Current Backend Scope

This project currently covers backend and database only.

Included:
- authentication
- complaint APIs
- admin APIs
- database schema
- sample data flow
- comments
- audit history

Not included in current scope:
- frontend UI
- charts
- email notifications
- realtime updates
