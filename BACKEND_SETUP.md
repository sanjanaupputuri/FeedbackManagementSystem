# Backend Setup Complete

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Login to MySQL
mysql -u root -p

# Run schema
mysql -u root -p < database/schema.sql
```

### 3. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your MySQL credentials
nano .env
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints (User)
- `POST /api/complaints` - Create complaint (requires auth)
- `GET /api/complaints/my` - Get my complaints (requires auth)
- `GET /api/complaints/:id` - Get complaint by ID (requires auth)

### Admin
- `GET /api/complaints/admin/all` - Get all complaints (admin only)
- `GET /api/complaints/admin/stats` - Get statistics (admin only)
- `PUT /api/complaints/admin/:id` - Update complaint (admin only)
- `DELETE /api/complaints/admin/:id` - Delete complaint (admin only)

## Test with Postman

### 1. Register User
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "1234"
}
```

### 2. Register Admin
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "1234",
  "role": "admin"
}
```

### 3. Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "1234"
}
```

### 4. Create Complaint (use token from login)
```
POST http://localhost:3000/api/complaints
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "WiFi not working",
  "description": "WiFi connection keeps dropping in room 301",
  "category": "Network",
  "priority": "High"
}
```

### 5. Get My Complaints
```
GET http://localhost:3000/api/complaints/my
Authorization: Bearer YOUR_TOKEN_HERE
```

### 6. Get All Complaints (Admin)
```
GET http://localhost:3000/api/complaints/admin/all
Authorization: Bearer ADMIN_TOKEN_HERE
```

### 7. Update Complaint Status (Admin)
```
PUT http://localhost:3000/api/complaints/admin/1
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "High"
}
```

## Project Structure

```
├── config/
│   └── database.js          # MySQL connection
├── controllers/
│   ├── authController.js    # Auth logic
│   └── complaintController.js # Complaint logic
├── middleware/
│   ├── auth.js              # JWT verification
│   └── adminAuth.js         # Admin check
├── models/
│   ├── User.js              # User model
│   └── Complaint.js         # Complaint model
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── complaintRoutes.js   # Complaint endpoints
├── utils/
│   └── jwt.js               # JWT helpers
├── database/
│   └── schema.sql           # Database schema
├── .env.example             # Environment template
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## Next Steps

1. Test all endpoints with Postman
2. Implement frontend (React)
3. Add XML validation files
4. Integrate Chart.js for visualization
