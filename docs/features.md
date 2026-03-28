# Digital Complaint Management System
### Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Users & Roles](#2-system-users--roles)
3. [Core Features](#3-core-features)
4. [Database Design](#4-database-design)
5. [Technology Stack](#5-technology-stack)
6. [Application Flow](#6-application-flow)
7. [UI Pages](#7-ui-pages)
8. [API Endpoints](#8-api-endpoints)
9. [Extra Features](#9-extra-features-for-high-marks)
10. [Example Use Case](#10-example-use-case)
11. [Project Setup](#11-project-setup)

---

## 1. Project Overview

The **Digital Complaint Management System** is a full-stack web application that enables users (students or employees) to raise, track, and manage complaints digitally. Admins can view, prioritize, update, and resolve these complaints through a centralized dashboard.

### Goal
Eliminate manual/paper-based complaint handling by providing a digital, trackable, role-based complaint resolution platform.

### Quick Example
> A student reports: **"WiFi not working in hostel"**
> → Admin receives it on the dashboard
> → Admin marks it **In Progress**
> → Admin resolves it → Status becomes **Resolved**
> → Student sees the update in their portal

---

## 2. System Users & Roles

### User (Student / Employee)

| Action | Description |
|--------|-------------|
| Register & Login | Create an account and authenticate |
| Submit Complaint | Fill out a complaint form with category and priority |
| Track Status | View real-time status of submitted complaints |
| View History | Browse all past complaints |

###  Admin

| Action | Description |
|--------|-------------|
| View All Complaints | See every complaint raised in the system |
| Update Status | Change status: `Pending → In Progress → Resolved` |
| Assign Priority | Mark complaints as Low / Medium / High |
| Manage Users *(optional)* | View, deactivate, or manage user accounts |
| Search & Filter | Filter complaints by category, status, priority, or user |

---

## 3. Core Features

###  3.1 User Authentication

Secure registration and login system with role-based access control.

**Fields:**
- Name
- Email
- Password *(hashed)*
- Role: `user` | `admin`

**Authentication Methods:**
- **Option 1:** Java Servlets + Sessions
- **Option 2 (Recommended):** JWT (JSON Web Token) with Node.js

---

###  3.2 Submit Complaint

Users submit complaints using a structured form.

**Form Fields:**

| Field | Type | Options |
|-------|------|---------|
| Title | Text | e.g., "Water leakage" |
| Description | Textarea | Detailed description |
| Category | Dropdown | Electrical, Network, Maintenance, Others |
| Priority | Radio/Select |  High,  Medium,  Low |
| Image Upload | File *(optional)* | JPG, PNG |

> All complaint data is stored in the MySQL database upon submission.

---

###  3.3 Complaint Tracking

Each complaint is tracked with full lifecycle details.

**Complaint Properties:**

| Property | Values |
|----------|--------|
| Status | `Pending` → `In Progress` → `Resolved` |
| Priority | `High` / `Medium` / `Low` |
| Date Created | Auto-generated timestamp |
| Last Updated | Auto-updated on status change |

**User Actions:**
- View all their submitted complaints
- Check current status in real time
- See timestamps for each update

---

###  3.4 Admin Dashboard 

The admin dashboard is the core feature of the system.

**Dashboard Stats:**
- Total Complaints
- Pending Complaints
- In Progress Complaints
- Resolved Complaints

**Admin Functionalities:**

| Feature | Description |
|---------|-------------|
| View All | Tabular view of all complaints |
| Update Status | Dropdown to change complaint status |
| Assign Priority | Modify priority of any complaint |
| Delete/Close | Remove or close outdated complaints |
| Filter | By category, status, or date |
| Search | By title, user name, or keyword |

---

###  3.5 Priority System

Complaints are color-coded for easy visual identification.

| Priority | Color | Example |
|----------|-------|---------|
|  High | Red | Electricity failure, fire hazard |
|  Medium | Yellow | Broken furniture, minor leaks |
|  Low | Green | Cleaning request, painting |

**Admin can:**
- Sort complaints by priority
- Filter view to show only high-priority items

---

###  3.6 Notifications

Simulated in-app notifications (no real email required for basic version).

**Basic Version:**
- Show message on dashboard: *"Your complaint has been resolved."*

**Advanced Version (Optional):**
- Email notification using **Nodemailer** (Node.js) when status changes

---

###  3.7 Search & Filter

Admin can quickly find specific complaints.

| Filter Type | Options |
|-------------|---------|
| By Category | Electrical / Network / Maintenance / Others |
| By Status | Pending / In Progress / Resolved |
| By Priority | High / Medium / Low |
| Search Bar | Title keyword / User name |

---

## 4. Database Design

###  Table: `users`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(150) | UNIQUE, NOT NULL |
| `password` | VARCHAR(255) | NOT NULL *(hashed)* |
| `role` | ENUM('user', 'admin') | DEFAULT 'user' |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |

---

###  Table: `complaints`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `user_id` | INT | FOREIGN KEY → users(id) |
| `title` | VARCHAR(200) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `category` | ENUM('Electrical', 'Network', 'Maintenance', 'Others') | NOT NULL |
| `priority` | ENUM('Low', 'Medium', 'High') | DEFAULT 'Low' |
| `status` | ENUM('Pending', 'In Progress', 'Resolved') | DEFAULT 'Pending' |
| `image_path` | VARCHAR(255) | NULLABLE |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP |

---

###  Entity Relationship Diagram (Text)

```
USERS (1) ─────────────── (Many) COMPLAINTS
  id ────────────────────── user_id (FK)
  name
  email
  role
```

---

## 5. Technology Stack

###  Frontend

| Technology | Purpose | Week |
|------------|---------|------|
| HTML5 | Structure and markup | Week 1 |
| CSS3 + Bootstrap | Styling and responsive design | Week 1 |
| JavaScript | Client-side validation | Week 2 |
| React.js | Component-based UI | Week 8 |

###  Backend — Choose One

**Option 1 — Java Stack:**

| Technology | Purpose |
|------------|---------|
| Java Servlets | Request handling and routing |
| JDBC | Database connectivity |
| Apache Tomcat | Application server |

**Option 2 — Node.js Stack (Recommended for speed):**

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework and routing |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| multer | Image/file upload handling |

###  Database

| Technology | Purpose |
|------------|---------|
| MySQL | Relational database |
| MySQL Workbench | Database management GUI |

###  Additional Libraries

| Library | Purpose | Week |
|---------|---------|------|
| REST API | CRUD operations via HTTP | Week 6 |
| JWT | Authentication & authorization | Week 7 |
| Chart.js | Graphs and data visualization *(optional)* | Week 8+ |

---

## 6. Application Flow

###  User Flow

```
Register / Login
      ↓
User Dashboard
      ↓
Submit Complaint (Fill Form)
      ↓
Complaint Stored in Database
      ↓
View My Complaints
      ↓
Check Status Updates
      ↓
Notification: "Resolved" 
```

###  Admin Flow

```
Admin Login
      ↓
Admin Dashboard (Stats Overview)
      ↓
View All Complaints (Table)
      ↓
Filter / Search Complaints
      ↓
Select Complaint
      ↓
Update Status / Priority
      ↓
Delete or Close Complaint
      ↓
Database Updated 
```

---

## 7. UI Pages

###  User Pages

| Page | Route | Description |
|------|-------|-------------|
| Register | `/register` | New user signup form |
| Login | `/login` | Authentication page |
| User Dashboard | `/dashboard` | Overview of complaint stats |
| Submit Complaint | `/submit` | Complaint submission form |
| My Complaints | `/my-complaints` | List of user's complaints with status |

###  Admin Pages

| Page | Route | Description |
|------|-------|-------------|
| Admin Dashboard | `/admin/dashboard` | Stats: total, pending, resolved |
| All Complaints | `/admin/complaints` | Full table with filters |
| Update Complaint | `/admin/complaints/:id` | Change status and priority |
| User Management | `/admin/users` | *(Optional)* Manage registered users |

---

## 8. API Endpoints

###  Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

###  Complaints (User)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/complaints` | Submit a new complaint |
| `GET` | `/api/complaints/my` | Get all complaints by logged-in user |
| `GET` | `/api/complaints/:id` | Get details of a specific complaint |

###  Complaints (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/complaints` | Get all complaints (with filters) |
| `PUT` | `/api/admin/complaints/:id` | Update status and/or priority |
| `DELETE` | `/api/admin/complaints/:id` | Delete a complaint |

---

## 9. Extra Features (For High Marks )

Add one or more of the following to boost your project score:

| Feature | Tool/Library | Description |
|---------|-------------|-------------|
|  Charts & Graphs | Chart.js | Bar/pie chart: complaints per category |
|  Complaint Timeline | Custom UI | Show history of status changes |
|  Image Upload | multer / formData | Attach photo evidence to complaint |
|  Real-time Updates | Socket.io *(optional)* | Live status change notifications |
|  Responsive Design | Bootstrap / CSS Flex | Mobile-friendly layout across all pages |
|  Email Notifications | Nodemailer | Send email on status update |
|  Export to PDF/CSV | jsPDF / csv-writer | Admin can export complaint reports |

---

## 10. Example Use Case

```
Step 1: User Logs In
  → Email: john@student.edu | Password: ●●●●●●

Step 2: User Submits Complaint
  → Title:       "Fan not working in Lab 3"
  → Category:    Electrical
  → Priority:    High 
  → Description: "The ceiling fan in Lab 3 has stopped working
                  since Monday. It is affecting classes."
  → Status:      Pending (auto-assigned)

Step 3: Admin Sees Complaint
  → Dashboard shows: 1 new High-priority complaint
  → Admin reviews details

Step 4: Admin Updates Status
  → Changes status to: "In Progress"
  → User sees updated status on their dashboard

Step 5: Admin Resolves Issue
  → Changes status to: "Resolved"
  → Notification shown: "Your complaint has been resolved "

Step 6: User Confirms
  → Views complaint history
  → Sees "Resolved" with updated timestamp
```

---

## 11. Project Setup

### Prerequisites

```bash
# For Node.js stack
node -v        # v18+
npm -v         # v8+
mysql --version
```

### Installation (Node.js)

```bash
# 1. Clone the project
git clone https://github.com/your-repo/complaint-management-system.git
cd complaint-management-system

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

# 4. Setup database
mysql -u root -p < database/schema.sql

# 5. Start the server
npm start
# Server running at http://localhost:3000
```

### Environment Variables (`.env`)

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=complaint_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### Folder Structure

```
complaint-management-system/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SubmitComplaint.jsx
│   │   │   ├── MyComplaints.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       └── AllComplaints.jsx
│   │   └── App.jsx
├── server/                    # Express backend
│   ├── routes/
│   │   ├── auth.js
│   │   └── complaints.js
│   ├── controllers/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   └── index.js
├── database/
│   └── schema.sql
├── .env
├── package.json
└── README.md
```

---

##  Notes

- All passwords must be **hashed** using bcrypt before storing in the database.
- JWT tokens should be stored in **HttpOnly cookies** or `localStorage` (with caution).
- Image uploads should be validated for **file type and size** before saving.
- Admin routes must be protected using **role-based middleware**.
- Always sanitize user inputs to prevent **SQL Injection** and **XSS** attacks.

---

*Documentation prepared for Digital Complaint Management System — Academic Project*
