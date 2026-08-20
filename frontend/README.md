# MedCare Plus — Frontend

React + React Router frontend for the Hospital Appointment System
(ITUE301 Set A, Tasks 1, 2 & 4).

## What's here

- `src/pages/HomePage.jsx` — landing page, shows sample appointments via `AppointmentCard`
- `src/pages/DoctorsPage.jsx` — fetches `GET /api/v1/doctors` with `useEffect`, handles `data` / `loading` / `error` state
- `src/pages/BookingPage.jsx` — booking form using `useState`, live preview built from form state
- `src/components/AppointmentCard.jsx` — reusable card, purely prop-driven (`patientName`, `doctorName`, `date`, `timeSlot`, `status`)
- `src/components/Navigation.jsx` — `NavLink`-based nav, no full page reloads

## Run it

```bash
npm install
npm run dev
```

Opens on **http://localhost:5173**.

The dev server proxies any `/api/*` request to `http://localhost:5000`
(see `vite.config.js`), so start the Express backend from Task 3 on port
5000 before visiting the Doctors page — otherwise you'll see the page's
built-in error state instead of the doctor list.

## Build for production

```bash
npm run build
npm run preview
```
