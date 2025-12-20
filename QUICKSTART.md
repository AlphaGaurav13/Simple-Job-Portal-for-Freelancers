# ⚡ Quick Start Guide - getWork

## 🚀 Get Running in 3 Steps

### 1️⃣ Setup MongoDB (REQUIRED)

**Option A: MongoDB Atlas (Free Cloud - Recommended)**
1. Go to https://mongodb.com/cloud/atlas
2. Sign up & create free cluster
3. Get connection string from "Connect" → "Connect your application"
4. Update `backend/.env`:
   ```bash
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/getwork
   ```

**Option B: Local MongoDB**
- If installed locally, keep default in `backend/.env`:
  ```bash
  MONGO_URI=mongodb://localhost:27017/getwork
  ```

### 2️⃣ Install Dependencies

```bash
# Install frontend
cd frontend
npm install

# Install backend  
cd ../backend
npm install
```

### 3️⃣ Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Should see: ✅ MongoDB Connected
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
# Open: http://localhost:5173
```

---

## 📝 Configuration Checklist

- [ ] Updated MongoDB connection in `backend/.env`
- [ ] Ran `npm install` in frontend folder
- [ ] Ran `npm install` in backend folder
- [ ] Started backend server (port 4000)
- [ ] Started frontend server (port 5173)

---

## 🔧 Files You MUST Change

| File | What to Change | Why |
|------|---------------|-----|
| `backend/.env` | `MONGO_URI` | Connect to your database |
| `backend/.env` | `SESSION_SECRET` | Security (production only) |
| `frontend/.env` | `VITE_API_URL` | For production deployment |

---

## 💡 Customization Points (Optional)

All marked with `⚙️ CONFIGURATION:` in the code:

- **Colors**: `frontend/tailwind.config.js` → colors section
- **Stats**: `frontend/src/components/sections/StatsSection.jsx` → stats array
- **Testimonials**: `frontend/src/components/sections/TestimonialsSection.jsx` → testimonial object
- **Trusted Companies**: `frontend/src/components/sections/TrustedBy.jsx` → companies array
- **Popular Services**: `frontend/src/components/sections/FeaturedProjects.jsx` → services array

---

## ❓ Troubleshooting

**Backend won't start?**
→ Check MongoDB connection string in `backend/.env`

**Frontend shows errors?**
→ Make sure backend is running first

**"Cannot find module"?**
→ Run `npm install` in that folder

**Port already in use?**
→ Change port in `backend/.env` or `vite.config.js`

**Real-time features not working?**
→ Check that Socket.IO is connecting (browser console)

---

## 📂 Project Structure Overview

```
getwork/
├── frontend/           → React + Vite + Tailwind
│   ├── src/
│   │   ├── api/       → API calls
│   │   ├── components/→ UI components  
│   │   ├── context/   → Auth & Socket contexts
│   │   └── pages/     → Page components (13 pages)
│   └── .env          → ⚠️ Update API URL
│
└── backend/           → Node + Express + MongoDB + Socket.IO
    ├── controllers/   → Business logic
    ├── models/        → Database schemas (7 models)
    ├── routes/        → API endpoints (8 route files)
    ├── socket/        → Real-time events
    └── .env          → ⚠️ Update MongoDB URL
```

---

## 🎯 Key Features

- **Authentication** - Session-based login/register
- **Real-time Messaging** - Socket.IO powered chat
- **Projects/Gigs** - Browse, create, and manage
- **Proposals** - Send and accept work requests
- **Orders** - Track order status and completion
- **Dashboard** - Real-time stats and updates
- **Profile** - User profile management
- **Saved Items** - Save gigs for later

---

**Need detailed instructions?** See [README.md](./README.md)
