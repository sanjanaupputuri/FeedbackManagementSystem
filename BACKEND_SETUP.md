# Backend Setup

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Run the full schema
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

## Lab Credentials

Use `1234` as the password for test accounts you register through the API.

Suggested accounts:
- `admin@feedback.com`
- `john@example.com`
- `jane@example.com`

After registering `admin@feedback.com`, promote it once in MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@feedback.com';
```

To insert sample complaints for the registered users:

```bash
mysql -u root -p < database/seed.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints (User)
- `POST /api/complaints` - Create complaint (requires auth)
- `GET /api/complaints/my` - Get my complaints (requires auth)
- `GET /api/complaints/:id` - Get complaint by ID (requires auth)

### Admin
- `GET /api/admin/complaints` - Get all complaints (admin only)
- `GET /api/admin/stats` - Get statistics (admin only)
- `PUT /api/admin/complaints/:id` - Update complaint (admin only)
- `DELETE /api/admin/complaints/:id` - Delete complaint (admin only)

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
  "password": "1234"
}
```

Then promote that user in MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
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
GET http://localhost:3000/api/admin/complaints
Authorization: Bearer ADMIN_TOKEN_HERE
```

### 7. Update Complaint Status (Admin)
```
PUT http://localhost:3000/api/admin/complaints/1
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "High"
}
```

## Next Steps

1. Test all endpoints with Postman
2. Add more admin filters if needed
3. Add API tests
4. Add database migration/versioning if the lab scope expands
