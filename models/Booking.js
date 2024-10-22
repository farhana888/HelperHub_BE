import mongoose from 'mongoose';

// Define the Job schema
const bookingSchema = new mongoose.Schema({
    maidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Maid', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true }, // Consider using a time format like 'HH:mm'
    endTime: { type: String, required: true },
  }, { timestamps: true });

const Book = mongoose.model('Book', bookingSchema);
export default Book;
