import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="chart-header">
        <div className="brand">
          <span className="brand-mark">MedCare Plus</span>
          <span className="brand-sub">Appointment System</span>
        </div>
        <Navigation />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>MedCare Plus · Internal front-desk tool</span>
        <span>ITUE301 — Set A</span>
      </footer>
    </div>
  )
}

export default App
