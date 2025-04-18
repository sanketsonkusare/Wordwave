# 📖 Wordwave - Full Stack Blogging Platform

Welcome to **Wordwave** — a modern full-stack blog platform built with the **MERN stack** (MongoDB, Express, React, Node) and styled with **Tailwind CSS**. Wordwave allows users to read, write, like, and comment on blog posts in a seamless experience.

Live Demo 👉 [https://wordwave-t4e3.onrender.com](https://wordwave-t4e3.onrender.com)

---

## 🚀 Features

- 📝 Create and publish blog posts (only logged-in users)
- 💬 Comment system with real-time updates
- ❤️ Like posts (toggle like/unlike)
- 🔐 JWT-based user authentication (Signup/Login)
- 🌐 Responsive UI built with React + Tailwind CSS
- 📦 Fully integrated frontend and backend (served from one Render service)

---

## 📁 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (hosted on Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Render

---

## 🛠️ Local Development Setup

### 1. Clone the Repo
```bash
git clone https://github.com/sanketsonkusare/wordwave.git
cd wordwave
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the root directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside `frontend/` and add:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Build the Frontend
```bash
cd frontend
npm run build
cd ..
```

### 5. Run the Server
```bash
npm start
```

Open your browser at [http://localhost:5000](http://localhost:5000)

---

## 📦 Deployment (Render)

- This app is designed to be deployed as a **single full-stack service** on [Render.com](https://render.com)
- Frontend is served from the Express server after running `npm run build` inside `/frontend`
- Environment variables like `MONGO_URI`, `JWT_SECRET`, and `VITE_API_URL` should be configured in Render’s **Environment** tab

**Build Command:**
```bash
npm install && cd frontend && npm install && npm run build
```

**Start Command:**
```bash
node server.js
```

---

## 🤝 Author

**Sanket Sonkusare**  
💻 Student | 💪 Fitness Enthusiast | 🧠 AI & MERN Developer

Let’s connect! [LinkedIn](https://linkedin.com/in/sanketsonkusare)  
Follow updates on [Instagram](https://instagram.com/sassysanket)

---

## 📌 License
This project is licensed under the MIT License.