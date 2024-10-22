import express from 'express';
import Job from '../models/Job.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: Create a new job listing (boss only)
router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;

    try {
        // Create a new job
        const job = new Job({
            title,
            description,
            createdBy: req.user._id // Attach the user ID from the verified token
        });

        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
});

// Route: Get all job listings (maid can view this)
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('createdBy', 'name'); // Populate to show the name of the boss
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
});

export default router;
