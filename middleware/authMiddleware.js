import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to verify token
export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set properly

        // Attach the user to the request
        req.user = await User.findById(decoded._id); // Assuming decoded token contains _id of the user
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
