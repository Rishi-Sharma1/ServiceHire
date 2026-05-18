
# API Documentation

## Base URL

```txt
http://localhost:5000/api
````

---

# Authentication

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Description

Registers a new sales user account.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "66512d5b8e9d6a0012345678",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales_user",
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

# Login User

### Endpoint

```http
POST /api/auth/login
```

### Description

Authenticates a user and returns JWT token.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "66512d5b8e9d6a0012345678",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales_user",
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

# Authentication Header

All protected routes require JWT token.

### Header Format

```http
Authorization: Bearer <token>
```

---

# Leads APIs

# Get Leads

### Endpoint

```http
GET /api/leads
```

### Description

Returns paginated and filtered leads list.

### Query Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| page      | number | Page number          |
| limit     | number | Records per page     |
| status    | string | Filter by status     |
| source    | string | Filter by source     |
| search    | string | Search by name/email |
| sort      | string | latest or oldest     |

### Example

```http
GET /api/leads?page=1&limit=10&status=Qualified&source=Instagram&search=rahul&sort=latest
```

### Success Response

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [
    {
      "_id": "66512d5b8e9d6a0012345678",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

# Get Single Lead

### Endpoint

```http
GET /api/leads/:id
```

### Description

Returns details of a single lead.

### Success Response

```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "_id": "66512d5b8e9d6a0012345678",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "Qualified",
    "source": "Instagram",
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T10:00:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

# Create Lead

### Endpoint

```http
POST /api/leads
```

### Description

Creates a new lead.

### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Website"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "66512d5b8e9d6a0012345678",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "New",
    "source": "Website",
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T10:00:00.000Z"
  }
}
```

---

# Update Lead

### Endpoint

```http
PUT /api/leads/:id
```

### Description

Updates an existing lead.

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "status": "Qualified",
  "source": "Referral"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "66512d5b8e9d6a0012345678",
    "name": "Updated Name",
    "email": "updated@example.com",
    "status": "Qualified",
    "source": "Referral",
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T11:00:00.000Z"
  }
}
```

---

# Delete Lead

### Endpoint

```http
DELETE /api/leads/:id
```

### Description

Deletes a lead permanently.

### Access

Admin only.

### Success Response

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

### Forbidden Response

```json
{
  "success": false,
  "message": "Forbidden"
}
```

---

# Export Leads CSV

### Endpoint

```http
GET /api/leads/export
```

### Description

Exports filtered leads as CSV file.

### Access

Admin only.

### Query Parameters

Supports same query params as:

```http
GET /api/leads
```

### Success Response

Downloads:

```txt
leads.csv
```

---

# Lead Status Values

```txt
New
Contacted
Qualified
Lost
```

---

# Lead Source Values

```txt
Website
Instagram
Referral
```

---

# Role Types

```txt
admin
sales_user
```

---

# HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource Not Found    |
| 422         | Validation Error      |
| 500         | Internal Server Error |

---

# Validation Rules

## User Registration

| Field    | Rules                           |
| -------- | ------------------------------- |
| name     | Required, min 2 chars           |
| email    | Valid email                     |
| password | Min 8 chars, uppercase + number |

---

## Lead Validation

| Field  | Rules       |
| ------ | ----------- |
| name   | Required    |
| email  | Valid email |
| status | Enum value  |
| source | Enum value  |

---

# Demo Credentials

## Admin User

```txt
Email: rishi@gmail.com
Password: Password123
```

---


# Tech Stack

## Frontend

* React.js
* TypeScript
* TailwindCSS
* Vite

## Backend

* Node.js
* Express.js
* TypeScript

## Database

* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

---

# Features Implemented

* JWT Authentication
* Role-Based Access Control
* Lead CRUD Operations
* Advanced Filtering
* Debounced Search
* Pagination
* CSV Export
* Dark Mode
* Protected Routes
* Reusable Components
* Centralized Error Handling
* Request Validation
* Docker Setup

```
```
