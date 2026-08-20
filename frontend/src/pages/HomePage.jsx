import { Link } from 'react-router-dom'
import AppointmentCard from '../components/AppointmentCard.jsx'

// Sample data passed down as props to demonstrate the parent -> child
// prop flow required by Task 1. DoctorsPage instead sources real data
// from the API (Task 4).
const sampleAppointments = [
  {
    id: 1,
    patientName: 'Ravi Mehta',
    doctorName: 'Dr. Anjali Shah',
    date: '2026-08-22',
    timeSlot: '10:30 AM',
    status: 'confirmed',
  },
  {
    id: 2,
    patientName: 'Priya Nair',
    doctorName: 'Dr. Karan Patel',
    date: '2026-08-22',
    timeSlot: '02:00 PM',
    status: 'pending',
  },
  {
    id: 3,
    patientName: 'Suresh Iyer',
    doctorName: 'Dr. Meera Joshi',
    date: '2026-08-23',
    timeSlot: '09:15 AM',
    status: 'cancelled',
  },
]

function HomePage() {
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
        <span className="section-count">{sampleAppointments.length} entries</span>
      </div>

      {sampleAppointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          patientName={appt.patientName}
          doctorName={appt.doctorName}
          date={appt.date}
          timeSlot={appt.timeSlot}
          status={appt.status}
        />
      ))}
    </div>
  )
}

export default HomePage
