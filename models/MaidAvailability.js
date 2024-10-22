import mongoose from 'mongoose';

const maidAvailabilitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    availableDate: { type: Date, required: true },
    location: { type: String, required: true },
    days: [{ type: String, required: true }], // Array to hold selected days
    fromTime: { type: String, required: true }, // Format: "HH:mm"
    toTime: { type: String, required: true },   // Format: "HH:mm"
    ratePerHour: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who posted availability
}, {
    timestamps: true,
});

const MaidAvailability = mongoose.model('MaidAvailability', maidAvailabilitySchema);
export default MaidAvailability;
