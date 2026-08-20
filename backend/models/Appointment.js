const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient reference is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor reference is required']
  },
  date: {
    type: String, // Stored as string 'YYYY-MM-DD' from the form
    required: [true, 'Date is required']
  },
  timeSlot: {
    type: String, // Storing 'HH:MM' (or AM/PM time)
    required: [true, 'Time slot is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'cancelled'],
      message: 'Status must be one of: pending, confirmed, cancelled'
    },
    default: 'pending'
  },
  reason: {
    type: String,
    maxlength: [300, 'Reason cannot exceed 300 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
