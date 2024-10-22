// src/api/bookings.js

import express from 'express';
import Booking from '../models/Booking.js'; // Assuming you have a Booking model

const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const { maidId, userId, startDate, endDate, startTime, endTime } = req.body;

    // Create a new booking
    const newBooking = new Booking({
      maidId,
      userId,
      startDate,
      endDate,
      startTime,
      endTime,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
});

export default router;
