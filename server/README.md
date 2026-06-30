# StudySync Backend

This is the backend server for the StudySync application. It provides a RESTful API for authentication, course management, task management, and user profile operations.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Project Structure

```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── server.js
└── index.js
```

## API Modules

- Authentication
- Users
- Courses
- Tasks

## Author

Developed as part of a Full-Stack Web Development final project.
