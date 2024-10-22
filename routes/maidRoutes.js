import express from 'express';
import MaidAvailability from '../models/MaidAvailability.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Ensure the user is authenticated

const router = express.Router();

// POST /api/maids/availability - Post availability for maids
router.post('/availability', verifyToken, async (req, res) => {
    const { title, description, availableDate, location, days, fromTime, toTime, ratePerHour } = req.body;

    try {
        const availability = new MaidAvailability({
            title,
            description,
            availableDate,
            location,
            days,
            fromTime,
            toTime,
            ratePerHour,
            createdBy: req.user._id // Set the user ID of the maid who posted the availability
        });

        await availability.save();
        res.status(201).json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Error posting availability', error: error.message });
    }
});

// GET /api/maids - Get all available maids
router.get('/', async (req, res) => {
    try {
        const availabilities = await MaidAvailability.find().populate('createdBy', 'name'); // Populate to show maid's name
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching maids', error: error.message });
    }
});

export default router;
