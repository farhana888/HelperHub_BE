import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import maidRoutes from './routes/maidRoutes.js';
import bookingsRouter from './routes/bookings.js';
import cors from 'cors';

dotenv.config();  // Load environment variables from .env file

const MONGODB_URI="mongodb+srv://farhana000008:ZKA9PGSyNHdeJ7I2@helperhub.cu75y.mongodb.net/?retryWrites=true&w=majority&appName=helperhub";
const PORT_CODE=8000;
const JWT_SECRET=123456789;
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// Connect to MongoDB using the environment variable
mongoose.connect(MONGODB_URI)
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
const PORT = PORT_CODE || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
