# getWork - Freelancer Marketplace Platform

> **Built with:** Vite + React | Tailwind CSS | Node.js + Express | MongoDB | Socket.IO

A modern, full-stack freelancing marketplace that connects talented freelancers with clients. Built with a focus on simplicity, clean code, real-time features, and easy customization.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Configuration Guide](#-configuration-guide)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Important Notes](#-important-notes)

---

## ✨ Features

### Core Features
- **User Authentication** - Session-based login/register with role support (client/freelancer)
- **Project/Gig Management** - Create, browse, and manage projects
- **Proposal System** - Send and accept work requests
- **Order Tracking** - Complete order lifecycle with status updates
- **Real-time Messaging** - Socket.IO powered one-to-one chat
- **User Dashboard** - Real-time stats, orders, and recommendations

### Landing Page
- **Hero Section** - Animated search banner
- **Category Browser** - Browse services by category
- **Popular Services** - Featured service cards
- **Stats Section** - Platform metrics
- **Success Stories** - Client testimonials
- **Trusted By** - Company logos

### User Features
- **Profile Management** - Edit profile, skills, and bio
- **Saved Items** - Save gigs for later
- **Order History** - View all past and active orders
- **Real-time Notifications** - Live updates for messages and orders

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **express-session** - Session-based authentication
- **express-validator** - Request validation

---

## 📁 Project Structure

```
getwork/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API service layer
│   │   │   └── api.js       # Centralized API calls
│   │   ├── components/      # Reusable components
│   │   │   ├── auth/        # Auth components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Landing page sections
│   │   │   └── ui/          # Reusable UI components
│   │   ├── context/         # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── pages/           # Page components (13 pages)
│   │   ├── App.jsx          # Main app with routes
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── .env                 # Frontend config ⚙️
│   ├── tailwind.config.js   # Tailwind config ⚙️
│   └── package.json
│
└── backend/                 # Node.js + Express backend
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── controllers/        # Business logic
    │   ├── authController.js
    │   ├── categoryController.js
    │   └── projectController.js
    ├── middleware/         # Express middleware
    │   ├── auth.js         # Authentication
    │   └── validate.js     # Validation
    ├── models/             # Mongoose schemas (7 models)
    │   ├── User.js
    │   ├── Project.js
    │   ├── Category.js
    │   ├── Order.js
    │   ├── Proposal.js
    │   ├── Message.js
    │   └── Subscriber.js
    ├── routes/             # API routes (8 route files)
    │   ├── auth.js
    │   ├── categories.js
    │   ├── projects.js
    │   ├── orders.js
    │   ├── proposals.js
    │   ├── messages.js
    │   ├── newsletter.js
    │   └── users.js
    ├── socket/
    │   └── dashboardEvents.js  # Real-time events
    ├── server.js           # Express entry point
    ├── .env                # Backend config ⚠️ UPDATE
    └── package.json

⚙️ = Configuration file (you may want to customize)
⚠️ = MUST be updated before running
```

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** - Comes with Node.js
- **MongoDB** - Local or MongoDB Atlas (free cloud)

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## ⚙️ Configuration Guide

### 🔴 IMPORTANT: MongoDB Setup (REQUIRED)

#### Option A: MongoDB Atlas (Recommended - Free Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (select the free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `backend/.env`:

```bash
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/getwork
```

#### Option B: Local MongoDB

```bash
MONGO_URI=mongodb://localhost:27017/getwork
```

### Backend Configuration

**File:** `backend/.env`

```bash
# Server port
PORT=4000

# MongoDB connection string (UPDATE THIS!)
MONGO_URI=your-mongodb-connection-string-here

# Session secret for authentication (change in production)
SESSION_SECRET=your-secret-key-change-this-in-production

# Environment
NODE_ENV=development
```

### Frontend Configuration

**File:** `frontend/.env`

```bash
# Backend API URL (update for production)
VITE_API_URL=http://localhost:4000
```

---

## 🏃 Running the Application

### Step 1: Start the Backend Server

```bash
cd backend
npm run dev

# You should see:
# ✅ MongoDB Connected
# 🚀 Server is running!
# 📍 URL: http://localhost:4000
# 🔌 Socket.IO: Enabled
```

**Keep this terminal open!**

### Step 2: Start the Frontend Server

Open a **NEW terminal**:

```bash
cd frontend
npm run dev

# You should see:
# VITE ready
# ➜ Local: http://localhost:5173/
```

### Step 3: Open in Browser

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user orders |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id/status` | Update order status |

### Proposals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/proposals/received` | Get received proposals |
| POST | `/api/proposals` | Send proposal |
| POST | `/api/proposals/:id/accept` | Accept proposal |
| POST | `/api/proposals/:id/reject` | Reject proposal |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/conversations` | Get all conversations |
| GET | `/api/messages/history/:userId` | Get chat history |

---

## 📝 Important Notes

### What You Need to Manually Change

1. **MongoDB Connection** (`backend/.env`)
   - `MONGO_URI` - Your MongoDB connection string

2. **Session Secret** (`backend/.env`)
   - `SESSION_SECRET` - Change for production security

3. **API URL** (`frontend/.env`)
   - `VITE_API_URL` - Update for production deployment

### Customization Points

- **Brand Colors**: `frontend/tailwind.config.js`
- **Landing Page Content**: `frontend/src/components/sections/`
- **UI Components**: `frontend/src/components/ui/`

### Common Issues & Solutions

**Backend fails to start?**
→ Check MongoDB connection string in `backend/.env`

**Frontend can't connect to backend?**
→ Verify backend is running on port 4000

**Real-time features not working?**
→ Check browser console for Socket.IO connection errors

**"Cannot find module"?**
→ Run `npm install` in that folder

---

## 🎯 Next Steps

After getting the app running:

1. **Register an account** - Create both client and freelancer accounts
2. **Create a project** - Post a project as a client
3. **Send a proposal** - Apply to a project as a freelancer
4. **Accept and complete** - Go through the full order lifecycle
5. **Customize** - Update colors and content for your brand

---

## 📞 Support

If you encounter issues:
1. Check that MongoDB connection is configured correctly
2. Verify all dependencies are installed (`npm install`)
3. Make sure both servers are running
4. Check browser console for error messages

---

**Built with ❤️ by Abhishak Chaturvedi | Happy coding! 🚀**
