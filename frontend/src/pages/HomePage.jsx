import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppointmentCard from '../components/AppointmentCard.jsx'

function HomePage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/v1/appointments')
        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: status ${response.status}`)
        }
        const json = await response.json()
        setAppointments(Array.isArray(json) ? json : json.data ?? [])
      } catch (err) {
        setError(err.message || 'Could not load appointments right now.')
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  return (
    <div>
      <section className="hero">
        <div>
          <p className="page-eyebrow">MedCare Plus · Front Desk</p>
          <h1 className="page-title">
            One chart for every doctor, patient, and appointment.
          </h1>
          <p className="page-lede">
            Book a slot, check who's on the floor today, and keep every
            appointment's status visible at a glance — confirmed, pending,
            or cancelled.
          </p>
          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">
              Book an appointment →
            </Link>
            <Link to="/doctors" className="btn btn-ghost">
              View doctors
            </Link>
          </div>

          <div className="stat-strip" style={{ marginTop: 34 }}>
            <div className="stat-cell">
              <span className="stat-num">12</span>
              <span className="stat-label">Doctors on staff</span>
            </div>
            <div className="stat-cell">
              <span className="stat-num">3</span>
              <span className="stat-label">Specialisations</span>
            </div>
            <div className="stat-cell">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Front desk booking</span>
            </div>
          </div>
        </div>

        <div className="clipboard">
          <p className="preview-label">Today's chart</p>
          <div className="clipboard-row">
            <span className="k">Date</span>
            <span className="v">2026-08-20</span>
          </div>
          <div className="clipboard-row">
            <span className="k">Appointments open</span>
            <span className="v">08:00 – 18:00</span>
          </div>
          <div className="clipboard-row">
            <span className="k">Walk-ins</span>
            <span className="v">Accepted</span>
          </div>
          <div className="clipboard-row">
            <span className="k">Front desk ext.</span>
            <span className="v">104</span>
          </div>
        </div>
      </section>

      <div className="section-head">
        <h2>Recent appointments</h2>
        <span className="section-count">{appointments.length} entries</span>
      </div>

      {loading && <p className="state-note">Loading recent appointments…</p>}

      {!loading && error && (
        <p className="state-note error">
          Couldn't reach the appointments API: {error}
        </p>
      )}

      {!loading && !error && appointments.length === 0 && (
        <p className="state-note">No appointments on record yet.</p>
      )}

      {!loading && !error && appointments.length > 0 &&
        [...appointments].reverse().map((appt) => (
          <AppointmentCard
            key={appt._id || appt.id}
            patientName={appt.patientId?.name || 'Unknown Patient'}
            doctorName={appt.doctorId?.name || 'Unknown Doctor'}
            date={appt.date}
            timeSlot={appt.timeSlot}
            status={appt.status}
          />
        ))
      }
    </div>
  )
}

export default HomePage
