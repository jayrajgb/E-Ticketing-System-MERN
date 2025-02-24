# E-Ticketing System (MERN Stack)

A full-stack e-ticketing system built using the MERN stack.

## 🚀 Live Demo
- [Frontend (User)](https://e-ticketing-system-frontend.onrender.com)
- [Frontend (Admin)](https://e-ticketing-system-admin.onrender.com)
- [Backend](https://e-ticketing-system-backend.onrender.com)

## Note: Credentials for Admin Login
- **ADMIN_EMAIL**: loki@gmail.com
- **ADMIN_PASSWORD**: 30363036

## ⚙️ Tech Stack

### Frontend (React + Vite)
- **Vite** - Fast build tool for modern web apps.
- **Axios** - API communication.
- **Tailwind CSS** - Utility-first CSS framework.
- **React Router DOM** - Navigation.
- **React Toastify** - Notifications.
- **Lucide React** - Icons.

### Backend (Node.js + Express)
- **Express** - Backend framework for APIs.
- **Mongoose** - MongoDB object modeling.
- **Dotenv** - Manage environment variables.
- **Bcrypt** - Password hashing.
- **JWT** - Authentication.
- **CORS** - Cross-origin resource sharing.

## 📂 Project Setup

### Clone the Repository
```sh
  git clone https://github.com/jayrajgb/E-Ticketing-System-MERN.git
  cd E-Ticketing-System-MERN
```

### Backend Setup
```sh
  cd backend
  npm install
  npm start
```

### Frontend Setup (Admin)
```sh
  cd admin
  npm install
  npm run dev
```

### Frontend Setup (User)
```sh
  cd frontend
  npm install
  npm run dev
```

## 🚀 Deployment
- **Frontend**: Deployed on Render.
- **Backend**: Deployed on Render.

## 🎯 Features (Admin)
- Add Trains
- Set Prices and Train Information
- View Trains
- View Bookings

## 🎯 Features (User)
- Login/SignUp
- Browse Trains
- Edit Profile Information
- Booking and Cancellation
- Ticket booking for multiple passengers
- Bookings History

## 📜 Schemas

### **User Schema**
- Stores user details.
- `name (String)`, `email (String, unique)`, `password (String)`, `phone (String, default: '0000000000')`, `age (Number, default: 18)`, `gender (String, default: 'Not Selected')`.

### **Train Schema**
- Stores train details.
- `name (String)`, `code (String, unique)`, `from (String)`, `to (String)`, `seats (Number)`, `price (Number)`, `about (String)`.
- `timings (Object)`: `startTime (Number)`, `intervals (Number)`.

### **Ticket Schema**
- Stores booking details.
- `userId (String)`, `trainId (String)`, `trainInfo (Object: name, from, to, basePrice)`, `slotDate (Date)`, `slotTime (String)`, `totalAmount (Number)`, `status (String, default: 'Pending')`, `createdAt (Date, default: now)`.
- Nested `passengerSchema` for individual passenger details: `name (String)`, `age (Number)`, `gender (String)`, `disability (Boolean, default: false)`, `price (Number)`.

## 🔗 API Routes

### **User Routes**
- `POST /api/user/register` - Register user.
- `POST /api/user/login` - Login user.
- `GET /api/user/profile` - Get user details.
- `POST /api/user/update` - Update user details.
- `POST /api/user/book` - Book ticket.
- `GET /api/user/bookings` - Get booking history.
- `POST /api/user/bookings/cancel/:ticketId` - Cancel ticket.
- `DELETE /api/user/bookings/remove/:ticketId` - Remove booking.

### **Admin Routes**
- `POST /api/admin/addtrain` - Add train.
- `POST /api/admin/login` - Admin login.
- `GET /api/admin/trains` - Get all trains.
- `GET /api/admin/bookings` - Get all bookings.


