# Quick Start Guide - Feedback Management System

## Prerequisites
- Node.js 18+ installed
- MySQL 8.0+ running
- Git installed

## Setup Instructions

### 1. Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Run schema
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup
```bash
# Install dependencies (if not already done)
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Start backend server
npm start
# Server will run on http://localhost:3000
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies (if not already done)
npm install

# Start React development server
npm start
# Frontend will run on http://localhost:3001
```

## Test Credentials

### Regular User
- Email: test@test.com
- Password: 1234
- Role: user

### Create Admin User
```bash
# Register through API or frontend
# Then update role in database:
mysql -u root -p feedback_db
UPDATE users SET role = 'admin' WHERE email = 'your-admin@email.com';
```

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/about` - About page
- `/contact` - Contact page

### User Routes (Requires Login)
- `/dashboard` - User dashboard
- `/submit` - Submit new complaint
- `/my-complaints` - View my complaints
- `/complaints/:id` - Complaint details
- `/profile` - User profile

### Admin Routes (Requires Admin Role)
- `/admin` - Admin dashboard
- `/admin/complaints` - Manage all complaints
- `/admin/complaints/:id` - Complaint detail (admin view)
- `/admin/analytics` - Analytics and charts

## API Endpoints

### Authentication
```bash
# Register
POST http://localhost:3000/api/auth/register
Body: { "name": "John Doe", "email": "john@example.com", "password": "1234" }

# Login
POST http://localhost:3000/api/auth/login
Body: { "email": "john@example.com", "password": "1234" }
```

### Complaints (User)
```bash
# Submit complaint
POST http://localhost:3000/api/complaints
Headers: Authorization: Bearer <token>
Body: FormData with title, description, category, priority, image (optional)

# Get my complaints
GET http://localhost:3000/api/complaints/my
Headers: Authorization: Bearer <token>

# Get complaint by ID
GET http://localhost:3000/api/complaints/:id
Headers: Authorization: Bearer <token>
```

### Admin
```bash
# Get all complaints
GET http://localhost:3000/api/admin/complaints
Headers: Authorization: Bearer <admin-token>

# Get statistics
GET http://localhost:3000/api/admin/stats
Headers: Authorization: Bearer <admin-token>

# Update complaint
PUT http://localhost:3000/api/admin/complaints/:id
Headers: Authorization: Bearer <admin-token>
Body: { "status": "In Progress", "priority": "High" }

# Delete complaint
DELETE http://localhost:3000/api/admin/complaints/:id
Headers: Authorization: Bearer <admin-token>
```

## Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is already in use
lsof -i :3000
# Kill the process if needed
kill -9 <PID>

# Check MySQL connection
mysql -u root -p -e "SELECT 1"
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database connection error
```bash
# Verify .env file has correct credentials
cat .env

# Test MySQL connection
mysql -u root -p -e "USE feedback_db; SHOW TABLES;"
```

### CORS errors
- Backend has CORS enabled
- Frontend uses proxy in package.json
- Make sure both servers are running

## Development Workflow

1. Start backend: `npm start` (from root)
2. Start frontend: `cd client && npm start`
3. Open browser: http://localhost:3001
4. Register a new user or login
5. Test features

## Project Structure

```
FeedbackManagementSystem/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # Context providers
│       ├── services/       # API services
│       ├── utils/          # Utilities
│       └── styles/         # CSS files
├── config/                 # Backend config
├── controllers/            # Route handlers
├── database/               # SQL files
├── middleware/             # Express middleware
├── models/                 # Database models
├── routes/                 # API routes
├── utils/                  # Backend utilities
├── uploads/                # Uploaded files
└── server.js               # Backend entry point
```

## Next Steps

- Implement remaining pages (Phase 2-8)
- Add Chart.js visualizations
- Create XML files for syllabus requirement
- Add comprehensive testing
- Deploy to production

## Support

For issues or questions:
1. Check logs: `tail -f backend.log`
2. Check browser console for frontend errors
3. Verify all dependencies installed
4. Ensure MySQL is running

---

**Status:** Phase 1 Complete ✅
**Last Updated:** April 12, 2026
