# E-Ticketing System Setup Guide

## Visit Now!
[E-Ticketing-System](https://e-ticketing-system-frontend.onrender.com/)

## Frontend Setup (React with Vite)

### Install Vite (React + JS)
```sh
npm create vite@latest frontend
cd frontend
npm install
```

### Install Required Packages
```sh
npm install axios tailwindcss react-router-dom react-toastify lucide-react
```

### Package Uses:
- **Vite**: Fast build tool for frontend development.
- **Axios**: Handles HTTP requests between frontend and backend.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Manages frontend routing.
- **React Toastify**: Displays toast notifications.
- **Lucide React**: Provides icons for UI components.

### Start Frontend
```sh
npm run dev
```

## Backend Setup (Express with Node.js)

### Install Node.js and Initialize Project
```sh
mkdir backend && cd backend
npm init -y
```

### Install Required Packages
```sh
npm install express mongoose dotenv bcrypt jsonwebtoken cors
```

### Package Uses:
- **Express**: Framework for building backend APIs.
- **Mongoose**: ODM for MongoDB interaction.
- **Dotenv**: Loads environment variables from a `.env` file.
- **Bcrypt.js**: Hashes passwords for security.
- **JSON Web Token (JWT)**: Implements authentication.
- **CORS**: Enables cross-origin requests.

### Start Backend
```sh
node index.js
```

## Database Setup (MongoDB Atlas)
1. Create a MongoDB Atlas account and a new cluster.
2. Get the **connection string** from MongoDB Atlas.
3. Add it to a `.env` file in the backend:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Deployment (Optional)
- **Frontend**: Deployed on Render - [Visit here](https://e-ticketing-system-frontend.onrender.com/)
- **Backend**: Deployed on Render

