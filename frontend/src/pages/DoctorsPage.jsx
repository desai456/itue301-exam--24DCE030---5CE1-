import { useEffect, useState } from 'react'

// Base URL for the Express API built in Task 3. Vite's dev-server proxy
// (see vite.config.js) forwards "/api" to http://localhost:5000, so this
// works unchanged in development and can be swapped for an env var in
// production if needed.
const API_BASE = '/api/v1'

function DoctorsPage() {
  // Three states as required: the data itself, a loading flag, and an
  // error message. Doctor data is never hardcoded here — it always comes
  // from the API response.
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // useEffect with an empty dependency array runs the request once,
    // right after the component mounts.
    const controller = new AbortController()

    async function fetchDoctors() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE}/doctors`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const json = await response.json()
        // Support either a raw array or an { data: [...] } envelope from
        // the backend's success response.
        setData(Array.isArray(json) ? json : json.data ?? [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load doctors right now.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
    return () => controller.abort()
  }, [])

  return (
    <div>
      <p className="page-eyebrow">Staff Directory</p>
      <h1 className="page-title">Doctors on the floor</h1>
      <p className="page-lede">
        Pulled live from <code>GET /api/v1/doctors</code> — specialisation
        and availability update as soon as the backend does.
      </p>

      {loading && <p className="state-note">Loading doctor list…</p>}

      {!loading && error && (
        <p className="state-note error">
          Couldn't reach the doctors API: {error}. Make sure the Express
          backend is running on port 5000.
        </p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="state-note">No doctors on record yet.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="doctor-grid">
          {data.map((doctor) => (
            <div className="doctor-card" key={doctor._id || doctor.id || doctor.email}>
              <p className="name">{doctor.name}</p>
              <p className="spec">{doctor.specialisation}</p>
              <span className={`availability ${doctor.available ? 'on' : 'off'}`}>
                <span className="dot" />
                {doctor.available ? 'Available today' : 'Not available'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsPage
