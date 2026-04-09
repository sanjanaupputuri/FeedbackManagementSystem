# Implementation Plan - Feedback Management System

**Project:** Feedback Management System  
**Start Date:** April 9, 2026  
**Tech Stack:** React + Node.js + Express + MySQL

---

## Phase 1: Database Setup (Day 1)

### 1.1 Database Schema
```sql
-- Create database
CREATE DATABASE feedback_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints table
CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Electrical', 'Network', 'Maintenance', 'Others') NOT NULL,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@feedback.com', '$2b$10$hashed_password', 'admin');
```

**Files to create:**
- `database/schema.sql`
- `database/seed.sql`

---

## Phase 2: Backend Implementation (Days 2-4)

### 2.1 Project Structure
```
server/
├── config/
│   └── database.js          # MySQL connection
├── models/
│   ├── User.js              # User model
│   └── Complaint.js         # Complaint model
├── controllers/
│   ├── authController.js    # Register, login
│   └── complaintController.js # CRUD operations
├── middleware/
│   ├── auth.js              # JWT verification
│   └── adminAuth.js         # Admin role check
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── complaintRoutes.js   # Complaint endpoints
├── utils/
│   └── jwt.js               # JWT helper
├── .env                     # Environment variables
├── server.js                # Entry point
└── package.json
```

### 2.2 Backend Tasks

#### Day 2: Core Setup
- [x] Initialize Node.js project: `npm init -y`
- [ ] Install dependencies:
  ```bash
  npm install express mysql2 bcryptjs jsonwebtoken dotenv cors
  npm install -D nodemon
  ```
- [ ] Create `.env` file
- [ ] Setup database connection (`config/database.js`)
- [ ] Create server entry point (`server.js`)

#### Day 3: Authentication
- [ ] User model with CRUD methods (`models/User.js`)
- [ ] Auth controller (`controllers/authController.js`)
  - Register endpoint
  - Login endpoint
  - Password hashing with bcrypt
  - JWT token generation
- [ ] Auth middleware (`middleware/auth.js`)
- [ ] Auth routes (`routes/authRoutes.js`)

#### Day 4: Complaint Management
- [ ] Complaint model (`models/Complaint.js`)
- [ ] Complaint controller (`controllers/complaintController.js`)
  - Create complaint
  - Get user complaints
  - Get all complaints (admin)
  - Update complaint (admin)
  - Delete complaint (admin)
- [ ] Admin middleware (`middleware/adminAuth.js`)
- [ ] Complaint routes (`routes/complaintRoutes.js`)

### 2.3 API Endpoints

#### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
```

#### Complaints (User)
```
POST   /api/complaints              # Create complaint
GET    /api/complaints/my           # Get my complaints
GET    /api/complaints/:id          # Get single complaint
```

#### Complaints (Admin)
```
GET    /api/admin/complaints        # Get all complaints
PUT    /api/admin/complaints/:id    # Update complaint
DELETE /api/admin/complaints/:id    # Delete complaint
GET    /api/admin/stats             # Dashboard statistics
```

---

## Phase 3: Frontend Implementation (Days 5-8)

### 3.1 Project Structure
```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ComplaintCard.jsx
│   │   ├── ComplaintForm.jsx
│   │   └── ComplaintTable.jsx
│   ├── pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── validation.js
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

### 3.2 Frontend Tasks

#### Day 5: Setup & Authentication
- [ ] Create React app: `npx create-react-app client`
- [ ] Install dependencies:
  ```bash
  npm install react-router-dom axios bootstrap
  ```
- [ ] Setup routing (`App.jsx`)
- [ ] Create AuthContext for state management
- [ ] API service with axios (`services/api.js`)
- [ ] Register page (`pages/Register.jsx`)
- [ ] Login page (`pages/Login.jsx`)
- [ ] Navbar component (`components/Navbar.jsx`)

#### Day 6: User Dashboard
- [ ] User Dashboard page (`pages/UserDashboard.jsx`)
- [ ] Complaint Form component (`components/ComplaintForm.jsx`)
- [ ] Complaint Card component (`components/ComplaintCard.jsx`)
- [ ] Form validation (`utils/validation.js`)
- [ ] Submit complaint functionality
- [ ] Display user's complaints
- [ ] Filter by status/category

#### Day 7: Admin Dashboard
- [ ] Admin Dashboard page (`pages/AdminDashboard.jsx`)
- [ ] Complaint Table component (`components/ComplaintTable.jsx`)
- [ ] Display all complaints
- [ ] Update status functionality
- [ ] Delete complaint functionality
- [ ] Search and filter
- [ ] Statistics cards (total, pending, resolved)

