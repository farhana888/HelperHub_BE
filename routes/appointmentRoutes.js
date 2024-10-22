import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Route to book a new appointment
router.post('/book', async (req, res) => {
    const { bossId, maidId, jobId, date, time } = req.body;

    try {
        const appointment = new Appointment({
            bossId,
            maidId,
            jobId,
            date,
            time,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!', appointment: savedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
});

export default router;
