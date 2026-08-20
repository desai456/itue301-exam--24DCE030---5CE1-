import { useState } from 'react'
import AppointmentCard from '../components/AppointmentCard.jsx'

const initialForm = {
  patientName: '',
  doctorName: '',
  date: '',
  timeSlot: '',
  reason: '',
}

function BookingPage() {
  // State value #1: the form fields themselves.
  const [formData, setFormData] = useState(initialForm)
  // State value #2: whether the form has been submitted, used to show a
  // confirmation banner and reset the live preview card's status.
  const [submitted, setSubmitted] = useState(false)
  // Additional states for API integration
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Editing the form again after a submission starts a fresh booking.
    if (submitted) setSubmitted(false)
    if (error) setError(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSubmitted(false)

    try {
      const response = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        throw new Error(errJson.error || errJson.message || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Could not save appointment right now.')
    } finally {
      setLoading(false)
    }
  }

  const previewReady = formData.patientName && formData.doctorName

  return (
    <div>
      <p className="page-eyebrow">Front Desk</p>
      <h1 className="page-title">Book an appointment</h1>
      <p className="page-lede">
        Fill in the patient and slot details. The card on the right updates
        as you type, straight from component state.
      </p>

      <div className="booking-layout" style={{ marginTop: 32 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="patientName">Patient name</label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="e.g. Ravi Mehta"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="doctorName">Doctor name</label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="e.g. Dr. Anjali Shah"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="timeSlot">Time slot</label>
              <input
                id="timeSlot"
                name="timeSlot"
                type="time"
                value={formData.timeSlot}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="reason">Reason for visit (optional)</label>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              maxLength={300}
              value={formData.reason}
              onChange={handleChange}
              placeholder="Brief note for the doctor"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm booking'}
          </button>

          {submitted && (
            <p className="confirmation-banner">
              ✓ Booked {formData.patientName} with {formData.doctorName} on{' '}
              {formData.date || 'a date'} at {formData.timeSlot || 'a time'}.
            </p>
          )}

          {error && (
            <p className="state-note error" style={{ marginTop: 12 }}>
              ✗ Booking failed: {error}
            </p>
          )}
        </form>

        <div>
          <p className="preview-label">Live preview</p>
          {previewReady ? (
            <AppointmentCard
              patientName={formData.patientName}
              doctorName={formData.doctorName}
              date={formData.date || 'Date pending'}
              timeSlot={formData.timeSlot || 'Time pending'}
              status={submitted ? 'confirmed' : 'pending'}
            />
          ) : (
            <p className="state-note">
              Start typing the patient and doctor names to see the
              appointment card build itself.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
