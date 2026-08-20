require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/med_care';

// Format validation error details cleanly
function formatValidationError(err) {
  if (err.name === 'ValidationError') {
    const errorDetails = {};
    Object.keys(err.errors).forEach((key) => {
      errorDetails[key] = err.errors[key].message;
    });
    return {
      success: false,
      error: 'Validation Error',
      details: errorDetails
    };
  }
  return {
    success: false,
    error: err.name,
    message: err.message
  };
}

async function runDemo() {
  console.log('=== MedCare Plus MongoDB Schema Demonstration ===\n');
  
  try {
    await mongoose.connect(mongoUri);
    console.log(`[OK] Connected to MongoDB at: ${mongoUri}\n`);

    // Clean up any old test documents from previous runs
    console.log('Cleaning up previous test documents...');
    await Patient.deleteMany({ email: /@test-demo\.com$/ });
    await Doctor.deleteMany({ email: /@test-demo\.com$/ });
    // Since patientId/doctorId might change, clean up all demo appointments
    await Appointment.deleteMany({});
    console.log('[OK] Cleaned up old test data.\n');

    // ----------------------------------------------------
    // CASE 1: Successful Document Creation
    // ----------------------------------------------------
    console.log('--- Test 1: Creating valid Patient, Doctor, and Appointment ---');
    
    const patient = await Patient.create({
      name: 'John Doe',
      email: 'john.doe@test-demo.com',
      phone: '+1-555-0199',
      bloodGroup: 'O+',
      age: 45
    });
    console.log(`[SUCCESS] Patient created! ID: ${patient._id}, Blood Group: ${patient.bloodGroup}`);

    const doctor = await Doctor.create({
      name: 'Dr. Jane Smith',
      email: 'jane.smith@test-demo.com',
      specialisation: 'Neurology',
      available: true
    });
    console.log(`[SUCCESS] Doctor created! ID: ${doctor._id}, Specialisation: ${doctor.specialisation}`);

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      date: '2026-08-25',
      timeSlot: '11:00 AM',
      status: 'confirmed',
      reason: 'Routine brain scan and follow-up consultation.'
    });
    console.log(`[SUCCESS] Appointment created! ID: ${appointment._id}, Status: ${appointment.status}`);

    // Populate and log the resulting document
    const populated = await Appointment.findById(appointment._id)
      .populate('patientId')
      .populate('doctorId');
    console.log('\nPopulated Appointment Record:');
    console.log(JSON.stringify(populated, null, 2));
    console.log('[OK] Successful creation verified.\n');

    // ----------------------------------------------------
    // CASE 2: Validation Failures
    // ----------------------------------------------------
    console.log('--- Test 2: Triggering and Handling Schema Validation Failures ---\n');

    // Failure A: Missing required field (e.g. Patient name is missing)
    try {
      console.log('Testing Failure A: Missing required field (Patient name)');
      await Patient.create({
        email: 'invalid.patient@test-demo.com',
        bloodGroup: 'B+',
        age: 28
      });
      console.log('[FAIL] Patient created unexpectedly!');
    } catch (err) {
      console.log('[OK] Caught expected validation failure:');
      console.log(JSON.stringify(formatValidationError(err), null, 2));
    }
    console.log();

    // Failure B: Invalid blood group (e.g. 'Z+' which is not in enum)
    try {
      console.log('Testing Failure B: Invalid blood group ("Z+")');
      await Patient.create({
        name: 'Alex Mercer',
        email: 'alex.mercer@test-demo.com',
        bloodGroup: 'Z+',
        age: 32
      });
      console.log('[FAIL] Patient created unexpectedly with invalid blood group!');
    } catch (err) {
      console.log('[OK] Caught expected validation failure:');
      console.log(JSON.stringify(formatValidationError(err), null, 2));
    }
    console.log();

    // Failure C: Invalid appointment status (e.g. 'completed' is not pending/confirmed/cancelled)
    try {
      console.log('Testing Failure C: Invalid appointment status ("completed")');
      await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        date: '2026-08-26',
        timeSlot: '03:30 PM',
        status: 'completed'
      });
      console.log('[FAIL] Appointment created unexpectedly with invalid status!');
    } catch (err) {
      console.log('[OK] Caught expected validation failure:');
      console.log(JSON.stringify(formatValidationError(err), null, 2));
    }
    console.log();

    // Failure D: Reason exceeding 300 characters
    try {
      console.log('Testing Failure D: Reason exceeding 300 characters');
      const longReason = 'a'.repeat(305);
      await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        date: '2026-08-27',
        timeSlot: '09:00 AM',
        status: 'pending',
        reason: longReason
      });
      console.log('[FAIL] Appointment created unexpectedly with long reason!');
    } catch (err) {
      console.log('[OK] Caught expected validation failure:');
      console.log(JSON.stringify(formatValidationError(err), null, 2));
    }
    console.log();

    console.log('=== All tests finished successfully ===');
  } catch (globalErr) {
    console.error('Fatal test runner error:', globalErr);
  } finally {
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB.');
  }
}

runDemo();
