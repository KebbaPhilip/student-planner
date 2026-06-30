# Student Planner

A full-stack web application that helps students organize courses, assignments, and study tasks while tracking their academic progress.

---

## Description

Student planner is a student productivity application designed to simplify academic planning and task management. The application enables users to create an account, securely log in, manage courses, create and organize study tasks, monitor deadlines, and track completion status through an intuitive dashboard.

The project follows a modern full-stack architecture with a Node.js and Express.js backend, MongoDB database, and a responsive frontend built using HTML5, CSS3, and Vanilla JavaScript. It implements secure authentication using JWT and bcrypt, RESTful API principles, and a modular MVC project structure.

This application was developed as a final project for a Full-Stack Web Development course.

---

## Features

- User Registration & Login
- Secure JWT Authentication
- Password Hashing with bcrypt
- Course Management (CRUD)
- Task Management (CRUD)
- Dashboard Overview
- Search & Filter Tasks
- Responsive Design
- RESTful API
- MongoDB Database Integration

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS

---

## Project Structure

```text
study-planner/
│
├── pulic/
│   ├── css/
│   ├── js/
│   ├
│   ├── pages/
│   ├── index.html
│   └── README.md
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── index.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/study-sync.git
```

Navigate to the project:

```bash
cd study-planner
```

Follow the setup instructions in the `public` and `server` README files.

---

## Team Members

- KEBBA NJIE
- James m Gomez

---

## License

This project is for educational purposes.
