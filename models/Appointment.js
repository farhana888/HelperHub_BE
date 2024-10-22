import mongoose from 'mongoose';

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    bossId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the boss (User)
        ref: 'User',
        required: true
    },
    maidId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the maid (User)
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the job
        ref: 'Job',
        required: true
    },
    date: {
        type: Date, // Date of the appointment
        required: true
    },
    time: {
        type: String, // Time of the appointment
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
