import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import maidRoutes from './routes/maidRoutes.js'; // Import maid routes
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes); // Use the job routes

// Use the maid routes
app.use('/api/maids', maidRoutes);
app.use('/api/bookings', bookingsRouter);
// Basic route for testing
app.get('/', (req, res) => {
    res.send('Servant Management System API');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