#### Day 8: Polish & Additional Pages
- [ ] About page (`pages/About.jsx`)
- [ ] Contact page (`pages/Contact.jsx`)
- [ ] Responsive CSS styling (`styles/main.css`)
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Mobile responsiveness

---

## Phase 4: Integration & Testing (Day 9)

### 4.1 Integration
- [ ] Connect frontend to backend API
- [ ] Test all API endpoints with Postman
- [ ] Fix CORS issues
- [ ] Test JWT authentication flow
- [ ] Test protected routes

### 4.2 Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] JWT token storage
- [ ] Submit complaint
- [ ] View complaints
- [ ] Update complaint status (admin)
- [ ] Delete complaint (admin)
- [ ] Search/filter functionality
- [ ] Logout functionality
- [ ] Responsive design on mobile

---

## Phase 5: Syllabus Requirements (Day 10)

### 5.1 XML Validation
- [ ] Create `database/complaints.xml`
- [ ] Create `database/complaints.dtd`
- [ ] Create `database/complaints.xsd`
- [ ] Add XML export endpoint

### 5.2 Chart.js Integration
- [ ] Install: `npm install chart.js react-chartjs-2`
- [ ] Create ComplaintChart component
- [ ] Display complaints by category
- [ ] Display complaints by status
- [ ] Display complaints over time

### 5.3 Node.js Modules Demo
- [ ] Create system info endpoint (OS module)
- [ ] Demonstrate path module
- [ ] Add event emitter example

---

## Phase 6: Documentation & Deployment (Day 11)

### 6.1 Documentation
- [ ] Update README.md
- [ ] API documentation
- [ ] Setup instructions
- [ ] Environment variables guide
- [ ] User manual
- [ ] Admin manual

### 6.2 Deployment
- [ ] Push to GitHub
- [ ] Create .gitignore
- [ ] Add deployment instructions
- [ ] Optional: Deploy to Vercel/Heroku

---

## Implementation Priority

### Must Have (Core Features)
1. ✅ Database schema
2. ✅ User authentication (register/login)
3. ✅ JWT authorization
4. ✅ Submit complaint
5. ✅ View complaints
6. ✅ Admin dashboard
7. ✅ Update complaint status
8. ✅ Responsive design

### Should Have (Important)
1. Search and filter
2. Form validation
3. Error handling
4. About/Contact pages
5. Chart.js visualization
6. XML with DTD/XSD

### Nice to Have (Optional)
1. Weather API integration
2. Real-time notifications
3. Email notifications
4. File upload for complaints
5. Export to PDF/Excel

---

## Daily Breakdown

| Day | Focus | Deliverables |
|-----|-------|--------------|
| 1 | Database | Schema, tables, seed data |
| 2 | Backend Setup | Server, DB connection, structure |
| 3 | Authentication | Register, login, JWT |
| 4 | Complaints API | CRUD endpoints, middleware |
| 5 | Frontend Setup | React app, routing, auth pages |
| 6 | User Features | Dashboard, submit complaint |
| 7 | Admin Features | Admin dashboard, manage complaints |
| 8 | UI Polish | Styling, responsiveness, pages |
| 9 | Testing | Integration, bug fixes |
| 10 | Syllabus Items | XML, charts, modules |
| 11 | Documentation | Docs, deployment, GitHub |

---

## Environment Setup

### Backend `.env`
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=feedback_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Dependencies

### Backend
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "axios": "^1.5.0",
    "bootstrap": "^5.3.2",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

---

## Git Workflow

```bash
# Initialize
git init
git add .
git commit -m "Initial commit"

# Daily commits
git add .
git commit -m "feat: implement user authentication"
git commit -m "feat: add complaint CRUD operations"
git commit -m "feat: create admin dashboard"

# Push to GitHub
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Success Metrics

- [ ] All API endpoints working
- [ ] All pages responsive
- [ ] JWT authentication secure
- [ ] Database normalized
- [ ] Code well-commented
- [ ] Git history clean
- [ ] Documentation complete
- [ ] Syllabus requirements met
- [ ] Demo-ready

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Database connection issues | Test connection early, use try-catch |
| CORS errors | Configure CORS properly in Express |
| JWT token expiry | Implement refresh token logic |
| Form validation | Use both client and server validation |
| Mobile responsiveness | Use Bootstrap grid, test early |
| Time constraints | Focus on must-have features first |

---

## Next Steps

1. **Start with Phase 1**: Create database schema
2. **Move to Phase 2**: Build backend API
3. **Then Phase 3**: Develop frontend
4. **Finally integrate**: Connect everything

**Estimated Total Time:** 11 days (working 4-6 hours/day)

Ready to start implementation? Begin with:
```bash
mkdir -p server/{config,models,controllers,middleware,routes,utils}
mkdir -p database
touch database/schema.sql
```
