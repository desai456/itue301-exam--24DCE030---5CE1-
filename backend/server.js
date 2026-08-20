require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5005;

// Enable CORS so the React app can call it
app.use(cors());

// Body parser
app.use(express.json());

// 1. Custom requestLogger middleware globally applied (Task 3)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl || req.url} [${timestamp}]`);
  next();
});

// Connect to MongoDB using connection string stored in .env
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/med_care';
mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB successfully at: ${mongoUri}`);
    seedDoctors();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Seed some initial doctors if the collection is empty
async function seedDoctors() {
  try {
    const count = await Doctor.countDocuments();
    if (count === 0) {
      const initialDoctors = [
        { name: 'Dr. Anjali Shah', email: 'anjali.shah@medcare.com', specialisation: 'Cardiology', available: true },
        { name: 'Dr. Karan Patel', email: 'karan.patel@medcare.com', specialisation: 'Pediatrics', available: true },
        { name: 'Dr. Meera Joshi', email: 'meera.joshi@medcare.com', specialisation: 'Dermatology', available: false },
        { name: 'Dr. Rahul Sharma', email: 'rahul.sharma@medcare.com', specialisation: 'General Medicine', available: true }
      ];
      await Doctor.insertMany(initialDoctors);
      console.log('Seeded database with initial doctors');
    }
  } catch (err) {
    console.error('Error seeding doctors:', err.message);
  }
}

// 2. REST Endpoints (Task 3)

// GET /api/v1/doctors - Return all doctors
app.get('/api/v1/doctors', async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/appointments - Return all appointments
app.get('/api/v1/appointments', async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId');
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/appointments - Create a new appointment
app.post('/api/v1/appointments', async (req, res, next) => {
  try {
    const { patientId, doctorId, patientName, doctorName, date, timeSlot, status, reason } = req.body;

    let targetDoctor;
    if (doctorId) {
      targetDoctor = await Doctor.findById(doctorId);
    } else if (doctorName) {
      targetDoctor = await Doctor.findOne({ name: new RegExp('^' + doctorName.trim() + '$', 'i') });
      if (!targetDoctor) {
        // Automatically create a doctor if not found
        targetDoctor = await Doctor.create({
          name: doctorName.trim(),
          email: `${doctorName.toLowerCase().replace(/[^a-z0-9]/g, '')}@medcare.com`,
          specialisation: 'General Practitioner',
          available: true
        });
      }
    }

    let targetPatient;
    if (patientId) {
      targetPatient = await Patient.findById(patientId);
    } else if (patientName) {
      targetPatient = await Patient.findOne({ name: new RegExp('^' + patientName.trim() + '$', 'i') });
      if (!targetPatient) {
        // Automatically create a patient if not found. Make email unique using a timestamp.
        targetPatient = await Patient.create({
          name: patientName.trim(),
          email: `${patientName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}@example.com`,
          phone: '1234567890',
          bloodGroup: 'O+',
          age: 30
        });
      }
    }

    // Run custom checks to throw ValidationError if reference is missing
    if (!targetDoctor) {
      const err = new Error('ValidationError');
      err.name = 'ValidationError';
      err.errors = { doctorId: { message: 'Doctor is required' } };
      throw err;
    }
    if (!targetPatient) {
      const err = new Error('ValidationError');
      err.name = 'ValidationError';
      err.errors = { patientId: { message: 'Patient is required' } };
      throw err;
    }

    const newAppointment = new Appointment({
      patientId: targetPatient._id,
      doctorId: targetDoctor._id,
      date,
      timeSlot,
      status: status || 'pending',
      reason
    });

    const savedAppointment = await newAppointment.save();
    const populated = await Appointment.findById(savedAppointment._id)
      .populate('patientId')
      .populate('doctorId');

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// Trigger a mock error to test global error handling (optional, good for debugging)
app.get('/api/v1/trigger-error', (req, res, next) => {
  const err = new Error('Mock Server Error');
  next(err);
});

// 3. Global error-handling middleware (Task 3 & Task 5 validation formatting)
app.use((err, req, res, next) => {
  // Capture Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const errorDetails = {};
    Object.keys(err.errors).forEach((key) => {
      errorDetails[key] = err.errors[key].message;
    });

    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errorDetails
    });
  }

  // Capture Mongoose Duplicate Key Errors (like unique email)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate Key Error',
      message: `The field ${Object.keys(err.keyValue)[0]} already exists.`
    });
  }

  // Catch other errors
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : 'Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
