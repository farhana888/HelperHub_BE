import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import maidRoutes from './routes/maidRoutes.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-production-frontend-url.com'], // Add your production URL here
    credentials: true  // Allow credentials such as cookies and headers
}));

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
