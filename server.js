import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import maidRoutes from './routes/maidRoutes.js';
import bookingsRouter from './routes/bookings.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000'], // Allow both localhost and production frontend URLs
    credentials: true // If you're using cookies or sessions
}));

// Connect to MongoDB
mongoose.connect("mongodb+srv://farhana000008:ZKA9PGSyNHdeJ7I2@helperhub.cu75y.mongodb.net/?retryWrites=true&w=majority&appName=helperhub")
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
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
