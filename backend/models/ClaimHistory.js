import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ClaimHistory', claimSchema);
