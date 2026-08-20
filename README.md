# MedCare Plus — Hospital Appointment Management System

MedCare Plus is a modern, responsive single-chart internal front-desk web application designed to manage and schedule hospital appointments for patients and doctors.

---

## 1. Project Overview
* **Frontend**: React, React Router, Vite, Vanilla CSS.
* **Backend**: Node.js, Express, Mongoose.
* **Database**: MongoDB (local database server).

---

## 2. Environment Variables Setup
Create a `.env` file in the **root directory** of the project and define the following variables:

```env
PORT=5005
MONGO_URI=mongodb://127.0.0.1:27017/med_care
```

* **`PORT`**: The port number on which the backend Express server will run (default is `5005`).
* **`MONGO_URI`**: The connection string pointing to your MongoDB instance.

---

## 3. MongoDB Database Setup
1. Download and install **MongoDB Community Server** and **MongoDB Compass** (optional, for viewing data) if you haven't already.
2. Start the local MongoDB service. It will default to:
   ```
   mongodb://127.0.0.1:27017/
   ```
3. The backend server automatically seeds the database with initial doctor records on startup if the `med_care` database is empty.

---

## 4. Backend Setup & Run
1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
   * *The server will start running at `http://localhost:5005` and connect to the MongoDB instance.*

---

## 5. Frontend Setup & Run
1. Open a new terminal session and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   * *The app will start and be available at **`http://localhost:5173`**.*
   * *Requests starting with `/api` are automatically proxied to the backend running at `http://localhost:5005`.*