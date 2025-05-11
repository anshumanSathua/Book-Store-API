# 📚 Book Store API

A robust and scalable RESTful API for managing a digital bookstore. Built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, this API supports full CRUD functionality for users, authors, genres, books, and orders — along with secure authentication and role-based access.

This backend is designed with real-world production features such as rate limiting, input sanitization, and API documentation via Swagger.

---

## 🌐 Live Demo

Check out the live API: [https://notes-api-a6e8.onrender.com/api-docs/](https://notes-api-a6e8.onrender.com/api-docs/)

[![Live Demo](https://img.shields.io/badge/-LIVE_DEMO-2ea44f?style=for-the-badge)](https://notes-api-a6e8.onrender.com/api-docs/)

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

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/notes-api.git
cd notes-api
npm install
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

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/api/auth/register`         | Register new user       |
| POST   | `/api/auth/login`            | Login user              |
| GET    | `/api/notes`                 | Get paginated notes     |
| POST   | `/api/notes`                 | Create new note         |
| PUT    | `/api/notes/:noteId`         | Update a note           |
| DELETE | `/api/notes/:noteId`         | Delete a note           |
| GET    | `/api/notes/search?query=`   | Search notes            |
| GET    | `/api/notes/tag/:tagName`    | Filter notes by tag     |
| PATCH  | `/api/notes/archive/:noteId` | Archive a note          |
| GET    | `/api/notes/archived`        | Get archived notes      |
| GET    | `/api/notes/:noteId/export`  | Export note as PDF      |
| GET    | `/api/notes/export/zip`      | Export all notes as ZIP |
| GET    | `/api/notes/analytics`       | Notes usage analytics   |

## 📚 Swagger Docs

I've integrated Swagger for live API testing & docs.
[Click here](https://notes-api-a6e8.onrender.com/api-docs/) for testing.

## 🧠 Author

Built by [Anshuman](https://github.com/anshumanSathua) with ❤️
