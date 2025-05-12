# 📚 Book Store API

A robust and scalable RESTful API for managing a digital bookstore. Built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, this API supports full CRUD functionality for users, authors, genres, books, and orders — along with secure authentication and role-based access.

This backend is designed with real-world production features such as rate limiting, input sanitization, and API documentation via Swagger.

---

## 🌐 Live Demo

Check out the live API: [https://book-store-api-b1d1.onrender.com/api-docs/](https://notes-api-a6e8.onrender.com/api-docs/)

[![Live Demo](https://img.shields.io/badge/-LIVE_DEMO-2ea44f?style=for-the-badge)](https://book-store-api-b1d1.onrender.com/api-docs/)

## 🚀 Features

- ✅ **User Authentication & Authorization**

  - Register/Login with JWT
  - Role-based access (User/Admin)
  - Protected routes for logged-in users

- 📘 **Book Management**

  - Admins can create, update, delete books
  - Users can browse and search books

- 🖊️ **Author & Genre Management**

  - Admin-level CRUD operations for authors & genres

- 🛒 **Order Functionality**

  - Authenticated users can place and view orders

- 📄 **Swagger API Documentation**

  - Auto-generated docs with Swagger UI

- 🧰 **Security Middleware**
  - `helmet`, `rate-limit`, `mongo-sanitize`, and `cors`

---

## 🛠️ Tech Stack

- **Backend:** Express.js with TypeScript
- **Database:** MongoDB using Mongoose ODM
- **Auth:** JSON Web Tokens (JWT)
- **Docs:** Swagger via `swagger-ui-express`

---

## 📁 Folder Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── types/
├── app.ts
└── index.ts
```

---

## 🧪 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Setup

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/book-store-api.git
cd book-store-api
```

### 2. Set Environment Variables

Create a .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 3. Run Server

```bash
# Dev mode
npm run dev

# Production
npm run build && npm start

```

## 🛠️ API Endpoints (Brief)

View Swagger docs at:
http://localhost:5000/api-docs

| Method | Endpoint                 | Access        | Description                |
| ------ | ------------------------ | ------------- | -------------------------- |
| POST   | `/api/register`          | Public        | Register new user          |
| POST   | `/api/login`             | Public        | Login and receive JWT      |
| GET    | `/api/users/me`          | Authenticated | Get logged-in user profile |
| GET    | `/api/users/me/books`    | Authenticated | Get books created by user  |
| PATCH  | `/api/users/promote/:id` | Admin only    | Promote user to admin      |
| POST   | `/api/authors`           | Admin only    | Create new author          |
| GET    | `/api/authors`           | Public        | List all authors           |
| GET    | `/api/authors/:id`       | Public        | Get single author by ID    |
| PUT    | `/api/authors/:id`       | Admin only    | Update author              |
| DELETE | `/api/authors/:id`       | Admin only    | Delete author              |
| POST   | `/api/genres`            | Admin only    | Create new genre           |
| GET    | `/api/genres`            | Public        | List all genres            |
| GET    | `/api/genres/:id`        | Public        | Get single genre by ID     |
| PUT    | `/api/genres/:id`        | Admin only    | Update genre               |
| DELETE | `/api/genres/:id`        | Admin only    | Delete genre               |
| POST   | `/api/books`             | Admin only    | Create new book            |
| GET    | `/api/books`             | Public        | List all books             |
| GET    | `/api/books/:id`         | Public        | Get single book by ID      |
| PUT    | `/api/books/:id`         | Admin only    | Update book                |
| DELETE | `/api/books/:id`         | Admin only    | Delete book                |
| POST   | `/api/orders`            | Authenticated | Place a new order          |
| GET    | `/api/orders/my`         | Authenticated | Get current user’s orders  |

## 🛡️ Security Middleware

| Package            | Purpose                          |
| ------------------ | -------------------------------- |
| helmet             | Sets HTTP headers to secure app  |
| cors               | Handles cross-origin requests    |
| express-rate-limit | Limits repeated requests from IP |

## 📚 Swagger Docs

I've integrated Swagger for live API testing & docs.
[Click here](https://notes-api-a6e8.onrender.com/api-docs/) for testing.

## 🧠 Author

Built by [Anshuman](https://github.com/anshumanSathua) with ❤️
