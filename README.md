# 🏥 MedCare Plus

### Smart Hospital Appointment Management System

**MedCare Plus** is a modern hospital appointment management platform designed to make healthcare scheduling **faster, simpler, and more organized**.

Instead of handling appointments through phone calls, paper records, or manual processes, MedCare Plus provides a centralized digital system where patients, doctors, and administrators can manage appointments efficiently.

---

## ✨ What Makes MedCare Plus Different?

🧑‍⚕️ **Doctor Management**
Manage doctor profiles, departments, availability, and schedules.

📅 **Smart Appointment Booking**
Patients can view available slots and book appointments without unnecessary waiting.

👤 **Patient Management**
Maintain patient information and appointment history in one place.

🔐 **Secure Authentication**
Separate access for users and administrators with protected routes.

📊 **Admin Dashboard**
Get an overview of doctors, patients, appointments, and hospital activities.

⚡ **Fast & Responsive UI**
Built with modern web technologies for a smooth experience across devices.

🗄️ **Database-Driven System**
Patient, doctor, and appointment information is stored securely in MongoDB.

---

# 🚀 Technology Stack

| Layer                  | Technology           |
| ---------------------- | -------------------- |
| 🎨 Frontend            | React.js             |
| ⚡ Build Tool           | Vite                 |
| 🖥️ Backend            | Node.js + Express.js |
| 🗄️ Database           | MongoDB              |
| 🔗 API                 | REST API             |
| 📦 Package Manager     | npm                  |
| ☁️ Frontend Deployment | Cloudflare Pages     |

---

# 📂 Project Architecture

```text
MedCare-Plus/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🛠️ Getting Started

## 1️⃣ Clone the Project

```bash
git clone YOUR_REPOSITORY_URL
cd MedCare-Plus
```

---

# 🎨 Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Your frontend will be available at:

```text
http://localhost:5173
```

Open the URL in your browser and you're ready to explore MedCare Plus. 🚀

---

# ⚙️ Backend Setup

Open another terminal and move to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

Backend API:

```text
http://localhost:5005
```

---

# 🗄️ MongoDB Setup

MedCare Plus uses MongoDB to store application data.

### Option 1 — Local MongoDB

Install **MongoDB Community Server** and make sure the MongoDB service is running.

Example connection:

```env
MONGO_URI=mongodb://localhost:27017/medcare_plus
```

### Option 2 — MongoDB Atlas

You can also use a cloud MongoDB database instead of running MongoDB locally.

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medcare_plus
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5005
MONGO_URI=mongodb://localhost:27017/medcare_plus
```

### Environment Variables Explained

| Variable    | Purpose                | Example                                  |
| ----------- | ---------------------- | ---------------------------------------- |
| `PORT`      | Backend server port    | `5005`                                   |
| `MONGO_URI` | MongoDB connection URL | `mongodb://localhost:27017/medcare_plus` |

⚠️ **Never upload your `.env` file or database credentials to GitHub.**

Add this to `.gitignore`:

```text
.env
node_modules/
```

---

# 🔄 How MedCare Plus Works

```text
             👤 Patient
                 │
                 ▼
        ┌─────────────────┐
        │ React Frontend  │
        │  localhost:5173 │
        └────────┬────────┘
                 │
                 │ REST API
                 ▼
        ┌─────────────────┐
        │ Express Backend │
        │  localhost:5005 │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │     MongoDB     │
        │ Patient / Doctor│
        │   Appointments  │
        └─────────────────┘
```

---

# 🔗 REST API Example

MedCare Plus provides REST APIs for managing hospital data.

Example:

```http
GET /api/v1/appointments
```

Local endpoint:

```text
http://localhost:5005/api/v1/appointments
```

A successful request should return:

```json
{
  "success": true,
  "appointments": []
}
```

You can test APIs using **Postman** or **Thunder Client**.

---

# ☁️ Deployment

The frontend can be deployed using **Cloudflare Pages**.

### Production Build

```bash
cd frontend
npm run build
```

Vite generates:

```text
dist/
```

Use the following Cloudflare Pages configuration:

```text
Framework: React / Vite
Build Command: npm run build
Output Directory: dist
```

⚠️ Before deployment, replace the local backend URL:

```text
http://localhost:5005
```

with your deployed backend URL:

```text
https://your-backend-domain.com
```

---

# 🎯 Future Improvements

MedCare Plus can be expanded with:

* 🤖 AI-powered appointment assistance
* 🔔 Email/SMS appointment notifications
* 💳 Online payment integration
* 📱 Mobile application
* 📈 Advanced hospital analytics
* 🩺 Doctor prescription management
* 📄 Digital medical reports
* 🔐 Role-based access control
* ☁️ Complete cloud deployment

---

# 👨‍💻 Project Vision

> **"Making healthcare appointments simple, connected, and accessible."**

MedCare Plus is more than an appointment booking website — it is a foundation for building a **complete digital healthcare management platform**.

---

## ⭐ Project Status

**Development Status:** 🚧 In Development

Built with ❤️ using the MERN ecosystem.
