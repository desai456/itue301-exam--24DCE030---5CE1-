// Reusable presentational component. It receives everything it needs
// through props from its parent — it holds no state of its own.
function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  const normalizedStatus = ['confirmed', 'pending', 'cancelled'].includes(status)
    ? status
    : 'pending'

  return (
    <article className={`appointment-card status-${normalizedStatus}`}>
      <div className="appointment-tab" aria-hidden="true" />
      <div className="appointment-body">
        <div className="appointment-people">
          <span className="patient">{patientName}</span>
          <span className="doctor">with {doctorName}</span>
        </div>
        <div className="appointment-when">
          <span>{date}</span>
          <span>{timeSlot}</span>
        </div>
        <span className="status-pill">{normalizedStatus}</span>
      </div>
    </article>
  )
}

export default AppointmentCard
